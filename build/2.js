webpackJsonp([2],{

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabMePageModule", function() { return TabMePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tab_me__ = __webpack_require__(295);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabMePageModule = (function () {
    function TabMePageModule() {
    }
    TabMePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tab_me__["a" /* TabMePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tab_me__["a" /* TabMePage */]),
            ],
        })
    ], TabMePageModule);
    return TabMePageModule;
}());

//# sourceMappingURL=tab-me.module.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabMePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_data_global_data__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabMePage = (function () {
    function TabMePage(navCtrl, navParams, app, storage, global, http, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.storage = storage;
        this.global = global;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.nickname = '';
        this.loginName = '';
        this.loginPsw = '';
    }
    TabMePage.prototype.ionViewDidLoad = function () {
        if (this.global.username === '') {
            this.isNotLogin = true;
        }
        else {
            this.isNotLogin = false;
            this.nickname = this.global.username;
        }
        this.storage.set('name', 'Max');
        this.storage.get('name').then(function (val) {
            console.log('Your name is', val);
        });
    };
    TabMePage.prototype.startPage = function (page) {
        this.app.getRootNav().push(page, {
            aa: 666
        });
    };
    TabMePage.prototype.login = function () {
        var _this = this;
        this.http.post('/api/login', {
            username: this.loginName,
            password: this.loginPsw
        }).subscribe(function (response) {
            var res = response.json();
            if (res.status === 200) {
                _this.nickname = res.content.nickname;
                _this.isNotLogin = false;
            }
            var toast = _this.toastCtrl.create({
                message: res.message,
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        });
    };
    TabMePage.prototype.logout = function () {
        var _this = this;
        this.http.get('/api/logout').subscribe(function (response) {
            var res = response.json();
            if (res.status === 200) {
                _this.nickname = '';
                _this.isNotLogin = true;
                _this.global.username = '';
            }
            var toast = _this.toastCtrl.create({
                message: res.message,
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        });
    };
    TabMePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tab-me',template:/*ion-inline-start:"E:\web\hybridApp-workspace\master\src\pages\tab-me\tab-me.html"*/'<ion-header id="header">\n  <div class="header-left">\n    <img src="assets/imgs/common/back.png"/>\n  </div>\n  <div class="header-center">\n    <span>登录</span>\n  </div>\n  <div class="header-right">\n    <span></span>\n  </div>\n\n\n</ion-header>\n\n\n<ion-content class="content">\n\n  <div *ngIf="isNotLogin; else onLogin">\n    <ion-input id="user_name"\n               placeholder="用户名/邮箱/已验证手机"\n               style="padding-left: 15px"\n               [(ngModel)]="loginName"></ion-input>\n    <div class="div_password_conetnt">\n      <ion-input id="user_password"\n                 placeholder="请输入密码"\n                 clearInput\n                 type="password"\n                 style="padding-left: 15px"\n                 [(ngModel)]="loginPsw"></ion-input>\n      <ion-toggle [(ngModel)]="pepperoni" style="margin-top: 2px;margin-right: 5px"></ion-toggle>\n    </div>\n    <div class="div_password_conetnt">\n      <ion-input id="code_password" placeholder="请输入验证码" style="padding-left: 15px"></ion-input>\n      <p>|</p>\n      <img width="20%" height="43px" src="assets/imgs/common/verify_code.jpg">\n    </div>\n\n    <div id="btn_login" (click)="login()">\n      <div style="color:gray">登录</div>\n    </div>\n    <div id="onetep_btn_login">\n      <div style="color: red">注册</div>\n    </div>\n    <div class="div_login_check">\n      <ion-checkbox id="checkbox_login" [(ngModel)]="mushrooms" color="red"></ion-checkbox>\n      <div style=" margin-left:5px;color: black "> 一个月内免登陆</div>\n    </div>\n    <div class="div_bttom_function">\n      <div style="display: flex;align-items:center">\n        <img src="assets/imgs/common/return_password.png" width="24px" height="24px"/>\n        <p>找回密码</p>\n      </div>\n\n      <div style="display: flex; align-items:center">\n        <img src="assets/imgs/common/register.png" width="24px" height="24px"/>\n        <p>快速注册</p>\n      </div>\n    </div>\n    <div style="display: flex;align-items:center; margin-left: 5%;\n    margin-right: 5%; width: 90%" >\n      <p style="width:30%;height:1px;background-color: #5d5d5d;margin-right: 5% " ></p>\n      <p style="color: #5d5d5d " >其他登录方式</p>\n      <p style="width:30%;height:1px;background-color: #5d5d5d;margin-left: 5% " ></p>\n    </div>\n    <div style="display: flex;flex-direction: column;align-items: center">\n      <img src="assets/imgs/common/qq.png"  width="24px" height="24px"/>\n      <p>QQ</p>\n    </div>\n  </div>\n\n  <ng-template #onLogin>\n    <div flex="main:center">欢迎 {{ nickname }} 回来！</div>\n\n    <div flex="main:center"><button ion-button (click)="logout()">登出</button></div>\n  </ng-template>\n\n  <br>\n\n  <button ion-button (click)="startPage(\'Detail\')" full>商品详情页</button>\n\n  <button ion-button (click)="startPage(\'Entry\')" full>登入页面</button>\n\n  <button ion-button (click)="startPage(\'Goods\')" full>商品列表</button>\n\n  <button ion-button (click)="startPage(\'Pay\')" full>支付页面</button>\n\n</ion-content>\n'/*ion-inline-end:"E:\web\hybridApp-workspace\master\src\pages\tab-me\tab-me.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__providers_global_data_global_data__["a" /* GlobalDataProvider */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], TabMePage);
    return TabMePage;
}());

//# sourceMappingURL=tab-me.js.map

/***/ })

});
//# sourceMappingURL=2.js.map