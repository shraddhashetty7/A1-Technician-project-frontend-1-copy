import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { EditProfilePage } from './edit-profile/edit-profile.page';

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

  name: string = 'Shraddha Shetty';
  phone: string = '+91 9876543210';
  image: string = 'assets/profile.png';

  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {
    // load saved profile if it exists
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      const data = JSON.parse(saved);
      this.name = data.name;
      this.phone = data.phone;
      this.image = data.image;
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

      // persist so it survives app reload
      localStorage.setItem('user_profile', JSON.stringify(data));
    }
  }

  goToTrackOrder() {
    this.router.navigate(['/tabs/track-order']);
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

  logout() {
    this.router.navigate(['/role-selection']);
  }
}