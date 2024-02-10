import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ConverterService } from '../../services/converter.service';
import { CoreService } from 'src/app/Core/services/core.service';
import { Icurrancy } from '../../model/Icurrancy';
import { BaseChartDirective } from 'ng2-charts';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-converter-panel-detail',
  templateUrl: './converter-panel-detail.component.html',
  styleUrls: ['./converter-panel-detail.component.scss']
})
export class ConverterPanelDetailComponent implements OnInit,OnDestroy {
  constructor(
    private ConverterService: ConverterService,
    private coreService: CoreService  ) { }

  conversionObj!: Icurrancy;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'Septemper', 'October', 'November', 'December'];
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  chartData: any[] = [];
  labels = [...this.months.filter((_, i) => i >= this.currentMonth), ...this.months.filter((_, i) => i < this.currentMonth)]
  data!: ChartConfiguration['data'];

  chartOptions!: ChartConfiguration['options'];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public chartType: ChartType = 'line';
  error: string = '';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.getConversionObj();

  }
  /** overall i can not test this story  will cause of the limition of subscribtion  Of Api
   * @description work around because https://apilayer.com/  historical API needs supscription.

   * so that i get data baste on last day of month and gate rate 
   */

  renderChart() {
    for (let index = 1; index <= 12; index++) {
      const month = (index < 10) ? ('0' + index) : index;
      const year = Number(index) > this.currentMonth ? this.currentYear - 1 : this.currentYear;
      const lastDayOfMonth = new Date(this.currentYear - 1, index, 0).getDate();
      this.getChartData(`${year}-${month}-${lastDayOfMonth}`);
    }
  }
  /**
   * @description  this method for calling api date to get the rate of specifc month 
   * @param date 
   * @returns void
   */
  getChartData(date: string) {
    this.coreService.getHistoricalData( this.conversionObj.to , this.conversionObj.from , date).subscribe(data => {
      if (data) {
        this.chartData = [...this.chartData, data];
        if (this.chartData.length === 12) {
          this.error = '';
          this.data =
          {
            labels: this.labels,
            datasets: [
              {
                label: 'Rate',
                data: this.chartData.sort((a, b) => a.timestamp - b.timestamp).map(item => item.rates[this.conversionObj.to]),
                borderColor: '#0d6efd',
                backgroundColor: '#FFD70066',
              }
            ],
          }
        }
      } else {
        this.error = data.message;

      }
    });
  }
/**
 * @description this method get the select convertion object of converter panle 
 * @returns void 
 */
  getConversionObj() :void {
    this.ConverterService.getConversionObjListener().pipe(takeUntil(this.ngUnsubscribe)).subscribe(conversionObj => {
      this.conversionObj = conversionObj;
      this.chartOptions = {
        responsive: true,
        aspectRatio: 4,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: `From ${this.conversionObj.from} To ${this.conversionObj.to} Through Last Year`,
          },
        },
      };
      this.chartData = [];
      this.renderChart();
    });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
