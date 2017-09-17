import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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
    public platform: Platform
  ) {
    this.language = this.pService.currentLang;
  }

  changeLanguage(){
    this.translate.use(this.language).subscribe(resp => {
      console.log("From Lang translate", resp);
    })
    this.translate.onLangChange.subscribe(resp => {
      if(resp.lang === 'ur'){
        this.platform.setDir('rtl', true);
        this.platform.setDir('ltr', false);
      } else if (resp.lang === 'en'){
        this.platform.setDir('rtl', false);
        this.platform.setDir('ltr', true);

      }
    })
    this.pService.setLang(this.language);
    console.log(`The selected language is ${this.language}`)
  }

  ionViewDidLoad() {
  }

}
