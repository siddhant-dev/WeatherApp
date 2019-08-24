import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = environment.openWeatherApiKey;
  baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

  constructor(public http: HttpClient) {  }

  getWeather(lat, lng): Observable<any> {
    return this.http.get  (
        this.baseURL + 'lat=' + lat + '&lon=' + lng + '&appid=' + this.apiKey).pipe((first()));
  }
}
