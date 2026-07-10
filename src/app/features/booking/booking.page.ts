import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class BookingHistoryPage implements OnInit {

  bookings: any[] = [];

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
  const customerId = localStorage.getItem('customerId');

  if (!customerId) {
    console.warn('No customerId found — cannot load bookings');
    this.bookings = [];
    return;
  }

  this.bookingService.getBookingsByCustomer(Number(customerId)).subscribe({
    next: (data) => {
      console.log('Bookings API Response');
      console.table(data);
      this.bookings = data;
    },
    error: (err) => {
      console.error('Error loading bookings', err);
    }
  });
}
  trackOrder(id: number) {
    this.router.navigate(['/tabs/track-order', id]);
  }

  cancelBooking(id: number) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(id).subscribe({
        next: () => {
          alert('Booking cancelled successfully');
          this.loadBookings();
        },
        error: (err: any) => {
          console.error(err);
          alert('Failed to cancel booking');
        }
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/tabs/account');
  }
}