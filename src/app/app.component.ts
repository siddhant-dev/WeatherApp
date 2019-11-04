import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { slider } from '../app/route-animations';
import { RouterOutlet } from '@angular/router';
import { PWAService } from './services/pwa.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider]
})
export class AppComponent implements OnInit {
  title = 'Weather App';
  showMenu = false;

  constructor(public auth: AuthService, public pwa: PWAService) {}

  ngOnInit() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  installPwa(): void {
    this.pwa.promptEvent.prompt();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}

