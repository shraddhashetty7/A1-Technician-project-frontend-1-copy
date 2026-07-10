import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // ✅ added ActivatedRoute
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { IonContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';



@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.page.html',
  styleUrls: ['./customer-register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    RouterLink,
     IonIcon
  ]
})
export class CustomerRegisterPage {

  name: string = '';
  phone: string = '';
  email: string = '';

  // ✅ NEW: carry these forward to customer-login after successful registration
  returnUrl: string | null = null;
  serviceParam: string | null = null;
  complaintParam: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,   // ✅ added
    private authService: AuthService
  ) 
  {
    addIcons({ personAddOutline });

    // ✅ read query params (present if user arrived here via "not registered" redirect from login)
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || null;
      this.serviceParam = params['service'] || null;
      this.complaintParam = params['complaint'] || null;
    });
  }

  register() {
    // Basic validation
    if (!this.name.trim() || !this.phone.trim() || !this.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (this.phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    const payload = {
      name: this.name,
      phone: this.phone,
      email: this.email
    };

    this.http.post('https://localhost:7122/api/customer/register', payload)
      .subscribe({
        next: (res: any) => {
          // ✅ REMOVED auto-login — no token/customerId saved here anymore
          alert('Registration successful! Please login to continue.');

          // ✅ CHANGED: go to customer-login instead of /tabs/home,
          // forwarding returnUrl/service/complaint if they exist
          this.router.navigate(['/customer-login'], {
            queryParams: {
              returnUrl: this.returnUrl || '/tabs/home',
              service: this.serviceParam,
              complaint: this.complaintParam
            }
          });
        },
        error: (err) => {
          if (err.status === 400) {
            alert(err.error.message || 'Registration failed. Please try again.');
          } else {
            alert('Something went wrong. Please try again.');
          }
        }
      });
  }
}