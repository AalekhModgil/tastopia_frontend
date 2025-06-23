import { Component } from '@angular/core';
import { Auth } from '../../auth/services/auth/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private authService: Auth, private router: Router){}

  signout() {
    this.authService.signout().subscribe({
      next: () => {
        this.authService.removeToken();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Signout failed: ' + error.message);
      }
    });
  }
}
