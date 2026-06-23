import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardContent
  ]
})
export class AdminOrdersPage {

  orders = [
    {
      customerName: 'sujith',
      serviceType: 'Plumbing',
      status: 'Pending'
    },
    {
      customerName: 'sadhana',
      serviceType: 'Electrical',
      status: 'Assigned'
    }
  ];

}