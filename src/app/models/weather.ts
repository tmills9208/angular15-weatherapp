export interface WeatherJson {
  lat: number,
  long: number,
  timezone?: string,
  timezone_offset?: number,
  current: CurrentWeatherJson;
}

export interface CurrentWeatherJson {
  dt: number,
  sunrise: number,
  sunset: number,
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number,
  dew_point: number,
  uvi: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  wind_deg: number,
  weather: WeatherObject[]
}

export interface WeatherObject {
  id: number,
  main: string,
  description: string,
  icon: string
}