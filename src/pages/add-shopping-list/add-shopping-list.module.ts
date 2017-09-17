import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShoppingListPage } from './add-shopping-list';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AddShoppingListPage,
  ],
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(AddShoppingListPage),
  ],
})
export class AddShoppingListPageModule {}
