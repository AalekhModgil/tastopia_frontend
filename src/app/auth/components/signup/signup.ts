import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/services/auth';
import { SignupData } from '../../models/signup-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true
})
export class Signup {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  agreeToTerms: boolean = false;
  showPassword: boolean = false;

  constructor(private authService: Auth, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    const data: SignupData = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      profileImageUrl: null,
    };
    this.authService.signup(data).subscribe({
      next: () => {
        this.snackBar.open('Signup successful! Please log in.', 'Close', { duration: 2000, panelClass: 'mat-primary', verticalPosition: 'top' });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        const emailTaken = error?.error?.details?.email;
        const phoneTaken = error?.error?.details?.phone;
        let message = '';
        if (emailTaken && phoneTaken) {
          message = 'Email and Phone number already taken';
        } else if (emailTaken) {
          message = emailTaken;
        } else if (phoneTaken) {
          message = phoneTaken;
        }
        if (message) {
          this.snackBar.open(message, 'Close', { duration: 4000, panelClass: 'mat-warn', verticalPosition: 'top' });
          return;
        }
        let fallback = 'Signup failed.';
        if (error?.error?.error) {
          fallback = error.error.error;
        } else if (error?.message) {
          fallback = error.message;
        }
        this.snackBar.open(fallback, 'Close', { duration: 4000, panelClass: 'mat-warn', verticalPosition: 'top' });
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}