import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon
  ]
})
export class AdminLoginPage {

  email: string = '';
  password: string = '';
  showPassword = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    // register icons
    addIcons({
      eyeOutline,
      eyeOffOutline
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
  const payload = {
    email: this.email,
    password: this.password
  };

  this.http.post('https://localhost:7122/api/auth/login', payload)
    .subscribe({
      next: (res: any) => {
        this.authService.saveAuthData(res.token, res.role);

        if (res.role === 'Admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('You are not an Admin');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Invalid Login Credentials');
      }
    });
}
}
