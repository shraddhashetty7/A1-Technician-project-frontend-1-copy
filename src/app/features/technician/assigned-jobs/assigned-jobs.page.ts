import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,        // ✅ new
  IonTitle,         // ✅ new
  IonToolbar,       // ✅ new
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-assigned-jobs',
  templateUrl: './assigned-jobs.page.html',
  styleUrls: ['./assigned-jobs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,        // ✅ new
    IonTitle,         // ✅ new
    IonToolbar,       // ✅ new
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class AssignedJobsPage implements OnInit {

  jobs: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.loadAssignedJobs();
  }

  loadAssignedJobs() {
    const technicianId = localStorage.getItem('technicianId');

    this.bookingService.getBookings().subscribe({
      next: (data: any[]) => {
        this.jobs = data.filter(
          booking =>
            booking.status?.toLowerCase() === 'assigned' &&
            booking.technicianId == technicianId
        );
        console.log('Assigned Jobs:', this.jobs);
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
      }
    });
  }

  updateStatus(job: any, status: string) {
    const updatedBooking = { ...job, status: status };

    this.bookingService.updateBooking(job.id, updatedBooking).subscribe({
      next: () => {
        job.status = status;
        console.log('Status Updated Successfully');
      },
      error: (err) => {
        console.error('Update Failed', err);
      }
    });
  }
}