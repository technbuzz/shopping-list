import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from "@angular/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core"
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PreferencesProvider } from '../providers/preferences/preferences';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAz2SpbaGMoQ6Lv-_T95pHgaHZKvNuZfC0",
      authDomain: "fir-crud-b89fa.firebaseapp.com",
      databaseURL: "https://fir-crud-b89fa.firebaseio.com",
      projectId: "fir-crud-b89fa",
      storageBucket: "fir-crud-b89fa.appspot.com",
      messagingSenderId: "778467373835"
    }),
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, 
        useFactory: (createTranslateLoader), 
        deps:[Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PreferencesProvider
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}
