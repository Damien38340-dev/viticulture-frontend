import {Component, Input, OnInit} from '@angular/core';
import {Weather} from '../../weather';
import {WeatherService} from '../../services/weather.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  imports: [FormsModule, NgForOf, NgIf, NgOptimizedImage, NgClass, DatePipe],
  standalone: true
})
export class WeatherComponent implements OnInit {
  title = 'Weather';

  @Input() weather!: Weather;

  weatherDataList: Weather[] = [];
  selectedCityWeather?: Weather;
  city: string = '';
  showAllData = false;
  currentYear = new Date().getFullYear();

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.fetchAllWeather();
  }

  fetchAllWeather() {
    this.weatherService.getAllWeatherData().subscribe({
      next: data => {
        this.weatherDataList = data;
        // Set first item as selected if no selection exists
        if (!this.selectedCityWeather && this.weatherDataList.length > 0) {
          this.selectedCityWeather = this.weatherDataList[0];
        }
      },
      error: err => console.error('Error fetching weather data', err),
    });
  }

  fetchWeatherByCity(city: string) {
    if (!city.trim()) return;

    this.weatherService.getWeatherByCity(city).subscribe({
      next: data => this.selectedCityWeather = data,
      error: err => console.error('Error fetching weather data', err)
    });
  }

  toggleAllWeatherData() {
    this.showAllData = !this.showAllData;
  }

  selectWeatherData(weather: Weather): void {
    this.selectedCityWeather = weather;
  }

  isSelectedWeather(weather: Weather): boolean {
    return this.selectedCityWeather?.city === weather.city &&
      this.selectedCityWeather?.date === weather.date;
  }

  getWeatherIcon(): string {
    if (!this.selectedCityWeather) return 'fas fa-cloud';

    // Determine icon based on temperature, precipitation, etc.
    const temp = this.selectedCityWeather.temperature;
    const precip = this.selectedCityWeather.precipitation;

    if (precip > 5) return 'fas fa-cloud-showers-heavy';
    if (precip > 0) return 'fas fa-cloud-rain';
    if (temp > 25) return 'fas fa-sun';
    if (temp > 15) return 'fas fa-cloud-sun';
    if (temp < 5) return 'fas fa-snowflake';

    return 'fas fa-cloud';
  }

  getWeatherCondition(): string {
    if (!this.selectedCityWeather) return 'Cloudy';

    const temp = this.selectedCityWeather.temperature;
    const precip = this.selectedCityWeather.precipitation;

    if (precip > 5) return 'Heavy Rain';
    if (precip > 0) return 'Light Rain';
    if (temp > 25) return 'Sunny';
    if (temp > 15) return 'Partly Cloudy';
    if (temp < 5) return 'Snow';

    return 'Cloudy';
  }

  generateForecastData() {
    // This is placeholder data - in a real app, you'd get this from an API
    if (!this.selectedCityWeather) return [];

    const forecast = [];
    const baseDate = new Date();
    const baseTemp = this.selectedCityWeather.temperature;
    const icons = ['fas fa-sun', 'fas fa-cloud-sun', 'fas fa-cloud',
      'fas fa-cloud-rain', 'fas fa-cloud-showers-heavy'];

    for (let i = 1; i <= 5; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + i);

      // Generate some random variations for the forecast
      const variation = Math.floor(Math.random() * 8) - 4;
      const iconIndex = Math.floor(Math.random() * icons.length);

      forecast.push({
        date: date,
        min: Math.round(baseTemp - 5 + variation),
        max: Math.round(baseTemp + 3 + variation),
        icon: icons[iconIndex]
      });
    }

    return forecast;
  }
}
