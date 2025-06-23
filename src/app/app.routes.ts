import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login';
import { Signup } from './auth/components/signup/signup';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './auth/guards/auth/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
