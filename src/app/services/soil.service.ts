import {inject, Injectable} from '@angular/core';
import {Soil} from '../soil';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoilService {

  private httpClient: HttpClient = inject(HttpClient); // Two ways to do it, either in the constructor or with inject()
  private baseUrl = 'http://localhost:8080/api/soil';
  protected soilDataList: Soil[] = [];


  constructor() {
  }


  getAllSoilData(): Observable<Soil[]> {
    return this.httpClient.get<Soil[]>(this.baseUrl);
  }

  getSoilDataByPolyId(polyId: string): Observable<Soil> {
    return this.httpClient.get<Soil>(`${this.baseUrl}/polyid/${polyId}`);
  }
}
