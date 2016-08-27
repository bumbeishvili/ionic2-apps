import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the Checklistmodel provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Checklistmodel {
  checklist: any;
  checklistObserver: any;

  constructor(public title: string, public items: any[]) {
    this.items = items;
    this.checklist = Observable.create(observer=>{
      this.checklistObserver = observer;
    })
  }

  addItem(title): void {
    this.items.push({
      title: title,
      checked: false
    });

    this.checklistObserver.next(true);
    }


  removeItem(item): void {
    let index = this.items.indexOf(item);

    if (index > -1) this.items.splice(index, 1);
  }

  renameItem(item, title): void {
    let index = this.items.indexOf(item);
    if (index > -1) {
      this.items[index].title = title;
    }

    this.checklistObserver.next(true);

    this.checklistObserver.next(true);
  }

  setTitle(title):void{
    this.title = title;

    this.checklistObserver.next(true);
  }

  toggleItem (item) :void{
    item.checked = !item.checked;

    this.checklistObserver.next(true);
  }

}

