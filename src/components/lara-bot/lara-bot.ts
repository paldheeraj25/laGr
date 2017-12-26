import { Component, Output, EventEmitter } from '@angular/core';
import { LaraBotProvider } from '../../providers/lara-bot/lara-bot';
import { Message, IMessage } from '../../interfaces/message.interface';

/**
 * Generated class for the LaraBotComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lara-bot',
  templateUrl: 'lara-bot.html'
})
export class LaraBotComponent {

  @Output() chatUpdate = new EventEmitter();
  @Output() userChatUpdate = new EventEmitter();

  text: string;
  public lara: string = '';
  public chat: Message[] = [];

  constructor(public laraService: LaraBotProvider) {
    this.text = 'Hello World';
  }

  createChat(chat: Message) {
    this.chat.push(chat);
  }

  laraChat() {
    this.userChatUpdate.emit(this.lara);
    this.laraService.converse(this.lara).then(res => {
      this.lara = '';
      this.chatUpdate.emit(res);
      //initialising chat 
      this.chat = [];

    });
  }

  deliver() {
    this.userChatUpdate.emit('deliver it');
    this.laraService.converse('deliver it').then(res => {
      this.lara = '';
      this.chatUpdate.emit(res);
      //initialising chat 
      this.chat = [];

    });
  }
}
