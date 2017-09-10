import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShoppingListPage } from './add-shopping-list';

@NgModule({
  declarations: [
    AddShoppingListPage,
  ],
  imports: [
    IonicPageModule.forChild(AddShoppingListPage),
  ],
})
export class AddShoppingListPageModule {}
