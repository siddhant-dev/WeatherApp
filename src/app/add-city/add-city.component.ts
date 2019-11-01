import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Locations } from '../services/user';
import { styles } from '../add-city/style';
// import { WeatherService } from '../weather-service.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {



  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    // private weather: WeatherService
  ) { }
  search: string;
  latitude: number;
  longitude: number;
  zoom: number;
  city: Locations;
  address: string;
  private geoCoder;
  showMenu = false;
  temp;
  mapStyle = styles;
  iconStyle = {
    url: './assets/location.png',
    scaledSize: {
        width: 42 ,
        height: 60
    }
}

  @ViewChild ('search' , {static: false})
  public searchElementRef: ElementRef;

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

      const options = {
        types: ['(cities)']
      };
      this.geoCoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log(place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          // this.city = place.name;
          const add = place.formatted_address.split(', ');
          const len = add.length;
          console.log('sid', place);
          this.city = {
            name: add[0],
            country: add[len - 1].substring(0 , 2)
          };
          console.log(this.city);
          this.zoom = 12;
          this.getstreetAddress(this.latitude, this.longitude);
          // this.getWeater(this.latitude, this.longitude);
        });
      });
    });
  }

    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12  ;
          this.getAddress(position.coords.latitude, position.coords.longitude);
          // this.getWeater(this.latitude, this.longitude);
        });
      }
    }

    markerDragEnd($event: MouseEvent) {
      console.log($event);
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.getAddress(this.latitude, this.longitude);
      // this.getWeater(this.latitude, this.longitude);
    }

    // getWeater(latitude, longitude) {
    //   this.weather.getWeather(latitude, longitude).subscribe  ( (payload: any) => {
    //     this.temp = payload;
    //   });
    // }

    getAddress(latitude, longitude) {
      // this.city = new Locations();
      this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        // console.log('Sid', latitude, longitude  );
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            let pram = results[0].formatted_address;
            this.address = pram;
            pram = pram.split(', ');
            const count: number = pram.length;
            // this.city.name = pram[count - 3];
            // this.city.country = pram[count - 1].substring (0, 2);
            this.city = {
              name: pram[count - 3],
              country: pram[count - 1].substring (0, 2)
            };
            console.log(this.city);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }

      });
    }

    getstreetAddress(latitude, longitude) {

      this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        // console.log('Sid', latitude, longitude  );
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            const pram = results[0].formatted_address;
            this.address = pram;
            // pram = pram.split(', ');
            console.log(this.city);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }

      });

    }
  }
