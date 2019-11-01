import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  sub: Subscription;
  city: string;
  country: string;
  state = 'Sunny';
  constructor(public weather: WeatherService, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe( (route: any) => {
      this.city = route.params.city;
      this.country = route.params.country;
    });
  }

}
