import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from "@ionic-native/native-storage";
import { TranslateService } from "@ngx-translate/core";
import { Platform } from "ionic-angular";

@Injectable()
export class PreferencesProvider {

  defaultLang: string = 'en';
  currentLang: string = 'en';

  constructor(
    public http: Http, 
    public storage: NativeStorage,
    public translate: TranslateService,
    public platform: Platform
  ) {
    console.log('Hello PreferencesProvider Provider');
  }

  setLang(language:string): void{
    this.translate.use(language);
    this.translate.onLangChange.subscribe(resp => {
      if(resp.lang === 'ur'){
        this.platform.setDir('rtl', true);
        this.platform.setDir('ltr', false);
      } else if (resp.lang === 'en'){
        this.platform.setDir('rtl', false);
        this.platform.setDir('ltr', true);
      }

      this.storage.setItem('list-app-tb', { lang: resp.lang }).then(
        (resp) => console.log(resp)
      );
    })

  }






}
