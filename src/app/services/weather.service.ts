import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherJson } from '../models/weather';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_URL = `https://api.openweathermap.org/data/3.0/onecall?`;

  constructor(private _http: HttpClient) { }

  GetResults(lat: number, long: number, measuringUnit: string = "Metric"): Observable<WeatherJson> {
    let url_params = `lat=${lat}&lon=${long}&units=${measuringUnit}&appid=${environment.OPENWEATHER_API_KEY}`
    let url = this.API_URL + url_params;

    return this._http.get<WeatherJson>(url);
  }
}
