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
  private baseURL = environment.apiUrl;
  protected weatherDataList: Weather[] = [];

  constructor() {
  }


  getAllWeatherData(): Observable<Weather[]> {
    return this.httpClient.get<Weather[]>(this.baseURL)
  }

  getWeatherByCity(city: string): Observable<Weather> {
    return this.httpClient.get<Weather>(`${this.baseURL}/api/weather/city/${city}`);
  }
}
