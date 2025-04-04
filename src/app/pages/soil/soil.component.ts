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
  isLoading = false;


  constructor(private soilService: SoilService) {
  }

  ngOnInit() {
    this.fetchAllSoilData();
  }

  fetchAllSoilData() {
    this.isLoading = true;
    this.soilService.getAllSoilData().subscribe({
      next: data => {
        this.soilDataList = data;
        if (!this.selectedPolyId && this.soilDataList.length > 0) {
          this.selectedPolyId = this.soilDataList[0];
        }
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching soil data', err);
        this.isLoading = false;
      }
    });
  }

  fetchSoilDataByPolyId(polyId: string) {
    this.isLoading = true;
    this.soilService.getSoilDataByPolyId(polyId).subscribe({
      next: data => {
        this.selectedPolyId = data;
        this.isLoading = false
      },
      error: err => {
        console.error('Error fetching soil data', err);
        this.isLoading = false;
      }
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
