import { Component } from '@angular/core';
import { Auth } from '../../auth/services/auth/services/auth';
import { Router } from '@angular/router';
import { RestaurantModel } from '../models/restaurant';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  restaurants: RestaurantModel[] = [];
  constructor(
    private authService: Auth,
    private restaurantService: Restaurant,
    private router: Router
  ) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        console.log('Restaurants loaded:', restaurants);
        this.restaurants = restaurants;
      },
      error: (error) => {
        alert('Failed to load restaurants: ' + error.message);
      },
    });
  }

  signout() {
    this.authService.signout().subscribe({
      next: () => {
        this.authService.removeToken();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Signout failed: ' + error.message);
      },
    });
  }
}
