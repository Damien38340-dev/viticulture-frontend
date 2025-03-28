import {Component, Input, OnInit} from '@angular/core';
import {Soil} from '../../soil';
import {SoilService} from '../../services/soil.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-soil',
  templateUrl: './soil.component.html',
  styleUrl: './soil.component.css',
  imports: [FormsModule, NgForOf, NgIf, NgOptimizedImage],
  standalone: true
})
export class SoilComponent implements OnInit {
  title = "Soil";

  @Input() soil!: Soil;

  soilDataList: Soil[] = [];
  selectedPolyId?: Soil;
  polyId: string = '';
  showAllData = false;

  constructor(private soilService: SoilService) {
  }

  ngOnInit() {
    this.fetchAllSoilData();
  }

  fetchAllSoilData() {
    this.soilService.getAllSoilData().subscribe({
      next: data => this.soilDataList = data,
      error: err => console.error('Error fetching soil data', err),
    });
  }

  fetchSoilDataByPolyId(polyId: string) {
    this.soilService.getSoilDataByPolyId(polyId).subscribe({
      next: data => this.selectedPolyId = data,
      error: err => console.error('Error fetching soil data', err),
    });
  }

  toggleAllSoilData() {
    this.showAllData = !this.showAllData;
  }
}
