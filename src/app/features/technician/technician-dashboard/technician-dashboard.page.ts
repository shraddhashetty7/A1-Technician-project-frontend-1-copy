import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/angular/standalone';

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
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton
  ]
})
export class TechnicianDashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}