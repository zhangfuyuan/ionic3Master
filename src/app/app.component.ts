import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, Response } from '@angular/http';

import { GlobalDataProvider } from '../providers/global-data/global-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'Tabs';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private http: Http, private global: GlobalDataProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.checkToken();
    });
  }

  checkToken() {
    this.http.post('/api/checkToken', {}).subscribe((response: Response) => {
      let res = response.json();

      if (res.status === 200) {
        this.global.username = res.content.nickname;
      } else {
        console.log(res.message);
        this.global.username = '';
      }
    });
  }
}
