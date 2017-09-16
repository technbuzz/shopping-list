import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListPage } from './shopping-list';
import { TranslateModule } from "@ngx-translate/core";



@NgModule({
  declarations: [
    ShoppingListPage,
  ],
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(ShoppingListPage),
  ],
})
export class ShoppingListPageModule {}
