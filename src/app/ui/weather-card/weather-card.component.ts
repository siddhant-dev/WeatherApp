import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/weather-service.service';

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
  desc: string;

  @Input() lat: number;
  @Input() set lng(lng: number) {
    // this.lat = Math.ceil(this.lat);
    // lng = Math.ceil(lng);

    this.weather.getWeather(this.lat, lng).subscribe  ( (payload: any) => {
      this.temp = Math.ceil(payload.main.temp - 273);
      this.state = payload.weather[0].main;
      this.tempMin = Math.ceil(payload.main.temp_min - 273);
      this.tempMax = Math.ceil(payload.main.temp_max - 273);
      this.name = payload.name;
      this.desc = payload.weather[0].description;
  });
}

  constructor(
    public weather: WeatherService,
  ) { }

  ngOnInit() {
  }

}
