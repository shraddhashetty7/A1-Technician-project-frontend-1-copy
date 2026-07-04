import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { clipboardOutline, chevronForwardOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-technician-dashboard',
  templateUrl: './technician-dashboard.page.html',
  styleUrls: ['./technician-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonButton,
    IonIcon
  ]
})
export class TechnicianDashboardPage implements OnInit {

  technicianName: string | null = null;
  technicianId: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.technicianName = localStorage.getItem('technicianName');
    this.technicianId = localStorage.getItem('technicianId');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('technicianId');
    localStorage.removeItem('technicianName');
    this.router.navigate(['/technician-login']);
  }

}