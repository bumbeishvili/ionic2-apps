import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';



@Component({
  templateUrl: 'build/pages/intro/intro.html',
})
export class IntroPage {
  slideOptions: any;
  constructor(public navCtrl: NavController) {
    this.slideOptions = {
      pager: true
    }
  }

  goToHome():void{
    this.navCtrl.setRoot(HomePage);
  }

}
