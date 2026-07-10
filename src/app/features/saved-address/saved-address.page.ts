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

  // ✅ NEW: all addresses for this customer (Home, Office, Other x N)
  savedAddresses: any[] = [];

  // ✅ NEW: which tab is active
  selectedType: 'Home' | 'Office' | 'Other' = 'Home';

  // ✅ NEW: when editing an existing "Other" address, holds its id
  editingId: number | null = null;

  address = {
    id: 0 as number | null,      // ✅ after
    addressType: 'Home',
    label: 'Home',        // shown/edited only for "Other"
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

    this.loadAllAddresses();
  }

  // ✅ Replaces loadSavedAddress() — now loads a LIST
  loadAllAddresses() {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) return;

    this.http.get<any[]>(`${this.apiBase}/addresses/${customerId}`)
      .subscribe({
        next: (list) => {
          this.savedAddresses = list || [];
          this.selectType('Home'); // default view
        },
        error: () => {}
      });
  }

 selectType(type: 'Home' | 'Office' | 'Other') {
    this.selectedType = type;
    this.editingId = null;
    this.locationCaptured = false;

    const existing = this.savedAddresses.find(a => a.addressType === type);
    if (existing) {
      this.loadIntoForm(existing);
    } else {
      this.resetForm(type);
    }
  }
  
  // ✅ NEW: user taps "+ Add New Other Address"
  addNewOther() {
    this.editingId = null;
    this.resetForm('Other');
    this.address.label = ''; // force them to name it
  }

  // ✅ NEW: user taps edit on an existing "Other" entry
  editOther(addr: any) {
    this.editingId = addr.id;
    this.loadIntoForm(addr);
  }

  // ✅ NEW: delete an "Other" address
  deleteOther(addr: any) {
    if (!confirm(`Delete "${addr.label}"?`)) return;

    const customerId = localStorage.getItem('customerId');
    if (!customerId) return;

    // ✅ CHANGED: DELETE now needs both customerId and addressId in the URL
    this.http.delete(`${this.apiBase}/address/${customerId}/${addr.id}`)
      .subscribe({
        next: () => {
          this.savedAddresses = this.savedAddresses.filter(a => a.id !== addr.id);
          this.resetForm('Other');
        },
        error: () => alert('Failed to delete address.')
      });
}

  private loadIntoForm(saved: any) {
    this.address = {
      id: saved.id,
      addressType: saved.addressType,
      label: saved.label || saved.addressType,
      name: saved.name || this.address.name,
      line1: saved.line1 || '',
      line2: saved.line2 || '',
      line3: saved.line3 || '',
      pin: saved.pin || '',
      phone: saved.phone || this.address.phone,
      email: saved.email || this.address.email,
      latitude: saved.latitude || null,
      longitude: saved.longitude || null
    };
    this.locationCaptured = !!(saved.latitude && saved.longitude);
    this.editingId = saved.id;
  }

  private resetForm(type: 'Home' | 'Office' | 'Other') {
    this.address = {
      id: 0,
      addressType: type,
      label: type === 'Other' ? '' : type,
      name: localStorage.getItem('customerName') || '',
      line1: '',
      line2: '',
      line3: '',
      pin: '',
      phone: localStorage.getItem('customerPhone') || '',
      email: localStorage.getItem('customerEmail') || '',
      latitude: null,
      longitude: null
    };
    this.locationCaptured = false;
  }

  // ✅ Only "Other" list entries that aren't currently being edited/blank
  get otherAddresses() {
    return this.savedAddresses.filter(a => a.addressType === 'Other');
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

    if (this.address.addressType === 'Other' && !this.address.label.trim()) {
      alert('Please give this address a name (e.g. "Gym", "Mom\'s House")');
      return;
    }

    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/customer-login']);
      return;
    }

    this.isSaving = true;

    const request$ = this.address.id
      ? this.http.put(`${this.apiBase}/address/${customerId}/${this.address.id}`, this.address)
      : this.http.post(`${this.apiBase}/address/${customerId}`, this.address);

    request$.subscribe({
      next: (saved: any) => {
        this.isSaving = false;

        const fullAddress = `
[${this.address.label}]
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
            phone: this.address.phone,
            email: this.address.email,
            lat: this.address.latitude,
            lng: this.address.longitude,
            customerId: customerId
          }
        });
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Save address error:', err);
        const serverMessage = err?.error?.message || err?.error?.Message;
        alert(serverMessage ? `Failed to save: ${serverMessage}` : 'Failed to save address. Please try again.');
      }
    });
  }
}