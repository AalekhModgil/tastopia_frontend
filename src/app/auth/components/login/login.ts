import { Component } from '@angular/core';
import { Auth } from '../../services/auth/services/auth';
import { Router } from '@angular/router';
import { SigninData } from '../../models/signin-data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private authService: Auth, private router: Router){}

  onSubmit() {
    const data: SigninData = { email: this.email, password: this.password };
    this.authService.signin(data).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        alert('Login failed: ' + error.message);
      }
    });
  }
}
