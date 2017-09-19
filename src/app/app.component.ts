import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from "@ionic-native/native-storage";


import { TranslateService } from "@ngx-translate/core";


import { HomePage } from '../pages/home/home';
import { PreferencesProvider } from "../providers/preferences/preferences";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "ShoppingListPage";

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService,
    storage: NativeStorage,
    pService: PreferencesProvider
  ) {
    storage.getItem("list-app-tb").then(
      data => {
        console.log(data);
        translate.setDefaultLang(data.lang);
        pService.setLang(data.lang);
      },
      error => {
        translate.setDefaultLang("en");
        pService.setLang("en");
      }
    );

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

