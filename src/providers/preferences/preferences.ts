import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PreferencesProvider {

  defaultLang: string = 'en';
  currentLang: string = 'en';

  constructor(public http: Http) {
    console.log('Hello PreferencesProvider Provider');
  }

  setLang(language:string): void{
    this.currentLang = language;
  }





}
