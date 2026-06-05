import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  
  // ✅ THIS IS THE FIX
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class ChatPage {

  messages = [
    { text: 'Hello 👋', sender: 'other' },
    { text: 'Hi!', sender: 'me' }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.messages.push({
      text: this.newMessage,
      sender: 'me'
    });

    this.newMessage = '';
  }

}