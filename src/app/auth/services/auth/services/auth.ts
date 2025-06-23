import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignupData } from '../../../models/signup-data';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../models/auth-response';
import { SigninData } from '../../../models/signin-data';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  signup(data: SignupData): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/users/signup`, {
      ...data, profileImageUrl: null
    })
  }

  signin(data: SigninData): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/users/signin`,data);
  }

  signout(): Observable<any>{
    return this.http.post(`${this.apiUrl}/users/signout`,{});
  }

  setToken(token: string): void{
    localStorage.setItem('token',token);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  } 

  removeToken(): void{
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

