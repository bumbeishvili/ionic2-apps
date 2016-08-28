import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import {ChecklistPage} from '../checklist/checklist';
import {Checklistmodel} from '../../providers/checklistmodel/checklistmodel';
import {DataService} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  checklists: Checklistmodel[] = [];


  constructor(public navCtrl: NavController, public dataService: DataService, public alertCtrl: AlertController) {

    this.dataService.getData().then(checklists => {

      let savedChecklists: any = false;
      if (typeof (checklists) != undefined) {
        savedChecklists = JSON.parse(checklists)
      }

      if (savedChecklists) {
        savedChecklists.forEach(savedChecklist=>{
          let loadChecklist = new Checklistmodel(savedChecklist.title,savedChecklist.items);

          this.checklists.push(loadChecklist);

          loadChecklist.checklist.subscribe(update => this.save());
          
        })
      }
    });


  }

  addChecklist(): void {
    let prompt = this.alertCtrl.create(
      {
        title: 'New Checklist',
        message: 'enter the name of new checklist below:',
        inputs: [{ name: 'name' }],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            handler: data => {
              let newChecklist = new Checklistmodel(data.name, []);
              this.checklists.push(newChecklist);

              newChecklist.checklist.subscribe(update => this.save());
              this.save();
            }
          }
        ]
      }

    );
    prompt.present();
  }

  renameChecklist(checklist): void {
    let prompt = this.alertCtrl.create({
      title: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let index = this.checklists.indexOf(checklist);
            if (index > -1) {
              this.checklists[index].setTitle(data.name);
              this.save();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  viewChecklist(checklist): void {
    this.navCtrl.push(ChecklistPage, {
      checklist: checklist
    })
  }

  removeChecklist(checklist): void {
    let index = this.checklists.indexOf(checklist);
    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
    }
  }

  save(): void {
    this.dataService.save(this.checklists);
  }
}
