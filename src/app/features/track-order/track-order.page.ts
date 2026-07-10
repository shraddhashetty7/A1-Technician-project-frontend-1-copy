import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.page.html',
  styleUrls: ['./track-order.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TrackOrderPage implements OnInit {

  booking: any;
  hasActiveBooking: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  getStep(): number {
    switch (this.booking?.status) {
      case 'Assigned':
        return 1;
      case 'On The Way':
      case 'In Progress':
        return 2;
      case 'Completed':
        return 3;
      default:
        return 0;
    }
  }

  getStepClass(step: number) {
    const currentStep = this.getStep();
    return {
      completed: step < currentStep,
      active: step === currentStep,
      pending: step > currentStep
    };
  }

  ngOnInit() {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      this.hasActiveBooking = false;
      return; // skip the API call, nothing to fetch
    }

    this.bookingService
      .getBookingById(id)
      .subscribe({
        next: (res) => {
          if (!res) {
            this.hasActiveBooking = false;
            return;
          }
          this.booking = res;
        },
        error: (err) => {
          console.log(err);
          this.hasActiveBooking = false;
        }
      });
  }

  goBack() {
    this.router.navigateByUrl('/tabs/account');
  }

  goToBookingHistory() {
    this.router.navigateByUrl('/tabs/booking');
  }
}