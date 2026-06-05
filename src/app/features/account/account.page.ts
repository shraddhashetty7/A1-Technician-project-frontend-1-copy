import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

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
export class AccountPage {

  constructor(private router: Router) {}
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
}