import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Icurrancy } from '../../model/Icurrancy';
import { ConverterService } from '../../services/converter.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent implements OnInit, OnDestroy {

  @Input() to!: string;
  conversionObj!: Icurrancy;
  rate: number = 0;
  error: string = '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private conversionService: ConverterService,
  ) { }


  ngOnInit(): void {
    this.getConversionObj();
  }
  /**
   * @description get the covertion obect from converter panel
   * @returns void 
   */
  getConversionObj(): void {
    this.conversionService.getConversionObjListener().subscribe((conversionObj: Icurrancy) => {
      this.conversionObj = conversionObj;
      this.convert();
    });
  }
  /**
   * @description  method Detect change and gete covert rate for it 
   * @param changes 
   * 
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['to'] && !changes['to'].isFirstChange()) {
      this.convert();
    }
  }
  /**
   * @description  coverision method that get rate from api 
   * @returns void 
   */
  convert(): void {
    this.conversionService
    .convertCurrency(this.conversionObj.from, this.conversionObj.to, this.conversionObj.amount)
    .pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (result: any) => {
        console.log(result);
        this.rate = result.info.rate;
        this.error = '';
      },
      (error: any) => {
        this.rate = 0;
        this.error = error.error.message;
      }
    );

  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
