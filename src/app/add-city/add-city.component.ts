import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
// import { WeatherService } from '../weather-service.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  showMenu = false;
  temp;

  @ViewChild ('search' , {static: false})
  public searchElementRef: ElementRef;



  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    // private weather: WeatherService
  ) { }

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log("Place: "+place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.latitude, this.longitude);
          // this.getWeater(this.latitude, this.longitude);
        });
      });
    });
  }

    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12  ;
          this.getAddress(this.latitude, this.longitude);
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
      this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }

      });
    }


  }
