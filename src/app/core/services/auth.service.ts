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

  // ✅ CHANGED: wipe EVERYTHING, not just named keys.
  // Guarantees no stale customerId/phone/email survives into the
  // next person's session, even if new keys get added later.
  logout() {
    localStorage.clear();
    sessionStorage.clear();

    // Full page reload instead of router.navigate. This resets ALL
    // in-memory component/service state too (not just storage), so
    // no component still holds the previous customer's data in a
    // variable, cached observable, or Angular service singleton.
    window.location.href = '/customer-login';
  }
}