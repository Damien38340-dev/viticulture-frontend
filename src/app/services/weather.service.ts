import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Weather} from '../weather';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private httpClient: HttpClient = inject(HttpClient); // Two ways to do it, either in the constructor or with inject()
  private baseUrl = environment.apiUrl;

  constructor() {
  }


  getAllWeatherData(): Observable<Weather[]> {
    return this.httpClient.get<Weather[]>(`${this.baseUrl}/api/weather`)
  }

  getWeatherByCity(city: string): Observable<Weather> {
    const formattedCity = this.formatCityName(city);
    return this.httpClient.get<Weather>(`${this.baseUrl}/api/weather/city/${formattedCity}`);
  }

  getForecastByCity(city: string): Observable<Weather[]> {
    const formattedCity = this.formatCityName(city);
    return this.httpClient.get<Weather[]>(`${this.baseUrl}/api/weather/forecast/city/${formattedCity}`);
  }


  formatCityName(city: string): string {
    return city.replace(/\s+/g, '+');
  }

}
