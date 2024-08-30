import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private apiUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) { }

  getCountryData(countryCode: string): Observable<any> {
    const url = `${this.apiUrl}/${countryCode}?format=json`;
    return this.http.get(url);
  }
}
