import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-plumbing',
  templateUrl: './plumbing.page.html',
  styleUrls: ['./plumbing.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ]
})
export class PlumbingPage implements OnInit {

  complaintText: string = '';

  // ✅ Service List
  services = [
    { name: 'Kitchen Plumbing', icon: 'kitchen.png', selected: false },
    { name: 'Bathroom Plumbing', icon: 'bathroom.png', selected: false },
    { name: 'Shower Installation', icon: 'shower.png', selected: false },
    { name: 'Water Tank Cleaning', icon: 'water-tank.png', selected: false },
    { name: 'Pipe Installation', icon: 'pipe.png', selected: false },
    { name: 'Leakage Repair', icon: 'leak.png', selected: false },
    { name: 'Tap / Faucet Repair', icon: 'tap.png', selected: false },
    { name: 'Other', icon: 'plumber.png', selected: false },
  ];

  // ✅ Cart
  cart: any[] = [];

  constructor(
  private router: Router,
  private authService: AuthService
) {}
  ngOnInit() {}

  // ✅ Auto update cart when checkbox changes
  updateCart() {
    this.cart = this.services.filter(service => service.selected);
    console.log("Cart Updated:", this.cart);
  }

  // ✅ Get selected service names (SAFE for query params)
  getSelectedServiceNames(): string {
    if (!this.cart || this.cart.length === 0) return '';
    return this.cart.map(c => c.name).join(', ');
  }

  // ✅ Book Now (Final Navigation)
  bookNow() {
  this.updateCart();
  const selectedServices = this.getSelectedServiceNames();

  if (!selectedServices) {
    alert('Please select at least one service');
    return;
  }

  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/customer-login'], {
      queryParams: {
        returnUrl: '/tabs/saved-address',
        service: selectedServices,
        complaint: this.complaintText
      }
    });
    return;
  }

  this.router.navigate(['/tabs/saved-address'], {
    queryParams: {
      service: selectedServices,
      complaint: this.complaintText
    }
  });
}
}