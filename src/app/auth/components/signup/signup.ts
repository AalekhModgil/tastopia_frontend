import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/services/auth';
import { SignupData } from '../../models/signup-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';

  constructor(private authService: Auth, private router: Router) {}

  onSubmit() {
    const data: SignupData = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      profileImageUrl: null
    };
    this.authService.signup(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Signup failed: ' + error.message);
      }
    });
  }
}
