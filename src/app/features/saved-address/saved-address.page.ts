import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  isSaving: boolean = false;
  locationCaptured: boolean = false;

  private apiBase = 'https://localhost:7122/api/customer';

  address = {
    addressType: 'Home',
    name: '',
    line1: '',
    line2: '',
    line3: '',
    pin: '',
    phone: '',
    email: '',
    latitude: null as number | null,
    longitude: null as number | null
  };

  allowedPins: string[] = [
    '576104', '576101', '576102',
    '576103', '576105', '576108', '576213'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.serviceType = params['service'];
      this.complaint = params['complaint'];
    });

    this.address.name = localStorage.getItem('customerName') || '';
    this.address.phone = localStorage.getItem('customerPhone') || '';
    this.address.email = localStorage.getItem('customerEmail') || '';

    this.loadSavedAddress();
  }

  loadSavedAddress() {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) return;

    this.http.get<any>(`${this.apiBase}/address/${customerId}`)
      .subscribe({
        next: (savedAddress) => {
          if (savedAddress) {
            this.address = {
              addressType: savedAddress.addressType || 'Home',
              name: savedAddress.name || this.address.name,
              line1: savedAddress.line1 || '',
              line2: savedAddress.line2 || '',
              line3: savedAddress.line3 || '',
              pin: savedAddress.pin || '',
              phone: savedAddress.phone || this.address.phone,
              email: savedAddress.email || this.address.email,
              latitude: savedAddress.latitude || null,
              longitude: savedAddress.longitude || null
            };

            if (savedAddress.latitude && savedAddress.longitude) {
              this.locationCaptured = true;
            }
          }
        },
        error: () => {}
      });
  }

  shareLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.address.latitude = position.coords.latitude;
        this.address.longitude = position.coords.longitude;
        this.locationCaptured = true;
        alert('✅ Location captured successfully!');
      },
      (error) => {
        alert('Unable to get location. Please allow location access.');
      }
    );
  }

  getMapUrl(): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${this.address.latitude},${this.address.longitude}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack() {
    this.router.navigate(['/tabs/home']);
  }

  saveAddress() {
  this.address.pin = this.address.pin.toString();

  if (!this.address.line1) {
    alert('Please fill Address Line 1');
    return;
  }

  if (!this.allowedPins.includes(this.address.pin)) {
    alert('Service is available only for selected Udupi & Manipal areas.');
    return;
  }

  const customerId = localStorage.getItem('customerId');
  if (!customerId) {
    alert('Session expired. Please login again.');
    this.router.navigate(['/customer-login']);
    return;
  }

  this.isSaving = true;

  this.http.post(`${this.apiBase}/address/${customerId}`, this.address)
    .subscribe({
      next: () => {
        this.isSaving = false;

        const fullAddress = `
[${this.address.addressType}]
${this.address.name}
${this.address.line1}, ${this.address.line2}, ${this.address.line3}
Pin: ${this.address.pin}
Phone: ${this.address.phone}
Email: ${this.address.email}
${this.address.latitude ? `Location: ${this.address.latitude}, ${this.address.longitude}` : ''}`;

        this.router.navigate(['/booking-form'], {
          queryParams: {
            service: this.serviceType,
            complaint: this.complaint,
            address: fullAddress,
            name: this.address.name,
            phone: this.address.phone,      // ✅ new
            email: this.address.email,      // ✅ new
            lat: this.address.latitude,
            lng: this.address.longitude,
            customerId: customerId          // ✅ new
          }
        });
      },
      error: () => {
        this.isSaving = false;
        alert('Failed to save address. Please try again.');
      }
    });
}
}
