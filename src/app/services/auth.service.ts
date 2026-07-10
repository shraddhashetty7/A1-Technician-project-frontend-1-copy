import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Save login data
  saveAuthData(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get role
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
 logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('customerId');
  localStorage.removeItem('customerName');
  localStorage.removeItem('customerPhone');
  localStorage.removeItem('customerEmail');
}
}