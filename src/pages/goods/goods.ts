import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';

@IonicPage({
  name: 'Goods',
  segment: 'goods'
})
@Component({
  selector: 'page-goods',
  templateUrl: 'goods.html',
})
export class GoodsPage {

  obj_goodsListData =  [];
  currentPage = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsPage');

    this.http.post('/api/goodsData', {
      currentPage: ++this.currentPage
    }).subscribe((response: Response) => {
      let res = response.json();

      if (res.status === 200) {
        this.obj_goodsListData = res.content;
      } else {
        console.log(res.message);
      }
    });
  }


  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  goBack() {
    this.navCtrl.pop();
  }

  startPage() {
    this.navCtrl.push('Detail')
  }

  doInfinite(infiniteScroll) {
    this.http.post('/api/goodsData', {
      currentPage: ++this.currentPage
    }).subscribe((response: Response) => {
      let res = response.json();

      if (res.status === 200) {
        let datas = res.content;

        if (datas.length > 0) {
          this.obj_goodsListData = this.obj_goodsListData.concat(datas);
          console.log(this.obj_goodsListData)
        } else {
          console.log('数据已经榨干了！');
        }
        infiniteScroll.complete();
      } else {
        console.log(res.message);
      }
    });
  }

}
