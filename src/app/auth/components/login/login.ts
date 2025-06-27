import { Component } from '@angular/core';
import { Auth } from '../../services/auth/services/auth';
import { Router } from '@angular/router';
import { SigninData } from '../../models/signin-data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: Auth, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.snackBar.open('Email and password are required.', 'Close', { duration: 3000, panelClass: 'mat-warn', verticalPosition: 'top' });
      return;
    }
    const data: SigninData = { email: this.email, password: this.password };
    this.authService.signin(data).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.snackBar.open('Login successful!', 'Close', { duration: 2000, panelClass: 'mat-primary', verticalPosition: 'top' });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        let message = 'Login failed.';
        if (error?.error?.error) {
          message = error.error.error;
        } else if (error?.message) {
          message = error.message;
        }
        this.snackBar.open(message, 'Close', { duration: 4000, panelClass: 'mat-warn', verticalPosition: 'top' });
      },
    });
  }

  togglePasswordVisibility(event?: Event) {
    this.showPassword = !this.showPassword;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}