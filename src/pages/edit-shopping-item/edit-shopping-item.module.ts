import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditShoppingItemPage } from './edit-shopping-item';
import { TranslateModule } from "@ngx-translate/core";



@NgModule({
  declarations: [
    EditShoppingItemPage,
  ],
  imports: [
    TranslateModule,
    IonicPageModule.forChild(EditShoppingItemPage),
  ],
})
export class EditShoppingItemPageModule {}
