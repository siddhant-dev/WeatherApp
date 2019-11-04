import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/weather-service.service';
import { AuthService } from '../../services/auth.service';
import { Locations } from 'src/app/services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  temp: number;
  tempMax: number;
  tempMin: number;
  state: string;
  name: string;
  country: string;
  desc: string;
  list = [];
  uid: string;
  // addMode = true;
  btnText: string;
  errorMessage: string;
  cityAdded: boolean;


  // @Input() cityAdded: boolean;
  @Input() addMode: boolean;
  @Output() cityStored = new EventEmitter();
  @Input() set city(city: Locations) {
    this.errorMessage = '';
    // this.lat = Math.ceil(this.lat);
    // lng = Math.ceil(lng);

    this.weather.getWeather(city.name, city.country).subscribe  ( (payload: any) => {
      this.temp = Math.ceil(payload.main.temp);
      this.state = payload.weather[0].main;
      this.tempMin = Math.floor(payload.main.temp_min );
      this.tempMax = Math.ceil(payload.main.temp_max );
      this.name = payload.name;
      this.desc = payload.weather[0].description;
      this.country = payload.sys.country;
  },
    err => (
      console.log(err),
      this.errorMessage = err)
        );

    this.weather.getForcast(city.name, city.country).subscribe(payload => {
      // this.tempMax = Math.round(payload[0].main.temp);
      // this.tempMin = Math.round(payload[0].main.temp);
      for (const i of payload) {
        if (new Date().toLocaleDateString('en-GB') === new Date(i.dt_txt).toLocaleDateString('en-GB')) {
          // console.log(i.main.temp);
          this.tempMax = i.main.temp > this.tempMax ? Math.round(i.main.temp) : this.tempMax;
          this.tempMin = i.main.temp < this.tempMin ? Math.round(i.main.temp) : this.tempMin  ;
          // this.cityAdded = false;
        }
      }
    },
    err => this.errorMessage = err);
}

  constructor(
    public weather: WeatherService,
    public auth: AuthService,
    public route: Router
  ) {
    this.auth.user$.subscribe(payload => {
      this.uid = payload.uid;
      if (payload.cities) {
      this.list = payload.cities;
      } else {
        this.list = [];
      }
    });


   }

  ngOnInit() {

  }

  addCity(name: string, country: string) {
    const index = this.list.findIndex( x => x.name === name);
    // console.log(index);
    if (index === -1 && this.list.length < 51) {
      this.list.push({name , country});
    } else if (this.list[index].country !== country && this.list.length < 51) {
      this.list.push({name , country});
    } else {
      this.errorMessage = 'You have can have maximum of 50 cities as Favourite';
    }
    this.name = '';
    this.cityAdded = true;
    this.auth.addCity(this.list, this.uid);
    this.cityStored.emit();
    setTimeout(() => this.cityAdded = false, 10000);
  }

  openDetails() {
    if ( !this.addMode ) {
      this.route.navigateByUrl('/details/' + this.name + '/' + this.country );
    }
  }
}
