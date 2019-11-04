import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExchangeRates } from '../models/exchangeRates.interface';
import { Country } from '../models/country.interface';
import { SymbolBaseConvert } from '../models/symbol-base-convert.interface';

const RATES_API = 'https://api.ratesapi.io/api/latest?base=';
const FLAG_API = 'https://restcountries.eu/rest/v2/alpha';
const SYMBOL_BASE_API = 'https://api.ratesapi.io/api/latest?base=';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {

  constructor(private http: HttpClient) {}

  getRages(base: string): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(`${RATES_API}${base}`);
  }

  getFlag(countryCode: string): Observable<Country> {
    return this.http.get<Country>(`${FLAG_API}/${countryCode}`);
  }

  getConversion(value1: string, value2: string): Observable<SymbolBaseConvert> {
    return this.http.get<SymbolBaseConvert>(`${SYMBOL_BASE_API}${value1}&symbols=${value2}`);
  }

}
