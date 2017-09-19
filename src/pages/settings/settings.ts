import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";

import { TranslateService } from "@ngx-translate/core";

import { PreferencesProvider } from "../../providers/preferences/preferences";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  language: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public pService: PreferencesProvider,
  ) {
    this.language = this.pService.currentLang;
  }

  changeLanguage(){
    this.pService.setLang(this.language);
  }
}
