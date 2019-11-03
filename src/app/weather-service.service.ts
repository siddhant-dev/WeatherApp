import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { first, map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = environment.openWeatherApiKey;
  baseURL = 'https://api.openweathermap.org/data/2.5/';

  constructor(public http: HttpClient) {  }

  getWeather(city, country): Observable<any> {
    return this.http.get  (
        this.baseURL + 'weather?q=' + city + ',' + country + '&units=metric&appid=' + this.apiKey).pipe((first()),
        catchError(this.handleError));
  }

  getForcast(city, country): Observable<any> {
    return this.http.get<any>(this.baseURL + 'forecast?q=' + city + ',' + country + '&units=metric&appid=' +
    this.apiKey).pipe(map(weather => {
      return weather.list;
    }),
    catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let message = '';
    if (err.error instanceof Error){
      message = err.error.message;
    } else{
      message = err.error.message;
    }
    return throwError(message);
    
  }
}
