import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { ShoppingItem } from "../../modals/shopping-item/shopping-item.interface";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { TranslateService } from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: "page-shopping-list",
  templateUrl: "shopping-list.html"
})
export class ShoppingListPage {
  buttonTexts: any;

  shoppingListRef$;
  loading: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public asc: ActionSheetController,
    public translate: TranslateService
  ) {
    this.shoppingListRef$ = this.db.list("shopping-list");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShoppingListPage");
    this.translate
      .get(["EDIT", "DONE", "PENDING", "REMOVE", "CANCEL"])
      .subscribe(resp => {
        this.buttonTexts = resp;
      });
  }

  viewSettings() {
    this.navCtrl.push("SettingsPage");
  }

  addItem() {
    this.navCtrl.push("AddShoppingListPage");
  }
  selectShoppingItem(shoppingItem: ShoppingItem) {
    let actionSheet = this.asc.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: `${this.buttonTexts.EDIT}`,
          handler: () => {
            this.navCtrl.push("EditShoppingItemPage", {
              id: shoppingItem.$key
            });
          }
        },
        {
          text: `${this.buttonTexts.REMOVE}`,
          role: "destructive",
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: shoppingItem.completed ? `${this.buttonTexts.PENDING}` : `${this.buttonTexts.DONE}`,
          handler: () => {
            this.shoppingListRef$.update(shoppingItem.$key, {
              completed: (shoppingItem.completed = !shoppingItem.completed)
            });
          }
        },
        {
          text: `${this.buttonTexts.CANCEL}`,
          role: "cancel",
          handler: () => {
            console.log("User Selected the cancel option");
          }
        }
      ]
    });

    actionSheet.present();
  }
}
