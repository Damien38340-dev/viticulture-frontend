import {inject, Injectable} from '@angular/core';
import {Soil} from '../soil';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SoilService {

  private httpClient: HttpClient = inject(HttpClient); // Two ways to do it, either in the constructor or with inject()
  private baseUrl = environment.apiUrl;
  protected soilDataList: Soil[] = [];

  constructor() {
  }

  getAllSoilData(): Observable<Soil[]> {
    return this.httpClient.get<Soil[]>(`${this.baseUrl}/api/soil`);
  }

  getSoilDataByPolyId(polyId: string): Observable<Soil> {
    return this.httpClient.get<Soil>(`${this.baseUrl}/api/soil/polyid/${polyId}`);
  }
}
