import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConverterService } from '../../services/converter.service';
import { Subject, takeUntil } from 'rxjs';
import { Icurrancy } from '../../model/Icurrancy';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {
  fromCurrency !: number;
  toCurrency !: number;
  amount !: number;
  converterCurrancyForm!: FormGroup;
  isDetailsPage: boolean = false
  error: string = '';
  toCurrencies: string[] = ['EGP', 'AED', 'SAR', 'USD', 'QAR', 'INR', 'JPY', 'KWD', 'CNY'];
  conversionObj: Icurrancy = <Icurrancy>{};
  symbols: string[][] = [['EUR', 'Euro'], ['USD', 'United States Dollar']];
  conversionData: Icurrancy = {
    from: this.conversionObj.from,
    fromName: 'Euro',
    to: this.conversionObj.to,
    amount: this.conversionObj.amount,
    rate: 0
  };
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private _converterService: ConverterService,
    private lookupService: LookupService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.converterCurrancyfromInit();
    this.showDetailPage();
  }
  /**
   * converterCurrancyfromInit
   * @description from Init
   * @returns  void
   */
  converterCurrancyfromInit(): void {
    this.converterCurrancyForm = this.fb.group({
      amount: [1, Validators.required],
      from: ['EUR', Validators.required],
      to: ['USD', Validators.required]
    });
  }
  /**
   *  convertCurrency
   * @description take ammount and from to  and call api
   * @returns  void 
   */
  convertCurrency(): void {
    this.conversionObj = <Icurrancy>{};
    this.conversionObj = this.converterCurrancyForm.value;
    const fromName = this.symbols?.find(symbol => symbol[0] === this.conversionObj.from);
    this.conversionData.fromName = fromName ? fromName[1] : this.conversionData.fromName;
    this.conversionData = { ...this.conversionData, ...this.conversionObj };
    this._converterService
    .convertCurrency(this.conversionObj.from, this.conversionObj.to, this.conversionObj.amount)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (result: any) => {
        console.log(result);
        this.conversionData.rate = result.info.rate;
      },
      (error) => {
        this.conversionData.rate = 0;
        this.error = error.error.message;
        console.error('Error converting currency:', error);
      }
    );
    this._converterService.setConversionData(this.conversionData);
  }
  /**
   * @description swape Value From and TO 
   * @returns void 
   */
  swapCurrencies(): void {
    const fromControl = this.converterCurrancyForm.get('from');
    const toControl = this.converterCurrancyForm.get('to');
    if (fromControl && toControl) {
      const fromValue = fromControl.value;
      const toValue = toControl.value;
      this.converterCurrancyForm.patchValue({
        from: toValue,
        to: fromValue
      });
    }
  }
  /**
   * @description this methods get Symbols 
   * @returns void 
   */
  getSymbols(): void {
    this.lookupService.getSymbols().subscribe(symbols => this.symbols = symbols);
  }
  /**
   * @description navigation for detail component
   */
  navigateToDetailPanle(): void {
    this.router.navigate([`/details`], { queryParams: { from: this.conversionData.from, to: this.conversionData.to, amount: this.conversionData.amount } });
  }
  /**
   * @description back to home 
   * @returns Void 
   */
  backToHome() {
    this.router.navigate(['/home']);
  }
  /**
   * @description  method check is that detail page and update flag isDetailsPage
   * 
   */
  showDetailPage() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('/details')) {
          this.isDetailsPage = true;
          this.getLinkParams();
        } else {
          this.isDetailsPage = false;
        }
      }
    });
  }
  /**
   * @description  getLinkParams  
   */
  getLinkParams(): void {
    this.route.queryParams
      .subscribe(params => {
        this.conversionObj.from = params['from'] || this.conversionObj.from;
        this.conversionObj.to = params['to'] || this.conversionObj.to;
        this.conversionObj.amount = params['amount'] || this.conversionObj.amount;
        this.converterCurrancyForm.patchValue({
          from: this.conversionObj.from,
          to: this.conversionObj.to,
          amount: this.conversionObj.amount
        });
        this.convertCurrency();
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
