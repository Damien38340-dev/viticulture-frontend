import {Component, Input, OnInit} from '@angular/core';
import {Soil} from '../../soil';
import {SoilService} from '../../services/soil.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-soil',
  templateUrl: './soil.component.html',
  styleUrl: './soil.component.css',
  imports: [FormsModule, NgForOf, NgIf, NgOptimizedImage, NgClass],
  standalone: true
})
export class SoilComponent implements OnInit {
  title = "Soil";

  @Input() soil!: Soil;

  soilDataList: Soil[] = [];
  selectedPolyId?: Soil;
  polyId: string = '';
  showAllData = false;
  currentYear = new Date().getFullYear();

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

  selectSoilData(soil: Soil): void {
    this.selectedPolyId = soil;
  }

  isSelectedSoil(soil: Soil): boolean {
    return this.selectedPolyId?.polyId === soil.polyId &&
      this.selectedPolyId?.date === soil.date;
  }

  toggleAllSoilData() {
    this.showAllData = !this.showAllData;
  }
}
