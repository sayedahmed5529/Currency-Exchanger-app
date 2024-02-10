import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Icurrancy } from '../model/Icurrancy';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private endpoint = 'convert';
  conversionObj: Icurrancy = { from: 'EUR', fromName: 'Euro', to: 'USD', amount: 1, rate: 0 };
  private conversionObjListner = new BehaviorSubject<Icurrancy>(this.conversionObj);
  constructor(private http: HttpClient) { }
  /**
   * 
   * @param to 
   * @param from 
   * @param amount 
   * @returns Observable 
   */
  convertCurrency(to: string, from: string, amount: number): Observable<Icurrancy> {
    const url = `https://api.apilayer.com/exchangerates_data/${this.endpoint}?to=${to}&from=${from}&amount=${amount}`;
    const headers = { 'apikey':environment.apiKey };
    return this.http.get<Icurrancy>(url, { headers });
  }
  /**
   * 
   */
  resetRate() {
    this.conversionObj.rate = 0;
    this.setConversionData(this.conversionObj);
  }
/**
 * 
 * 
 * @param conversionObj 
 * 
 */
  setConversionData(conversionObj: Icurrancy) {
    this.conversionObjListner.next(conversionObj);
    this.conversionObj = conversionObj;
  }
/**
 * 
 * @returns obserable of objects that converted 
 */
  getConversionObjListener() {
    return this.conversionObjListner.asObservable();
  }
}
