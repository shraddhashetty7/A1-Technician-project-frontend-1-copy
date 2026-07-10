import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service'; // adjust path to match your project

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class AccountPage implements OnInit {

  name: string = '';
  phone: string = '';
  image: string = 'assets/profile.png';

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private authService: AuthService // ✅ NEW
  ) {}

  ngOnInit() {
    // ✅ CHANGED: load the REAL logged-in customer's info first
    this.name = localStorage.getItem('customerName') || '';
    this.phone = localStorage.getItem('customerPhone') || '';

    // Then apply any local profile customization (e.g. custom photo)
    // on top of it, without overwriting name/phone from a stale value.
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.image) this.image = data.image;
    }
  }

  async openEditProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        name: this.name,
        phone: this.phone,
        image: this.image
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.name = data.name;
      this.phone = data.phone;
      this.image = data.image;

      localStorage.setItem('user_profile', JSON.stringify(data));
    }
  }

  async goToTrackOrder() {
  const customerId = Number(localStorage.getItem('customerId'));

  if (!customerId) {
    this.router.navigate(['/customer-login']);
    return;
  }

  this.http.get<any>(`${environment.apiUrl}/api/customer/track/${customerId}`)
    .subscribe({
      next: (res) => {
        const bookingId = res?.ActiveBooking?.Id ?? 0;
        this.router.navigate(['/tabs/track-order', bookingId]);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/tabs/track-order', 0]);
      }
    });
}

  goToBookingHistory() {
    this.router.navigateByUrl('/tabs/booking');
  }

  goToSavedAddress() {
    this.router.navigate(['/tabs/saved-address']);
  }

  goToReview() {
    this.router.navigate(['/tabs/review']);
  }

  // ✅ FIXED: previously only navigated, never cleared any session data.
  // Now delegates to AuthService.logout(), which clears localStorage +
  // sessionStorage and does a full page reload to reset all in-memory state.
  logout() {
  this.authService.logout(); // clears token, customerId, customerName, etc.
  this.router.navigate(['/tabs/home'], { replaceUrl: true });
}
}