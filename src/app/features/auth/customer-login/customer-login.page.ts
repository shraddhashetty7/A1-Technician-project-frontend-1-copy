import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { phonePortraitOutline } from 'ionicons/icons';


import {
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    RouterLink,IonIcon,      // ✅ add this
  ]
})
export class CustomerLoginPage {

  phone: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({ phonePortraitOutline });
  }

  login() {
    if (!this.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }

    const payload = { phone: this.phone };

    this.http.post('https://localhost:7122/api/customer/login', payload)
  .subscribe({
    next: (res: any) => {
      this.authService.saveAuthData(res.token, res.role);
      localStorage.setItem('customerId', res.customerId);
      localStorage.setItem('customerName', res.name);
      localStorage.setItem('customerPhone', res.phone);   // ✅ new
localStorage.setItem('customerEmail', res.email);   // ✅ new
      this.router.navigate(['/tabs/home']);  // ✅ moved here
    },
    error: (err) => {
      if (err.status === 404) {
        alert('Phone not registered. Please register first.');
        this.router.navigate(['/customer-register']);  // ✅ redirect to register
      } else {
        alert('Login failed. Please try again.');
      }
    }
  });
  }
}