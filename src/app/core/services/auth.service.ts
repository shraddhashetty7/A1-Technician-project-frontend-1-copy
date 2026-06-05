import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service'; // ✅ add correct path

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

  // ✅ LOGIN API
  login(email: string, password: string) {
    return this.http.post<User>(
      `${this.apiUrl}/login`,
      { email, password }
    );
  }

  // ✅ SAVE USER TO STORAGE
  async saveUser(user: User) {
    await this.storage.set('user', user);
  }

  // ✅ LOGOUT
  async logout() {
    await this.storage.remove('user');
  }
}
