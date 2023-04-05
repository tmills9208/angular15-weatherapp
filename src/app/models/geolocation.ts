export interface LatLong {
  lat: number;
  lng: number;
}

export interface GeocodeRequest {
  address: string
}

export interface GeocodeResponse {
  lat: number;
  long: number;
}