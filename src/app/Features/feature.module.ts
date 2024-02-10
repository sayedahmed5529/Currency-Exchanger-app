import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterPanelComponent } from './components/converter-panel/converter-panel.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConverterPanelDetailComponent } from './components/converter-panel-detail/converter-panel-detail.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CoreService } from '../Core/services/core.service';
import { CardsGridComponent } from './components/cards-grid/cards-grid.component';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConverterPanelComponent,
    ConverterPanelDetailComponent,
    CardsGridComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    HttpClientJsonpModule,
    NgChartsModule
  ],
  exports:[
    ConverterPanelComponent,
    CardsGridComponent
  ],
  providers:[CoreService]

})
export class FeatureModule { }
