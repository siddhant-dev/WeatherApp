import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cities: Array<string>;

  constructor( public auth: AuthService  ) { }


  ngOnInit() {   // load Places Autocomplete
    this.auth.user$.subscribe(payload =>(
      this.cities = payload.cities
    ));
  }

}
