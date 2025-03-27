import {Component, Input, inject, OnInit} from '@angular/core';
import {Weather} from '../../weather';
import {WeatherService} from '../../services/weather.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  imports: [FormsModule, NgForOf, NgIf],
  standalone: true
})
export class WeatherComponent implements OnInit {
  title = 'Weather';

  @Input() weather!: Weather;

  weatherDataList: Weather[] = [];
  selectedCityWeather?: Weather;
  city: string = '';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.fetchAllWeather();
  }

  fetchAllWeather() {
    this.weatherService.getAllWeatherData().subscribe({
      next: data =>this.weatherDataList = data,
      error: err => console.error('Error fetching weather data', err),
    });
  }

  fetchWeatherByCity(city: string) {
    this.weatherService.getWeatherByCity(city).subscribe({
      next: data => this.selectedCityWeather = data,
      error: err => console.error('Error fetching weather data', err)
    });
  }
}
