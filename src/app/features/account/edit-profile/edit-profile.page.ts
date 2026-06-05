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
IonLabel
} from '@ionic/angular/standalone';

import { ModalController } from '@ionic/angular';

@Component({
selector: 'app-edit-profile',
templateUrl: './edit-profile.page.html',
styleUrls: ['./edit-profile.page.scss'],
standalone: true,

imports:[
CommonModule,
FormsModule,
IonContent,
IonHeader,
IonToolbar,
IonTitle,
IonButton,
IonItem,
IonInput,
IonLabel
]
})
export class EditProfilePage {

@Input() name:string="";
@Input() phone:string="";
@Input() image:string="";

constructor(private modalCtrl:ModalController){}

close(){
this.modalCtrl.dismiss();
}

save(){

this.modalCtrl.dismiss({
name:this.name,
phone:this.phone,
image:this.image
});

}

}