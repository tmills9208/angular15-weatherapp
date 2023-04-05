import { GeolocationService } from './services/geolocation.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WeatherJson } from './models/weather';
import { WeatherService } from './services/weather.service';
import { GeocodeResponse } from './models/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Weather';
  forecast?: WeatherJson;
  forecastString?: string;
  coords?: GeocodeResponse;
  address?: string

  constructor(
    private weatherService: WeatherService,
    private geoService: GeolocationService
  ) {}

  SearchAddressOnClick() {
    this.geoService.GetGeolocationFromAddress(this.address).subscribe(response => {
      this.coords = response;
      console.info("Coords from Address: {}", this.coords)
      this.GetForecast();
    })
  }

  GeolocationOnClick() {
    this.geoService.GetDeviceGeolocation().subscribe((response) => {
      this.coords = {
        lat: response.latitude,
        long: response.longitude
      };
      this.GetForecast();
    });
  }

  private GetForecast() {
    if (!this.coords) return;
    this.forecast = undefined;
    this.weatherService
      .GetResults(this.coords.lat, this.coords.long)
      .subscribe((response) => {
        this.forecast = response;
        // converting unix utc timestamps from seconds to milliseconds
        this.forecast.current.sunrise *= 1000;
        this.forecast.current.sunset *= 1000;
        console.log(this.forecast);
      });
  }
}
