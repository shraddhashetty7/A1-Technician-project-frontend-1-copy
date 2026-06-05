import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-booking-success',
  templateUrl: './booking-success.page.html',
  styleUrls: ['./booking-success.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BookingSuccessPage implements OnInit {


  booking: any;


  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();


    this.booking = nav?.extras?.state?.['booking'] || history.state?.booking;


    if (!this.booking) {
      this.booking = {
        serviceType: 'Electrical',
        address: 'No address available',
        bookingDate: new Date()
      };
    }
  }


  ngOnInit() {
   
    this.launchConfetti();
  }


  launchConfetti() {
    const duration = 1200; // 1.2 sec
    const end = Date.now() + duration;


    const frame = () => {
      confetti({
        particleCount: 6,
        spread: 80,
        origin: { y: 0.6 }
      });


      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };


    frame();
  }
  goHome() {
  this.router.navigate(['/tabs/home']);
}


viewBookings() {
  this.router.navigateByUrl('/tabs/booking');
}
}
