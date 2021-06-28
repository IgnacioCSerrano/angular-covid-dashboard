import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private constants: Constants) { }

  private extractData(res: Response): any {
    return res || {}
  }

  private handleError(error: HttpErrorResponse): any {
    console.error(error)
    return throwError('Algo fue mal, inténtelo de nuevo más tarde.')
  }

  fetchLocationData(): Observable<any> {
    return this.http.get(this.constants.API_LOC_ENDPOINT).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  fetchCovidDataAll(): Observable<any> {
    return this.http.get(this.constants.API_COVID_ENDPOINT).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  fetchCovidDataCountry(country: string): Observable<any> {
    return this.http.get(`${this.constants.API_COVID_ENDPOINT}?country=${country}`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  fetchCountryData(country:string): Observable<any> {
    return this.http.get(this.constants.API_COUNT_ENDPOINT + country).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  fetchChuckData(): Observable<any> {
    return this.http.get(this.constants.API_CHUCK_ENDPOINT).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  fetchNumberData(): Observable<any> {
    return this.http.get(this.constants.API_NUM_ENDPOINT).pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }
  
}
