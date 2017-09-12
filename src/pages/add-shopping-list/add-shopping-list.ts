import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase,  FirebaseListObservable} from 'angularfire2/database';

import { ShoppingItem } from '../../modals/shopping-item/shopping-item.interface';

@IonicPage()
@Component({
  selector: 'page-add-shopping-list',
  templateUrl: 'add-shopping-list.html',
})
export class AddShoppingListPage {

  shoppingItem = {} as ShoppingItem;
  shoppingItemRef$ : FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase
  ) {
    this.shoppingItemRef$ = db.list('shopping-list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingListPage');
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    console.log(shoppingItem);
    this.shoppingItemRef$.push({
      itemName : shoppingItem.itemName,
      itemNumber : Number(shoppingItem.itemNumber),
      completed: false
    })


    // reset our shoppingItem
    this.shoppingItem = {} as ShoppingItem;
    this.navCtrl.pop();
  }



}
