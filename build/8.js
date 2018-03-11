webpackJsonp([8],{

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageModule", function() { return DetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DetailPageModule = (function () {
    function DetailPageModule() {
    }
    DetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__detail__["a" /* DetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__detail__["a" /* DetailPage */]),
            ],
        })
    ], DetailPageModule);
    return DetailPageModule;
}());

//# sourceMappingURL=detail.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DetailPage = (function () {
    function DetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.obj_cartCount = {
            count: "0"
        };
        //通过后台获取到的商品详细信息
        this.obj_goodsInfo = {
            goodsId: "200067",
            description: "若昕 韩版睡衣女冬法兰绒家居服加厚珊瑚绒女人卡通甜美睡衣秋冬套装 66651K 女 M",
            prise: "66",
            picture: [],
            src: "",
            isFork: false,
            colorGroup: [{ name: "红色", value: "red" }, { name: "蓝色", value: "blue" }],
            sizeGroup: [{ name: "s", value: "s" }, { name: "m", value: "m" }, { name: "l", value: "l" }]
        };
        // 用户选择信息，进行维护
        this.obj_goodsDetailInfo = {
            goodsId: this.obj_goodsInfo.goodsId,
            isFork: this.obj_goodsInfo.isFork,
            description: this.obj_goodsInfo.description,
            src: this.obj_goodsInfo.src,
            prise: this.obj_goodsInfo.prise,
            color: "",
            size: "",
            number: 1
        };
        // 数量加1
        this.jia1 = function () {
            this.obj_goodsDetailInfo.number++;
        };
        // 数量减1
        this.jian1 = function () {
            if (this.obj_goodsDetailInfo.number != 1) {
                this.obj_goodsDetailInfo.number--;
            }
        };
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-detail',template:/*ion-inline-start:"E:\web\hybridApp-workspace\master\src\pages\detail\detail.html"*/'\n\n<ion-content id="details" cache-view="false">\n  <ion-content >\n    <!-- 头部 -->\n    <header id="header">\n      <div class="header-left">\n        <div (click)="goBack();">\n          <span></span>\n        </div>\n      </div>\n      <div class="header-center">\n        <span>商品详情</span>\n      </div>\n      <div class="header-right">\n        <span></span>\n      </div>\n    </header>\n    <!-- 产品展示图 -->\n    <div id="view">\n      <div class="viewWarp">\n        <ul>\n          <li>\n            <img src="assets/imgs/details/detail01.jpg" alt="">\n          </li>\n        </ul>\n        <div class="viewText"><span>1</span>/6</div>\n      </div>\n    </div>\n    <!-- 产品选项 -->\n    <div id="des">\n      <div class="desText">若昕 韩版睡衣女冬法兰绒家居服加厚珊瑚绒女人卡通甜美睡衣秋冬套装 66651K 女 M  </div>\n      <div class="desNumber">¥115.00</div>\n    </div>\n    <div id="list">\n      <div class="yixuan">\n        <span>已选</span>\n        66651k女 m 1件\n      </div>\n      <div class="yanse clearBoth">\n        <span class="floatLeft">颜色</span>\n        <div class="floatLeft"  *ngFor="let item of obj_goodsInfo.colorGroup, let i = index" >\n          <input id="colorRadio{{i}}" type="radio" name="color" value="{{item.value}}"  ng-checked="$index==0?true:false" ng-init="$index==0?obj_goodsDetailInfo.color=item.value:\'\'" ng-model="obj_goodsDetailInfo.color">\n          <span ng-class="obj_goodsDetailInfo.color==item.value?\'listCurrent\':\'\'" class="listBox"><label for="colorRadio{{i}}">{{item.name}}</label></span>\n        </div>\n      </div>\n      <div class="chicun clearBoth">\n        <span class="floatLeft">尺寸</span>\n        <div class="floatLeft"  *ngFor="let item of obj_goodsInfo.sizeGroup, let i = index" >\n          <input id="sizeRadio{{$index}}" type="radio" name="size" value="{{item.value}}"  ng-checked="$index==0?true:false" ng-init="$index==0?obj_goodsDetailInfo.size=item.value:\'\'" ng-model="obj_goodsDetailInfo.size">\n          <span ng-class="obj_goodsDetailInfo.size==item.value?\'listCurrent\':\'\'" class="listBox"><label for="sizeRadio{{$index}}">{{item.name}}</label></span>\n        </div>\n      </div>\n      <div class="shuliang clearBoth">\n        <span class="floatLeft">数量</span>\n        <div class="floatLeft">\n          <span class="listLeft floatLeft" (click)="jian1();" >-</span>\n          <input class="floatLeft" type="text" readonly ng-model="obj_goodsDetailInfo.number">\n          <span class="listRight floatLeft" (click)="jia1();" >+</span>\n        </div>\n\n      </div>\n    </div>\n    <div id="otherInfo">\n      <div class="songzhi">\n        <span>送至</span>\n        <p>北京</p>\n      </div>\n      <div class="yunfei">\n        <span>运费</span>\n        <p>店铺单笔订单不满89元，货到付款运费10元，在线支付运费10元</p>\n      </div>\n      <div class="fuwu">\n        <span>服务</span>\n        <p>由澳贝琳官方旗舰店从广东广州市发货并提供售后服务</p>\n      </div>\n      <div class="tishi">\n        <span>提示</span>\n        <p>该商品支持七天无理由退货</p>\n      </div>\n    </div>\n  </ion-content>\n\n  <!-- 固定底边栏 -->\n  <div id="buy">\n    <div class="buyLeft">\n      <div class="guanzhu">\n        <span></span>\n        <strong>关注</strong>\n      </div>\n      <div class="gouwuche" ui-sref="cart">\n        <span></span>\n        <i id="badge" class="badge badge-assertive">{{obj_cartCount.count}}</i>\n        <strong>购物车</strong>\n      </div>\n    </div>\n    <div class="buyCenter" ng-click="func_addToCart()">加入购物车</div>\n    <div class="buyRight" ng-click="func_goHome()">立即购买</div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"E:\web\hybridApp-workspace\master\src\pages\detail\detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ })

});
//# sourceMappingURL=8.js.map