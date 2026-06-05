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
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
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

  goBack() {
    this.router.navigateByUrl('/tabs/account');
  }
}