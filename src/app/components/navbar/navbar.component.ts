import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive
  ],
  standalone: true
})
export class NavbarComponent {

  protected readonly NgOptimizedImage = NgOptimizedImage;
}
