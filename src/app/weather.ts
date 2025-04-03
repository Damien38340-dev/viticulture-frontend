export interface Weather {

  id: number;
  city: string;
  date: string;
  weatherCondition: string;
  weatherDescription: string;
  weatherIcon: string;
  formattedIcon?: string;
  sunrise: number;
  sunset: number;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  clouds: number;
  insolationDuration: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  snow: number;

}
