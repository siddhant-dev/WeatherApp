import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { slider } from '../app/route-animations';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider]
})
export class AppComponent implements OnInit {
  title = 'Weather App';
  showMenu = false;

  constructor(public auth: AuthService) {}

  ngOnInit() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

