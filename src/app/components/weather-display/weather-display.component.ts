import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { WeatherJson, WeatherObject } from '../../models/weather';


@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnChanges {
  @Input() forecast?: WeatherJson;
  public mainWeather?: WeatherObject;
  public weatherIcon?: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName == "forecast") {
        this.mainWeather = this.forecast?.current.weather.at(0);
        
        const WEATHER_ICON_URL = `https://openweathermap.org/img/wn/${this.mainWeather?.icon}@2x.png`;
        this.weatherIcon = WEATHER_ICON_URL;
      }
    }
  }
}
