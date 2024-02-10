import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  baseUrl = environment.baseUrl;
  apiKey = environment.apiKey;
  constructor(private http: HttpClient) { }
  /**
   * 
   * @param symbols 
   * @param base 
   * @param date 
   * @returns 
   */
  getHistoricalData(symbols: string, base: string, date: string): Observable<any> {
    const headers = { 'apikey': this.apiKey };
    const url = `${environment.baseUrl}date${date}?symbols=${symbols}&base=${base}`;
    return this.http.get(url, { headers: headers });
  }
}
