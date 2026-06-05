import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ ADD THIS
import {
IonContent,
IonHeader,
IonToolbar,
IonCheckbox,
IonButton,
IonTextarea,
IonLabel
} from '@ionic/angular/standalone';

@Component({
selector: 'app-ac',
templateUrl: './ac.page.html',
styleUrls: ['./ac.page.scss'],
standalone: true,
imports: [
IonContent,
IonHeader,
IonToolbar,
IonCheckbox,
IonButton,
IonTextarea,
IonLabel,
CommonModule,
FormsModule,
RouterModule
]
})

export class AcPage implements OnInit {

services = [
{ name:'AC Installation', icon:'ac-install.jpg', selected:false },
{ name:'AC Uninstallation', icon:'ac-uninstall.jpg', selected:false },
{ name:'AC Gas Refill', icon:'gas.png', selected:false },
{ name:'AC General Service', icon:'service.jpg', selected:false },
{ name:'AC Deep Cleaning', icon:'cleaning.jpg', selected:false },
{ name:'AC Repair', icon:'repair.png', selected:false },
{ name:'Water Leakage Fix', icon:'leak.png', selected:false },
{ name:'Cooling Problem', icon:'cooling.png', selected:false },
{ name:'PCB / Electrical Repair', icon:'pcb.png', selected:false },
{ name:'Remote Issue', icon:'remote.png', selected:false },
{ name:'Compressor Repair', icon:'compressor.png', selected:false },
{ name:'Noise Problem', icon:'noise.png', selected:false }
];

complaintText = '';

cart:any[] = [];

 constructor(private router: Router) {}  // ✅ ADD HERE

ngOnInit() { }

addToCart(){

this.cart = this.services.filter(service => service.selected);

}
// 👇 ADD THIS METHOD HERE
  getSelectedServices(): string {

    return this.services
      .filter(x => x.selected)
      .map(x => x.name)
      .join(', ');

  }

bookNow() {
  this.router.navigate(['/booking-form'], {
    queryParams: {
      service: 'AC',
      complaint: this.complaintText
    }
  });
}
}