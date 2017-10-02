import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from "ionic-angular";

import { ShoppingItem } from "../../modals/shopping-item/shopping-item.interface";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { TranslateService } from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: "page-shopping-list",
  templateUrl: "shopping-list.html",
  animations: [
    trigger('flip', [
      state('flipped', style({
        transform: 'rotate(180deg)',
        backgroundColor: '#f50e80'
      })),
      
      transition('* => flipped', animate('400ms ease'))
    ])
  ]
})
export class ShoppingListPage {
  buttonTexts: any;
  flipState: string = 'notFlipped';

  shoppingListRef$;
  loading: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public asc: ActionSheetController,
    public translate: TranslateService,
    public alterCtrl: AlertController
  ) {
    this.shoppingListRef$ = this.db.list("shopping-list");
  }

  ionViewDidLoad() {
  }

  toggleFlip(){
    this.flipState = this.flipState === 'notFlipped' ? 'Flipped' : 'notFlipped';
  }

  viewSettings() {
    this.navCtrl.push("SettingsPage");
  }

  addItem() {
    this.navCtrl.push("AddShoppingListPage");
  }
  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.translate
      .get(["EDIT", "DONE", "PENDING", "REMOVE", "CANCEL"])
      .subscribe(resp => {
        this.buttonTexts = resp;
      });

    var buttonsAS = [
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

    if(shoppingItem.completed){
      buttonsAS.splice(0,1);
    }

    let actionSheet = this.asc.create({
      title: `${shoppingItem.itemName}`,
      buttons: buttonsAS
    });

    actionSheet.present();
  }

  clearItems(){
    let confirmAlert = this.alterCtrl.create({
      title: 'Clear All',
      message: 'Do you want to remove all the items',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler : () => {
            this.shoppingListRef$.remove();
          }
        }
      ]
    });// alertCtrl

    confirmAlert.present();
  }
}
