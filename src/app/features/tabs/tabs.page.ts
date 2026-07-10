import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logoWhatsapp } from 'ionicons/icons';

addIcons({ 'logo-whatsapp': logoWhatsapp });
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule   // ⭐⭐⭐ VERY IMPORTANT
  ]
})
export class TabsPage {
  openWhatsApp() {
  window.open('https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20need%20help%20with%20a%20service', '_blank');
}
}