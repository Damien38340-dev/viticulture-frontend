import {Component, Input, OnInit} from '@angular/core';
import {Weather} from '../../weather';
import {WeatherService} from '../../services/weather.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  imports: [FormsModule, NgForOf, NgIf, NgOptimizedImage, NgClass, DatePipe, DecimalPipe],
  standalone: true
})
export class WeatherComponent implements OnInit {
  title = 'Weather';

  @Input() weather!: Weather;

  weatherDataList: Weather[] = [];
  selectedCityWeather?: Weather;
  forecastData: Weather[] = [];
  dailyForecasts: any[] = [];
  city: string = '';
  showAllData = false;
  currentYear = new Date().getFullYear();
  isLoading = false;
  expandedForecast: string | null = null;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.fetchAllWeather();
  }

  fetchAllWeather() {
    this.isLoading = true;
    this.weatherService.getAllWeatherData().subscribe({
      next: data => {
        this.weatherDataList = data;
        // Set first item as selected if no selection exists
        if (!this.selectedCityWeather && this.weatherDataList.length > 0) {
          this.selectedCityWeather = this.weatherDataList[0];
          this.mapWeatherIcon(this.selectedCityWeather);
          this.fetchForecastData(this.selectedCityWeather.city);
        }
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching weather data', err);
        this.isLoading = false;
      }
    });
  }

  fetchWeatherByCity(city: string) {
    if (!city.trim()) return;

    this.isLoading = true;
    this.weatherService.getWeatherByCity(city).subscribe({
      next: data => {
        this.selectedCityWeather = data;
        this.mapWeatherIcon(this.selectedCityWeather);
        this.fetchForecastData(city);
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching weather data', err);
        this.isLoading = false;
      }
    });
  }

  fetchForecastData(city: string) {
    this.isLoading = true;
    this.weatherService.getForecastByCity(city).subscribe({
      next: data => {
        this.forecastData = data;
        this.processForecastData();
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching forecast data', err);
        this.isLoading = false;
      }
    });
  }

  // Process the 3-hourly forecast data into daily forecasts
  processForecastData() {
    // Group forecasts by day
    const groupedForecasts = new Map<string, Weather[]>();

    this.forecastData.forEach(forecast => {
      const date = new Date(forecast.date);
      const dateString = date.toISOString().split('T')[0];

      if (!groupedForecasts.has(dateString)) {
        groupedForecasts.set(dateString, []);
      }

      const forecasts = groupedForecasts.get(dateString);
      if (forecasts) {
        // Map the icon before adding to array
        forecast.formattedIcon = this.mapWeatherIconCode(forecast.weatherIcon);
        forecasts.push(forecast);
      }

    });

    // Create daily forecast summaries
    this.dailyForecasts = Array.from(groupedForecasts.entries()).map(([dateString, forecasts]) => {
      // Find min and max temps for the day
      const temps = forecasts.map(f => f.temperature);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);

      // Use noon forecast for display or first available
      const middayForecast = forecasts.find(f => {
        const hours = new Date(f.date).getHours();
        return hours >= 11 && hours <= 13;
      }) || forecasts[0];

      return {
        date: new Date(dateString),
        dateString,
        minTemp,
        maxTemp,
        icon: middayForecast.formattedIcon,
        condition: middayForecast.weatherCondition,
        hourlyForecasts: forecasts
      };
    });

    // Limit to 5 days
    this.dailyForecasts = this.dailyForecasts.slice(0, 5);
  }

  // Apply icon mapping to weather object
  mapWeatherIcon(weather: Weather | undefined) {
    if (weather && weather.weatherIcon) {
      weather.formattedIcon = this.mapWeatherIconCode(weather.weatherIcon);
    }
  }

  mapWeatherIconCode(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  // Toggle expanded forecast details
  toggleForecastDetails(dateString: string) {
    if (this.expandedForecast === dateString) {
      this.expandedForecast = null;
    } else {
      this.expandedForecast = dateString;
    }
  }

  isForecastExpanded(dateString: string): boolean {
    return this.expandedForecast === dateString;
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

  displayCityName(city: string): string {

    if (!city) return '';

    return city
      .split('+')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
