import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class OrdersPage implements OnInit {

  bookings: any[] = [];

  constructor(private bookingService: BookingService) { }
  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (data: any) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteBooking(id: number) {
    if (confirm('Delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          alert('Booking deleted successfully');
          this.loadBookings();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}