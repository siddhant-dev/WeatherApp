import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service.service';
import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // sub: Subscription;
  city: string;
  country: string;
  state: string;
  dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  forcast = [];
  hum: number;
  wind: number;
  deg: number;
  currentTemp: number;

  constructor(public weather: WeatherService, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe( (route: any) => {
      this.city = route.params.city;
      this.country = route.params.country;
      this.getCurrentWeather();
      this.getForcast();
    });
  }

  getForcast() {
    this.weather.getForcast(this.city, this.country).subscribe((payload: any) => {
      for (let i = 0; i < payload.length; i++) {
        // console.log(payload[i]);
        const date = new Date(payload[i].dt_txt);
        const day = this.dayOfWeek[date.getDay()];
        if (date.toLocaleDateString('en-GB') !== new Date().toLocaleDateString('en-GB')) {
          let temp: number;
          let state: string;
          let desc: string;
          temp = Math.round(payload[i].main.temp);
          for (let j = i; j < payload.length; j++) {
            if (new Date(payload[j].dt_txt).toLocaleDateString('en-GB') === date.toLocaleDateString('en-GB')) {
              // console.log(payload[j].main);
              temp = payload[j].main.temp > temp ? Math.round(payload[j].main.temp) : temp;
              state = payload[j].weather[0].main;
              desc = payload[j].weather[0].description;
            }
          }
          if (this.forcast.findIndex( x => x.day === day) === -1) {
            this.forcast.push(
              {day, temp, state, desc}
            );
          }
          }
        }
        // console.log(this.forcast);
      });
    }

    getCurrentWeather() {
      this.weather.getWeather(this.city, this.country).subscribe ((payload: any) => {
        console.log(payload);
        this.currentTemp = Math.round(payload.main.temp);
        this.hum = Math.round(payload.main.humidity);
        this.wind = Math.round(payload.wind.speed * 3);
        this.deg = payload.wind.deg;
        this.state = payload.weather[0].main;
      });
    }

  }
