import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/services/auth';
import { SignupData } from '../../models/signup-data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
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

  constructor(private authService: Auth, private router: Router, private cdr: ChangeDetectorRef) {}

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
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Signup failed: ' + error.message);
      },
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showPassword = !this.showPassword;
    this.cdr.detectChanges();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}