import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

public getWords():string[]{
  return this.words;
}

public words: string[] = ['word',
    'da',
    'ar',
    'ra',
    'me',
    'Tu',
    'Cemi',
    'viTa',
    'mas',
    'ver',
    'igi',
    'ara',
    'rad',
    'Sen',
    'misi',
    'viT',
    'aw',
    'magra',
    'raca',
    'nu',
    'kvla',
    'guli',
    'ese',
    'vin',
    'Seni',
    'uTxra',
    'maT',
    'gulsa',
    'var',
    'marT',
    'mis',
    'Cemgan',
    'mze',
    'kaci',
    'Tavi',
    'anu',
    'mefe',
    'rome',
    'mun',
    'miT',
    'Cemsa']

  constructor() {}

}

