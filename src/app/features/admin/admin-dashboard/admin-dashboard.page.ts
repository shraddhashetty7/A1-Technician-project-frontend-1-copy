import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { BookingService } from '../../../services/booking.service';
import { TechnicianService } from '../../../services/technician.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class AdminDashboardPage implements OnInit {

  bookings: any[] = [];
  technicians: any[] = [];

  constructor(
    private bookingService: BookingService,
    private technicianService: TechnicianService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBookings();
    this.loadTechnicians();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        console.log('Bookings from API:', data);
        this.bookings = data;
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  loadTechnicians() {
    this.technicianService.getTechnicians().subscribe({
      next: (data) => {
        console.log('Technicians:', data);

        data.forEach((tech: any, index: number) => {
          console.log(`Technician ${index}:`, tech);
          console.log(`Name: ${tech.name}`);
          console.log(`Specialization: ${tech.specialization}`);
        });

        this.technicians = data;
      },
      error: (err) => {
        console.error('Technician Error:', err);
      }
    });
  }

  updateStatus(booking: any, status: string) {

    const updatedBooking = {
      ...booking,
      status: status
    };

    this.bookingService.updateBooking(
      booking.id,
      updatedBooking
    ).subscribe({
      next: () => {
        booking.status = status;
        console.log('Status Updated Successfully');
      },
      error: (err) => {
        console.error('Update Failed', err);
      }
    });
  }

  assignTechnician(booking: any, technician: any) {

    const updatedBooking = {
      ...booking,
      technicianId: technician.id,
      technicianName: technician.name,
      status: 'Assigned'
    };

    this.bookingService.updateBooking(
      booking.id,
      updatedBooking
    ).subscribe({
      next: () => {

        booking.technicianId = technician.id;
        booking.technicianName = technician.name;
        booking.status = 'Assigned';

        console.log('Technician Assigned Successfully');
      },
      error: (err) => {
        console.error('Assignment Failed', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    console.log('Admin Logged Out');

    this.router.navigate(['/admin-login']);
  }
}