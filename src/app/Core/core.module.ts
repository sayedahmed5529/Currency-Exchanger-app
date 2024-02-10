import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FeatureModule } from '../Features/feature.module';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    HomeComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FeatureModule,
    HttpClientModule
    
  ],
  exports:[
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  providers:[]
})
export class CoreModule { }
