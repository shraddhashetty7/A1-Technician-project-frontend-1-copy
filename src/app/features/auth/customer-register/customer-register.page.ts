import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) 
  {addIcons({ personAddOutline });}

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
          this.authService.saveAuthData(res.token, res.role);
          localStorage.setItem('customerId', res.customerId);
          localStorage.setItem('customerName', res.name);
          alert('Registration successful! Welcome ' + res.name);
          this.router.navigate(['/tabs/home']);   // ✅ changed from '/customer-dashboard'
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