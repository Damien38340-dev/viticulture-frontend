import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class HomeComponent {
title = "Welcome";
}
