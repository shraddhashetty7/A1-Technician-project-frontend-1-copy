import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.page.html',
  styleUrls: ['./saved-address.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SavedAddressPage implements OnInit {

  serviceType: string = '';
  complaint: string = '';

  // ✅ Address object (real-world structure)
  address = {
    name: '',
    line1: '',
    line2: '',
    line3: '',
    taluq: '',
    district: '',
    state: '',
    pin: '',
    phone: '',
    email: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.serviceType = params['service'];
      this.complaint = params['complaint'];
    });
  }

  // ✅ Back button
  goBack() {
    this.router.navigate(['/tabs/home']);
  }

  // ✅ Allowed Pin Codes
allowedPins: string[] = [
  '576104',
  '576101',
  '576102',
  '576103',
  '576105',
  '576108',
  '576213'
];

// ✅ Save Address
saveAddress() {

  // Basic validation
  if (!this.address.name || !this.address.line1 || !this.address.phone) {
    alert('Please fill Name, Address Line 1, and Phone');
    return;
  }

  // ✅ Pin Code Validation
if (!this.allowedPins.includes(this.address.pin.toString())) {
  alert('Service is available only for selected Udupi & Manipal areas.');
  return;
}
    // Combine full address
    const fullAddress = `
${this.address.name}
${this.address.line1}, ${this.address.line2}, ${this.address.line3}
${this.address.taluq}, ${this.address.district}, ${this.address.state} - ${this.address.pin}
Phone: ${this.address.phone}
Email: ${this.address.email}
`;

    // Navigate to booking form
    this.router.navigate(['/booking-form'], {
  queryParams: {
    service: this.serviceType,
    complaint: this.complaint,
    address: fullAddress,
    name: this.address.name   // ✅ ADD THIS
  }
});
  }
}