import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonButton
  
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.page.html',
  styleUrls: ['./role-selection.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    RouterLink
]
})
export class RoleSelectionPage {

}