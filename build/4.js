webpackJsonp([4],{

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabCartPageModule", function() { return TabCartPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tab_cart__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabCartPageModule = (function () {
    function TabCartPageModule() {
    }
    TabCartPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tab_cart__["a" /* TabCartPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tab_cart__["a" /* TabCartPage */]),
            ],
        })
    ], TabCartPageModule);
    return TabCartPageModule;
}());

//# sourceMappingURL=tab-cart.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabCartPage; });
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


var TabCartPage = (function () {
    function TabCartPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.shopcart = [{
                shops: {
                    shop_name: '小红书福利社',
                    isSelect: false,
                    id: '0',
                    shop_type: '自营',
                    allPrise: 4668,
                    products: [
                        {
                            name: '资生堂防晒霜 60ml',
                            price: 199,
                            num: 2
                        },
                        {
                            name: '兰蔻精华液 100ml',
                            price: 854,
                            num: 5
                        }
                    ]
                }
            }];
        this.alias = '';
        this.msgList = [];
    }
    TabCartPage.prototype.ionViewDidLoad = function () {
    };
    TabCartPage.prototype.AddRemoveRecipeToFavorite = function (item, index) {
        console.log(index);
    };
    /**
     * 商品添加
     */
    TabCartPage.prototype.addNum = function (index, item_index) {
        if (this.shopcart[index].shops.products[item_index].num == 0)
            return;
        ++this.shopcart[index].shops.products[item_index].num;
        this.numAllPrice();
    };
    /**
     * 商品减少
     */
    TabCartPage.prototype.reduceNum = function (index, item_index) {
        if (this.shopcart[index].shops.products[item_index].num == 0)
            return;
        --this.shopcart[index].shops.products[item_index].num;
        this.numAllPrice();
    };
    /**
     * 计算所有商品价格
     */
    TabCartPage.prototype.numAllPrice = function () {
        for (var i = 0; i < this.shopcart.length; i++) {
            var shops = this.shopcart[i].shops;
            var finalprise = 0;
            for (var j = 0; j < shops.products.length; j++) {
                finalprise += (shops.products[j].num * shops.products[j].price);
            }
            this.shopcart[i].shops.allPrise = finalprise;
        }
        console.log(this.shopcart[0].shops.allPrise);
    };
    TabCartPage.prototype.deleteProduct = function (index, item_index) {
        this.showConfirm(index, item_index);
    };
    /**
     * 弹出提示
     */
    TabCartPage.prototype.showConfirm = function (index, item_index) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: '温馨提示',
            message: '是否要删除该商品?',
            buttons: [
                {
                    text: '再看看',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '是的',
                    handler: function () {
                        _this.shopcart[index].shops.products.splice(item_index, 1);
                        _this.numAllPrice();
                    }
                }
            ]
        });
        confirm.present();
    };
    TabCartPage.prototype.initJPush = function () {
        var _this = this;
        //启动极光推送
        if (window.plugins && window.plugins.jPushPlugin) {
            window.plugins.jPushPlugin.init();
            document.addEventListener("jpush.receiveNotification", function () {
                _this.msgList.push({ content: window.plugins.jPushPlugin.receiveNotification.alert });
            }, false);
        }
    };
    TabCartPage.prototype.setAlias = function () {
        //设置Alias
        if (this.alias && this.alias.trim() != '') {
            window.plugins.jPushPlugin.setAlias(this.alias);
        }
        else
            alert('Alias不能为空');
    };
    TabCartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tab-cart',template:/*ion-inline-start:"E:\web\hybridApp-workspace\master\src\pages\tab-cart\tab-cart.html"*/'<ion-header no-border>\n  <ion-toolbar>\n    <ion-buttons start>\n      <span id="left_img"></span>\n    </ion-buttons>\n    <ion-title>购物车</ion-title>\n    <ion-buttons end>\n      <span id="right_img"></span>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content class="cart_content">\n  <!--购物车界面-->\n  <div *ngFor="let item of shopcart, let i = index" style="background-color: white">\n    <ion-item>\n      <ion-label>{{item.shops.shop_name}}</ion-label>\n      <ion-checkbox color="danger" checked={{item.shops.isSelect}}\n                    (ionChange)="AddRemoveRecipeToFavorite(item,i);"></ion-checkbox>\n    </ion-item>\n\n    <ion-row *ngFor="let products_item of item.shops.products, let products_index = index"\n             style="border-bottom: 0.55px solid gray">\n      <ion-col col-3 style="display:flex;align-items: center">\n        <img src="assets/imgs/nanz5.jpg" alt=""/>\n      </ion-col>\n      <ion-col col-9>\n        <h2>{{products_item.name}}</h2>\n        <p style="color: gray">双十一价格9.9包邮,近期期待</p>\n        <div>\n          <label>￥{{products_item.price}}</label>\n          <div style="display: inline-flex;margin-left: 20px">\n            <img src="assets/imgs/add.png" style="width: 15px;height: 15px" (click)="addNum(i,products_index);"/>\n            <label style="border: 1px solid gray;margin-left: 5px;margin-right: 5px">{{products_item.num}}</label>\n            <img src="assets/imgs/reduce.png" style="width: 15px;height: 15px" (click)="reduceNum(i,products_index);"/>\n            <img src="assets/imgs/delete.png" style="margin-left:20px;width: 15px;height: 15px"\n                 (click)="deleteProduct(i,products_index);"/>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n    <div style="display: flex; align-items:center;border-bottom: 0.55px solid gray">\n      <div style="float: right;margin: 10px">\n        <label style="margin-right: 10px"> 总价:￥{{item.shops.allPrise}}</label>\n      </div>\n\n    </div>\n  </div>\n  <button ion-button block (click)="initJPush()">启动推送</button>\n  <ion-item>\n    <ion-label floating>别名 Alias</ion-label>\n    <ion-input type="text" [(ngModel)]="alias"></ion-input>\n  </ion-item>\n  <button ion-button block (click)="setAlias()" [disabled]="alias == \'\'">设置别名</button>\n\n  <ion-list>\n    <ion-item text-wrap *ngFor="let msg of msgList">\n      <ion-avatar item-left>\n        <img src="assets/user.jpg">\n      </ion-avatar>\n      <h2>通知</h2>\n      <p>{{msg.content}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\web\hybridApp-workspace\master\src\pages\tab-cart\tab-cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], TabCartPage);
    return TabCartPage;
}());

//# sourceMappingURL=tab-cart.js.map

/***/ })

});
//# sourceMappingURL=4.js.map