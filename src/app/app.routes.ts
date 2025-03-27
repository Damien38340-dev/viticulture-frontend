import { Routes } from '@angular/router';
import {WeatherComponent} from './pages/weather/weather.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {SoilComponent} from './pages/soil/soil.component';

export const routes: Routes = [
  { path: '', title: 'Grow Your Wine - Home Page', component: HomeComponent},
  { path: 'weather', title: 'Weather', component: WeatherComponent },
  { path: 'soil', title: 'Soil', component: SoilComponent},
  { path: '**', title: 'Error', component: PageNotFoundComponent}
];
