import {Component, inject, Input} from '@angular/core';
import {Soil} from '../../soil';
import {SoilService} from '../../services/soil.service';

@Component({
  selector: 'app-soil',
  templateUrl: './soil.component.html',
  styleUrl: './soil.component.css'
})
export class SoilComponent {
title= "Soil";


  @Input() soil!: Soil;

  soilDataList: Soil[] = [];
  soilDataService: SoilService = inject(SoilService);

  constructor() {
    this.soilDataList = this.soilDataService.getAllSoilData();
  }
}
