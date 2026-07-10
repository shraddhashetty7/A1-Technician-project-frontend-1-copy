import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // ✅ added ActivatedRoute
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
    RouterLink, IonIcon,
  ]
})
export class CustomerLoginPage {

  phone: string = '';

  // ✅ NEW: capture returnUrl + service + complaint from query params
  returnUrl: string = '/tabs/home';
  serviceParam: string | null = null;
  complaintParam: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,   // ✅ added
    private authService: AuthService
  ) {
    addIcons({ phonePortraitOutline });

    // ✅ read query params passed from bookNow()
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/tabs/home';
      this.serviceParam = params['service'] || null;
      this.complaintParam = params['complaint'] || null;
    });
  }

  login() {
    if (!this.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }

    // ✅ NEW: wipe any leftover session from a previous customer
    // BEFORE writing this login's data. Prevents stale customerId/
    // phone/email from a prior session bleeding into this one.
    localStorage.clear();
    sessionStorage.clear();

    const payload = { phone: this.phone };

    this.http.post('https://localhost:7122/api/customer/login', payload)
      .subscribe({
        next: (res: any) => {
          this.authService.saveAuthData(res.token, res.role);
          localStorage.setItem('customerId', res.customerId);
          localStorage.setItem('customerName', res.name);
          localStorage.setItem('customerPhone', res.phone);
          localStorage.setItem('customerEmail', res.email);

          if (this.serviceParam) {
            this.router.navigate([this.returnUrl], {
              queryParams: {
                service: this.serviceParam,
                complaint: this.complaintParam
              }
            });
          } else {
            this.router.navigate([this.returnUrl]);
          }
        },
        error: (err) => {
          if (err.status === 404) {
            alert('Phone not registered. Please register first.');
            this.router.navigate(['/customer-register']);
          } else {
            alert('Login failed. Please try again.');
          }
        }
      });
  }
}