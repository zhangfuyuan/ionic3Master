import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Entry',
  segment: 'entry/:aa'
})
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {
  title: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.get('aa');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }
  goToOption() {
    this.navCtrl.push('Tabs', {
      index: 2
    });
  }

}
