import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ShoppingItem } from "../../modals/shopping-item/shopping-item.interface";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$;
  loading: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public asc: ActionSheetController
  ) {
    this.shoppingListRef$ = this.db.list('shopping-list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  addItem(){
    this.navCtrl.push('AddShoppingListPage')
  }
  selectShoppingItem(shoppingItem: ShoppingItem){
    let actionSheet = this.asc.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            
          }
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key)
          }
        },
        {
          text: shoppingItem.completed ? 'Pending' : 'Done',
          handler: () => {
            this.shoppingListRef$.update(shoppingItem.$key, 
              { completed: shoppingItem.completed = !shoppingItem.completed }
            )
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('User Selected the cancel option');
            
          }
        }
      ]

    })

    actionSheet.present();
  }

}
