import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import * as Swiper from 'swiper';

@IonicPage({
  name: 'Home',
  segment: 'home'
})
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {

  @ViewChild('lyScroll')
  lyScrollDiv: ElementRef;
  @ViewChild('headerSwiper')
  headerSwiper: ElementRef;
  @ViewChild('headBgColor')
  greetBgDiv: ElementRef;
  @ViewChild('btnBackTop')
  bBackTop: ElementRef;
  @ViewChild('timeBox')
  timeBox: ElementRef;
  @ViewChild('container')
  container: ElementRef;

  oSwiper1 = null;
  oSwiper2 = null;
  timer = null;
  lazyLoad1 = '';
  lazyLoad2 = '';
  lazyLoad3 = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, private http: Http) {
  }

  ionViewDidLoad() {
    this.getHeaderSliderData();
    this.headerChangeColor();
    this.backTop();
    this.countdown();
  }

  ionViewWillEnter() {
    this.initHeaderSlide();
    this.initToutiaoSlide();
  }

  ionViewDidEnter() {
    // this.http.get('http://jsonplaceholder.typicode.com/photos')
    setTimeout(()=>{
      this.lazyLoad1 = 'assets/imgs/home-theme-3.jpg';
      this.lazyLoad2 = 'assets/imgs/home-theme-1.jpg';
      this.lazyLoad3 = 'assets/imgs/home-theme-2.jpg';
    }, 2000)
  }

  // 获取广告轮播图资源
  getHeaderSliderData() {
    let imgList = this.headerSwiper.nativeElement.querySelectorAll('.swiper-img'),
      imgInfo = [];

    this.http.get('/api/swiperData').subscribe((response: Response) => {
      let res = response.json();

      if (res.status === 200) {
        imgInfo = res.content;

        for (let i=0; i<imgList.length; i++) {
          imgList[i].src = imgInfo[i].src;
          imgList[i].alt = imgInfo[i].alt;
        }
      } else {
        console.log(res.message);
      }
    });
  }

  // 初始化头部广告轮播
  initHeaderSlide() {
    this.oSwiper1 = new Swiper('.swiper1', {
      slidesPerView: 1,
      speed: 500,
      paginationClickable: true,
      centeredSlides: true,
      autoplay: 2500,
      autoplayDisableOnInteraction: false,
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      // 改变自动更新
      observer: true,
      observeParents: true
    });
  }

  // 初始化京东头条轮播
  initToutiaoSlide() {
    this.oSwiper2 = new Swiper('.swiper2', {
      direction:'vertical',
      autoplay: 2000,
      autoplayDisableOnInteraction: false,
      loop: true,
      // 改变自动更新
      observer: true,
      observeParents: true
    });
  }

  // 滚动时头部背景变化
  headerChangeColor() {
    let scrollDiv = this.lyScrollDiv.nativeElement;
    let greetDiv= this.greetBgDiv.nativeElement;
    let nowOpacity = 0;

    scrollDiv.onscroll = function (e) {

      if (this.scrollTop / 250 < .85) nowOpacity = this.scrollTop / 250;

      greetDiv.style.opacity = nowOpacity + '';
    }
  }

  // 返回顶部
  backTop() {
    let scrollDiv = this.lyScrollDiv.nativeElement;
    let bTopBtn = this.bBackTop.nativeElement;

    scrollDiv.addEventListener('scroll', function(e){
      let top = scrollDiv.scrollTop;

      bTopBtn.style.display = (top>500 ? 'block' : 'none');
    });

    bTopBtn.onclick = function(){
      scrollDiv.scrollTop = 0;
    }
  }

  // 倒计时
  countdown() {
    let timeDomList = this.timeBox.nativeElement.querySelectorAll('.time-text'),
      timeObj = {
        h: 0,
        m: 0,
        s: 0
      },
      timeStr = '';

    this.clearTimer();
    initData();
    this.timer = setInterval(()=>{
      timeObj.s--;
      if(timeObj.s==-1){
        timeObj.m--;
        timeObj.s=59;
      }
      if(timeObj.m==-1){
        timeObj.h--;
        timeObj.m=59;
      }
      if(timeObj.h==-1){
        timeObj.h=0;
        timeObj.m=0;
        timeObj.s=0;
        this.clearTimer();
      }
      timeStr = pad(timeObj.h) + pad(timeObj.m) + pad(timeObj.s);
      innerData(timeDomList, timeStr);
    }, 1000);

    function initData() {
      timeObj = {
        h: 1,
        m: 37,
        s: 13
      };
      timeStr = pad(timeObj.h) + pad(timeObj.m) + pad(timeObj.s);
      innerData(timeDomList, timeStr);
    }
    function pad(t) {
      return t<10 ? '0'+t : ''+t;
    }
    function innerData(dom, data) {
      for (let i=0; i<dom.length; i++) {
        dom[i].innerHTML = data[i];
      }
    }
  }

  // 跳转页面
  startPage(page) {
    console.log(page);
    // this.app.getRootNav().push('EntryPage', {
    //   aa: '66'
    // });
  }

  // 清除定时器
  clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  ionViewDidLeave() {
    this.oSwiper1.destroy();
    this.oSwiper2.destroy();
  }

}
