import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class SplashPage {

  constructor(private router: Router) {

    setTimeout(() => {
      this.router.navigateByUrl('/tabs/home');
    }, 3000);

  }

}