import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DatabaseStatusComponent} from './components/database-status/database-status.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DatabaseStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'Make It Grow';
}
