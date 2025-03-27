import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Weather} from '../weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private httpClient: HttpClient = inject(HttpClient);
  private baseURL = 'http://localhost:8080/api/weather';
  protected weatherDataList: Weather[] = [];

  constructor() {
  }


  getAllWeatherData(): Observable<Weather[]> {
    return this.httpClient.get<Weather[]>(this.baseURL)
  }

  getWeatherByCity(city: string): Observable<Weather> {
    return this.httpClient.get<Weather>(`${this.baseURL}/city/${city}`);
  }
}
