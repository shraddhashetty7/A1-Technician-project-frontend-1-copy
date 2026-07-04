import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';

import { ModalController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { addIcons } from 'ionicons';
import {
  cameraOutline,
  imageOutline,
  closeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
    IonIcon
  ]
})
export class EditProfilePage {

  @Input() name: string = '';
  @Input() phone: string = '';
  @Input() image: string = '';

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {
    addIcons({
      cameraOutline,
      imageOutline,
      closeOutline
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    this.modalCtrl.dismiss({
      name: this.name,
      phone: this.phone,
      image: this.image
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Change Profile Photo',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera-outline',
          handler: () => this.takePicture(CameraSource.Camera)
        },
        {
          text: 'Choose from Gallery',
          icon: 'image-outline',
          handler: () => this.takePicture(CameraSource.Photos)
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  private async takePicture(source: CameraSource) {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source
      });

      this.image = photo.dataUrl ?? this.image;
    } catch (err) {
      console.log('Photo selection cancelled or failed', err);
    }
  }
}