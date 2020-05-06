import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICovid } from '../classes/icovid';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {
  private apiURL = 'https://api.covid19api.com/total/dayone/country/cd';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public getCountrieData(): Observable<ICovid[]> {
    return this.http.get<ICovid[]>(this.apiURL, this.httpOptions);
  }
}
