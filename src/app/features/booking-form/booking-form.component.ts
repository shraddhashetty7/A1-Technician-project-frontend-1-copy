import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class BookingFormComponent implements OnInit {

  booking: any = {
    customerName: '',
    serviceType: '',
    address: '',
    bookingDate: '',
    problemDescription: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.booking.serviceType = params['service'] || '';
      this.booking.problemDescription = params['complaint'] || '';
      this.booking.address = params['address'] || '';
      this.booking.customerName = params['name'] || '';
      this.booking.bookingDate = params['date'] || '';

    });

  }

  onDateChange(event: any) {

    this.booking.bookingDate = event.detail.value;

    console.log('Selected Date:', this.booking.bookingDate);

  }

  submitBooking() {

  console.log('Button Clicked');

  console.log(this.booking);

 if (!this.booking.bookingDate) {

  alert('Please select booking date');

  return;

}

this.booking.bookingDate =
  new Date(this.booking.bookingDate).toISOString();

  console.log('Formatted Date:', this.booking.bookingDate);

  this.bookingService.addBooking(this.booking).subscribe({

    next: (response) => {

      console.log('Booking Saved Successfully', response);

      this.router.navigate(['/booking-success'], {
        state: {
          booking: response
        }
      });

    },

    error: (err) => {

      console.log(err);

      alert(JSON.stringify(err.error));

    }

  });

  }
}