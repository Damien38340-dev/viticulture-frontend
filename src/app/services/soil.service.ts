import {Injectable} from '@angular/core';
import {Soil} from '../soil';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoilService {

  private baseUrl = 'http://localhost:8080/api/soil';
  protected soilDataList: Soil[] = [];


  constructor(private httpClient: HttpClient) {
  }


  getAllSoilData(): Soil[] {
    return this.soilDataList;
  }

  getSoilDataByPolyId(polyId: string): Soil | undefined {
    return this.soilDataList.find(soil => soil.polyId === polyId);
  }
}
