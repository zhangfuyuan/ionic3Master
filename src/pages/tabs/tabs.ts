import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, App } from 'ionic-angular';

@IonicPage({
  name: 'Tabs',
  segment: 'tabs/:index'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root = 'Home';
  tab2Root = 'List';
  tab3Root = 'Cart';
  tab4Root = 'Me';
  tabIndex : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.tabIndex = this.navParams.get('index') || 0;
  }

  ionViewDidLoad() {
    if (this.tabIndex !== 0) this.tabRef.select(this.tabIndex);
    if(this.app.getActiveNavs().length>1) this.navCtrl.remove(0, this.app.getActiveNavs().length);
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
  }

  switchTabs(index: number) {

  }


}
