import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RestaurantModel } from './models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class Restaurant {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get<RestaurantModel[]>(`${this.apiUrl}/restaurants`);
  }
}