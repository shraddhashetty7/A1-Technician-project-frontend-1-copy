import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ IMPORT
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  stars = [1, 2, 3, 4, 5];
  rating: number = 0;
  comment: string = '';

  constructor(private router: Router) {  // ✅ INJECT HERE
    addIcons({
      star,
      'star-outline': starOutline
    });
  }

  setRating(value: number) {
    this.rating = value;
  }

  submitReview() {
    console.log('Rating:', this.rating);
    console.log('Comment:', this.comment);
  }

  goBack() {
    this.router.navigateByUrl('/tabs/account'); // ✅ CORRECT PATH
  }
}