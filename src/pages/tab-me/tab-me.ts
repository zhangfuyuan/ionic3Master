import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Response } from '@angular/http';

import { GlobalDataProvider } from '../../providers/global-data/global-data';

@IonicPage({
  name: 'Me',
  segment: 'me'
})
@Component({
  selector: 'page-tab-me',
  templateUrl: 'tab-me.html',
})
export class TabMePage {

  isNotLogin: boolean;
  nickname: string = '';
  loginName = '';
  loginPsw = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public app: App,
              private storage: Storage,
              private global: GlobalDataProvider,
              private http: Http,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    if(this.global.username === ''){
      this.isNotLogin = true;
    } else {
      this.isNotLogin = false;
      this.nickname = this.global.username;
    }

    this.storage.set('name', 'Max');
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
    });
  }

  startPage(page) {
    this.app.getRootNav().push(page, {
      aa: 666
    });
  }

  login(){
    this.http.post('/api/login', {
      username: this.loginName,
      password: this.loginPsw
    }).subscribe((response: Response) => {
      let res = response.json();

      if (res.status === 200) {
        this.nickname = res.content.nickname;
        this.isNotLogin = false;
      }

      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    });
  }

  logout() {
    this.http.get('/api/logout').subscribe((response: Response) => {
      let res = response.json();

      if (res.status === 200) {
        this.nickname = '';
        this.isNotLogin = true;
        this.global.username = '';
      }

      let toast = this.toastCtrl.create({
        message: res.message,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    });
  }

}
