import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  }

  addItem(title): void {
    this.items.push({
      title: title,
      checked: false
    });
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
  }

  setTitle(title):void{
    this.title = title;
  }

  toggleItem (item) :void{
    item.checked = !item.checked;
  }

}

