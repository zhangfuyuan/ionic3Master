webpackJsonp([6],{

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoodsPageModule", function() { return GoodsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goods__ = __webpack_require__(294);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GoodsPageModule = (function () {
    function GoodsPageModule() {
    }
    GoodsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__goods__["a" /* GoodsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__goods__["a" /* GoodsPage */]),
            ],
        })
    ], GoodsPageModule);
    return GoodsPageModule;
}());

//# sourceMappingURL=goods.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoodsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoodsPage = (function () {
    function GoodsPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.obj_goodsListData = [];
        this.currentPage = 0;
    }
    GoodsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad GoodsPage');
        this.http.post('/api/goodsData', {
            currentPage: ++this.currentPage
        }).subscribe(function (response) {
            var res = response.json();
            if (res.status === 200) {
                _this.obj_goodsListData = res.content;
            }
            else {
                console.log(res.message);
            }
        });
    };
    GoodsPage.prototype.doRefresh = function (refresher) {
        setTimeout(function () {
            refresher.complete();
        }, 500);
    };
    GoodsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    GoodsPage.prototype.startPage = function () {
        this.navCtrl.push('Detail');
    };
    GoodsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.http.post('/api/goodsData', {
            currentPage: ++this.currentPage
        }).subscribe(function (response) {
            var res = response.json();
            if (res.status === 200) {
                var datas = res.content;
                if (datas.length > 0) {
                    _this.obj_goodsListData = _this.obj_goodsListData.concat(datas);
                    console.log(_this.obj_goodsListData);
                }
                else {
                    console.log('数据已经榨干了！');
                }
                infiniteScroll.complete();
            }
            else {
                console.log(res.message);
            }
        });
    };
    GoodsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-goods',template:/*ion-inline-start:"E:\web\hybridApp-workspace\master\src\pages\goods\goods.html"*/'<ion-content id="goodsList" cache-view="false">\n  <header id="header">\n    <div class="header-left" (click)="goBack()">\n      <span></span>\n    </div>\n    <div class="header-center">\n      <span></span>\n    </div>\n    <div class="header-right">\n      <span></span>\n    </div>\n  </header>\n  <!-- 筛选导航部分 -->\n  <nav id="nav">\n    <div class="nav-all">综合</div>\n    <div class="nav-warp">\n      <ul>\n        <li>11.11</li>\n        <li>销量</li>\n        <li>价格</li>\n        <li>品牌</li>\n        <li>新品</li>\n        <li>服务</li>\n      </ul>\n    </div>\n  </nav>\n  <ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content\n        pullingIcon="arrow-dropdown"\n        pullingText="获取最新数据..."\n        refreshingSpinner="circles"\n        refreshingText="刷新完毕">\n\n\n      </ion-refresher-content>\n    </ion-refresher>\n    <div class="pro" *ngFor="let item of obj_goodsListData, let i = index" (click)="startPage()">\n      <div class="pro-warp">\n        <div class="pro-body">\n          <div class="pro-body-des">\n            <!--<a ng-href="#/details/{{item.productId}}">-->\n            <a>\n              <img src="{{item.img}}" alt="">\n            </a>\n            <div class="pro-body-des-text">\n              <span>{{item.name}}</span>\n              <b>￥{{item.price}}</b>\n              <div class="pro-body-des-con">\n                <span>{{item.haoping}}%好评</span>\n                <span>{{item.buy}}人</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content\n        loadingSpinner="bubbles"\n        loadingText="Loading more data...">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ion-content>\n</ion-content>\n'/*ion-inline-end:"E:\web\hybridApp-workspace\master\src\pages\goods\goods.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], GoodsPage);
    return GoodsPage;
}());

//# sourceMappingURL=goods.js.map

/***/ })

});
//# sourceMappingURL=6.js.map