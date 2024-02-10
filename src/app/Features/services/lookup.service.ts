import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreService } from 'src/app/Core/services/core.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private endpoint = 'symbols';
  symbols = new Subject<string[][]>();
  constructor(private http: HttpClient) { }
/**
 * 
 * @returns symbols from api 
 */
  fetchSymbols() {
    const url = `${environment.baseUrl}${this.endpoint}`;
    const headers = { 'apikey': environment.apiKey };
    return this.http.get(url, { headers });
  }
/**
 * 
 * @returns observable from symbols 
 */
  getSymbols() {
    return this.symbols.asObservable();
  }
}
