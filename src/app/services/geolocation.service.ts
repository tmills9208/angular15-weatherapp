import { MapGeocoderResponse } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeocodeResponse, LatLong } from '../models/geolocation';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  
  constructor(private http: HttpClient) {}

  private ClearExtraSpaces(_string: string = "") {
    return _string.replace(/\s+/g, " ");
  }

  GetGeolocationFromAddress(address: string = ""): Observable<GeocodeResponse> {
    return new Observable<GeocodeResponse>(observer => {
      let parsedAddress = encodeURI(this.ClearExtraSpaces(address));
      const params = `?address=${parsedAddress}&key=${environment.GOOGLE_MAPS_API_KEY}`;
      const url = environment.GOOGLE_MAPS_GEOCODE_DATA_URL + params;
      console.log(url);
      
      this.http.get<MapGeocoderResponse>(url).subscribe(response => {
        let location = response.results.at(0);
        if (!location) {observer.error("Something wrong with the request or address");}
        else {
          // NOTE: Weird type errors occuring with packages, fixed with this 'hack'
          let json: LatLong = location.geometry.location as unknown as LatLong;
          let coords: GeocodeResponse = {
            lat: json.lat,
            long: json.lng
          }
          observer.next(coords);
          observer.complete();
        }
      })
    });
  }

  GetDeviceGeolocation(): Observable<GeolocationCoordinates> {
    return new Observable<GeolocationCoordinates>(observer => {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          observer.next(success.coords);
          observer.complete();
        },
        (error) => {
          console.log(error);
          observer.error(error);
        },
      );
    });
  }
}
