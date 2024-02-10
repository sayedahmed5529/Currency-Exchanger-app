import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Icurrancy } from 'src/app/Features/model/Icurrancy';
import { Router } from '@angular/router';
import { ConverterService } from 'src/app/Features/services/converter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  conversionObj!: Icurrancy;
  constructor(
    private router: Router,
    private conversionService: ConverterService,
  ) { }

  ngOnInit(): void {
    this.getConversionObj();
  }

  navigate(from: string, to: string) {
    this.router.navigate([`/details`], { queryParams: { from: from, to: to, amount: this.conversionObj.amount } });
  }

  getConversionObj() {
    this.conversionService.getConversionObjListener().subscribe(conversionObj => {
      this.conversionObj = conversionObj;
    });
  }

}
