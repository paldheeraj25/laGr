import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroceryDataProvider } from '../../providers/grocery-data/grocery-data'
import { Message, IMessage } from '../../interfaces/message.interface';
import { Order, IOrder } from '../../interfaces/order.interface';
import { pull } from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public chat: Message[] = [new IMessage('lara', 'try somethings like "1 colgate family pack" or "5kg basmati rice"')];
  public groceryList: string[] = [];
  public orderGroceryList: Order;
  public groceryAddress: string;
  public isLaraTyping: boolean;

  constructor(public navCtrl: NavController, public groceryDataProvider: GroceryDataProvider) {

  }

  handleChatUpdate(chatObject: any) {
    var laraMessage;

    if (chatObject.action === 'input.defaultGroceryItem') {
      //check whether the intent is for grocery add in the list
      laraMessage = new IMessage('lara', '"' + chatObject.resolvedQuery + '" ' + chatObject.fulfillment.speech);
      this.groceryList.unshift(chatObject.resolvedQuery);

    } else if (chatObject.action === 'input.address') {
      //if the intent belong to delivery
      laraMessage = new IMessage('lara', chatObject.fulfillment.speech);
      if (!chatObject.actionIncomplete) {
        this.groceryAddress = chatObject.parameters.location;
        this.orderList();
      }

    } else {
      laraMessage = new IMessage('lara', chatObject.fulfillment.speech);
    }
    this.isLaraTyping = false;
    this.chat.push(laraMessage);
  }

  removeFromList(item) {
    this.groceryList = pull(this.groceryList, item);
  }

  handleUserChatUpdate(userChat) {
    this.chat = [];
    this.chat.push(new IMessage('user', userChat));
    this.isLaraTyping = true;
  }

  orderList() {
    this.orderGroceryList = new IOrder(this.groceryList, this.groceryAddress);
    this.groceryDataProvider.orderList(this.orderGroceryList).subscribe(res => {
      console.log(res);
    });
    //http call to save
    this.chat = [];
    this.groceryList = [];
  }
}
