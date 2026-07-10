import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router'; // ✅ ADD THIS
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-electrical',
  templateUrl: './electrical.page.html',
  styleUrls: ['./electrical.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class ElectricalPage implements OnInit {
complaintText: string = '';
// Service List
services = [

{ name:'Fan Installation / Repair', icon:'fan.png', selected:false },
{ name:'Light Installation / Repair', icon:'light.png', selected:false },

{ name:'Power Socket Installation', icon:'socket.png', selected:false },
{ name:'Wiring Installation / Repair', icon:'wiring.png', selected:false },

{ name:'MCB Repair', icon:'mcb.jpg', selected:false },
{ name:'Door Bell Installation', icon:'doorbell.png', selected:false },

{ name:'Inverter Installation / Repair', icon:'inverter.png', selected:false },
{ name:'UPS Installation', icon:'ups.png', selected:false },

{ name:'Tube Light Installation', icon:'tubelight.png', selected:false },
{ name:'Short Circuit Repair', icon:'shortcircuit.png', selected:false },

{ name:'Fuse Replacement', icon:'fuse.png', selected:false },


{ name:'Earthing Installation', icon:'earthing.png', selected:false },


{ name:'Water Pump Electrical Repair', icon:'pump.png', selected:false },
{ name:'Exhaust Fan Installation', icon:'exhaust.png', selected:false },

{ name:'House Electrical Maintenance', icon:'maintenance.png', selected:false },
{ name:'Door bell', icon:'doorbell.png', selected:false },
{ name:'Other', icon:'electrician.png', selected:false },


];

cart:any[]=[];
constructor(
  private router: Router,
  private authService: AuthService
) {}


ngOnInit() {}

addToCart() {
  this.cart = this.services.filter(service => service.selected);
  alert(this.cart.length + " service(s) added to cart");
}

bookNow() {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/customer-login'], {
      queryParams: {
        returnUrl: '/tabs/saved-address',
        service: 'Electrical',
        complaint: this.complaintText
      }
    });
    return;
  }

  this.router.navigate(['/tabs/saved-address'], {
    queryParams: {
      service: 'Electrical',
      complaint: this.complaintText
    }
  });
}
}