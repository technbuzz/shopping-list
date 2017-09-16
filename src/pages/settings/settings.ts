import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  language: string = 'en';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService
  ) {
  }

  changeLanguage(){
    this.translate.use(`${this.language}`)
    console.log(`The selected language is ${this.language}`)
  }

  ionViewDidLoad() {
  }

}
