import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  constructOutline,
  personOutline,
  shieldCheckmarkOutline,
  buildOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.page.html',
  styleUrls: ['./role-selection.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    RouterLink
  ]
})
export class RoleSelectionPage {
  constructor() {
    addIcons({
      constructOutline,
      personOutline,
      shieldCheckmarkOutline,
      buildOutline,
      chevronForwardOutline
    });
  }
}