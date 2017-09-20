import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { ShoppingItem } from "../../modals/shopping-item/shopping-item.interface";

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase) {
      const id = navParams.get('id');
      console.log(id);
      this.shoppingItemRef$ = db.object(`shopping-list/${id}`);

  }

  ionViewDidLoad() {
    this.shoppingItemRef$.subscribe(res=>{
      this.shoppingItem = res;
    })
  }

  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.update(shoppingItem);
    this.navCtrl.pop();
  }

}
