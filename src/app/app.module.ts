import { BrowserModule } from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router';
import {WeatherComponent} from './pages/weather/weather.component';
import {AppComponent} from './app.component';
import {SoilComponent} from './pages/soil/soil.component';
import {HomeComponent} from './pages/home/home.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DatabaseStatusComponent} from './components/database-status/database-status.component';

@NgModule({
  imports: [BrowserModule, RouterModule,  CommonModule, AppComponent, HomeComponent, NavbarComponent, FormsModule, WeatherComponent, SoilComponent, DatabaseStatusComponent],
  declarations: [],
  bootstrap: [],
  providers: [],
})
export class AppModule { }
