# ionic3Master

  基于 Ionic + Angular + Cordova 的商城 HybridApp
  
  参考文档：
  
  [官网文档](https://ionicframework.com/docs/)
  
  [angular2文档](http://learnangular2.com/templates/)
  
  [github源代码](https://github.com/ionic-team/ionic-preview-app/tree/master/src/pages)
  
  [《ionic3/ag4编写模仿京东商城的demo》](http://blog.csdn.net/jack_king007/article/details/72235920)
  
  [《来扯点ionic》](https://www.jianshu.com/nb/15100146)
  
  [《Ionic 3 and Angular 4 Mobile App Example》：优化启动项目](https://www.djamware.com/post/58e657b680aca764ec903c2d/ionic-3-and-angular-4-mobile-app-example)
  
## 开发流程

### （一）利用 ionic-cli 创建一个 tabs 项目

```
  ionic start master tabs
  cd master
  ionic serve #在浏览器运行
  ionic build #在移动端浏览器运行
  ionic cordova platform add android #结合上一步打包android文件
  ionic cordova run android #在AVD/插USB真机上测试
  
  ionic cordova run android --livereload -c -s #记得插拔USB插头
  ionic cordova run android --prod #静态编译+代码压缩，启动更快

  ionic cordova platform rm android #删除默认生成的平台
```

### （二）目录结构说明

```
  |- hooks：编译cordova时自定义的脚本命令，方便整合到我们的编译系统和版本控制系统中
  |- node_modules ：node各类依赖包
  |- resources ：android/ios 资源（更换图标和启动动画）
  |- src：开发工作目录，页面、样式、脚本和图片都放在这个目录下
    |- app：应用根目录
      |- app.component.ts：根组件 -> 根组件主要定义了app整体的视觉表现，比如根页面、状态栏、启动界面等等
      |- app.html：根组件的模板
      |- app.module.ts：根模块文件 -> 将所需的模块、组件、服务、管道、指令等模块化引入
      |- app.scss：全局样式文件 -> 写全局css的地方
      |- main.ts：入口文件 -> 只调用一个入口文件，让入口文件帮我们去引入其它依赖的文件
    |- assets：资源目录（静态文件（图片，js框架。。。）各种需要放置在此文件夹内，不然会出错
    |- pages：页面文件，放置编写的页面文件，包括：html，scss，ts
      |- 存放APP的所有页面，每个文件夹就是一个页面，里面定义了页面的业务逻辑、模板和样式
    |- theme：主题文件，里面有一个scss文件，设置主题信息
  |- www：静态文件
  |- platforms：生成android或者ios安装包路径（ platforms\android\build\outputs\apk：apk所在位置）
  |- plugins：插件文件夹，里面放置各种cordova安装的插件
  |- config.xml: 配置文件
  |- package.json: node安装模块时的依据
  |- tsconfig.json: TypeScript项目的根目录，指定用来编译这个项目的根文件和编译选项
  |- tslint.json：格式化和校验typescript
```

### （三）开发细节概述

1. 图片资源放在 `/src/assets/imgs`

2. 全局设置滚动条隐藏：

  ```
   // 在 app.scss 中引入
    ::-webkit-scrollbar {
      display: none !important;
    }
  ```

3. css引入图片资源路径：
  
  ```
    background: url(../assets/imgs/sprites.png) no-repeat;
  ```

4. 精灵图三要点：
  
  ```
   // 第一：变成受宽高设置影响的块类模型
    display: block;
   // 第二：设置宽高
    height:21px;
    width: 56px;
   // 第三：引入图片、设置图片定位等图片属性
    background: url(../assets/imgs/sprites.png) 0 0 no-repeat;
    background-position: 0 -109px;
    background-size: 200px 200px;
  ```

5. 在angular中，*ngFor 和 *ngIf 不能放置在同一个标签上(Vue之类的框架则可以)，因此在 ion-item 外加上一个“虚拟”的标签 ng-container, 它自身不会被渲染到DOM中，只会渲染它包裹的内容（类似Vue中的 template 标签）。

6. 强烈不建议使用 `document` 获取DOM元素，应为页面栈会一直缓存页面，在回收机制响应前，重复的页面会导致DOM元素重复存在着，建议使用 `ViewChild + ElementRef` 单视图对单数据模型

7. 通过 `ViewChild + ElementRef` 获取DOM元素后，原生设置元素特性 `setAttribute()`，元素样式属性 `style.setProperty()`

## 开发问题

### （一）扩增 tabs 数

1. 新建页面目录以及对应的 html 、scss、ts 文件，快捷指令 `ionic g page **Page`
  
  >（1） `tab-home.html` 文件：
  
  ```
    <ion-header>
      <ion-navbar>
        <ion-title>首页</ion-title>
      </ion-navbar>
    </ion-header>
    
    <ion-content padding>
    
    </ion-content>

  ```
  
  >（2）`tab-home.scss` 文件：
  
  ```
    page-tab-home {
    
    }
  ```
  
  >（3）`tab-home.ts` 文件：
  
  ```
    import { Component } from '@angular/core';
    import { NavController } from 'ionic-angular';
    
    @Component({
      selector: 'page-tab-home',
      templateUrl: 'tab-home.html'
    })
    export class TabHomePage {
    
      constructor(public navCtrl: NavController) {
    
      }
    
    }
  ```
  
2. 修改 `tabs` 目录全部文件内容
  
  >（1）修改 `tabs.html` 文件内容：
  
  ```
    <ion-tabs>
      <ion-tab [root]="tab1Root" tabTitle="首页" tabIcon="home"></ion-tab>
      <ion-tab [root]="tab2Root" tabTitle="分类" tabIcon="list"></ion-tab>
      <ion-tab [root]="tab3Root" tabTitle="购物车" tabIcon="cart"></ion-tab>
      <ion-tab [root]="tab4Root" tabTitle="我的" tabIcon="person"></ion-tab>
    </ion-tabs>
  ```

  >（2）修改 `tabs.ts` 文件内容：
  
  ```
    import { Component } from '@angular/core';
    
    import { TabHomePage } from '../tab-home/tab-home'; //改这！
    import { TabListPage } from '../tab-list/tab-list'; //改这！
    import { TabcCartPage } from '../tab-cart/tab-cart'; //改这！
    import { TabMePage } from '../tab-me/tab-me'; //改这！
    
    @Component({
      templateUrl: 'tabs.html'
    })
    export class TabsPage {
    
      tab1Root = TabHomePage; //改这！
      tab2Root = TabListPage; //改这！
      tab3Root = TabcCartPage; //改这！
      tab4Root = TabMePage; //改这！
    
      constructor() {
    
      }
    }
  ```
  
3. 修改 `app.modules.ts` 文件内容：

```
  ...
  
  import { TabHomePage } from '../pages/tab-home/tab-home'; //改这！
  import { TabListPage } from '../pages/tab-list/tab-list'; //改这！
  import { TabcCartPage } from '../pages/tab-cart/tab-cart'; //改这！
  import { TabMePage } from '../pages/tab-me/tab-me'; //改这！
  import { TabsPage } from '../pages/tabs/tabs';
  
  ...
  
  @NgModule({
    declarations: [
      MyApp,
      TabHomePage, //改这！
      TabListPage, //改这！
      TabcCartPage, //改这！
      TabMePage, //改这！
      TabsPage
    ],
    imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      MyApp,
      TabHomePage, //改这！
      TabListPage, //改这！
      TabcCartPage, //改这！
      TabMePage, //改这！
      TabsPage
    ],
    providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
  })
  export class AppModule {}
```

4. 若已开启服务则需要重启应用：`ionic serve`

### （二）ion-* 组件选择

1. `ActionSheetController` —— [有一组选择的底部弹框](https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/)

  >（1）用于三点更多图标的触摸交互

2. `AlertController` —— [可确定、取消、提交的弹框](https://ionicframework.com/docs/api/components/alert/AlertController/)

  >（1）用于谨慎操作的用户提醒

3. `Avatar` —— [头像](https://ionicframework.com/docs/components/#multiline-list)

4. `Badge` —— [显示信息状态的徽章](https://ionicframework.com/docs/components/#badges)

5. `Button` —— [各种触摸交互](https://ionicframework.com/docs/api/components/button/Button/)

6. `Checkbox` —— [复选框](https://ionicframework.com/docs/api/components/checkbox/Checkbox/)

7. `Chip` —— [标签类含背景文本](https://ionicframework.com/docs/api/components/chip/Chip/)

8. `Col` —— [网格系统布局的列](https://ionicframework.com/docs/api/components/grid/Col/)

9. `Content` —— [可实现刷新、滚动的唯一内容区域](https://ionicframework.com/docs/api/components/content/Content/)

10. `DateTime` —— [时间选择控件](https://ionicframework.com/docs/api/components/datetime/DateTime/)

11. `FabButton` —— [扩展图标的浮动按钮](https://ionicframework.com/docs/api/components/fab/FabButton/)

12. `Footer` —— [页脚](https://ionicframework.com/docs/api/components/toolbar/Footer/)

13. `Grid` —— [网格系统布局](https://ionicframework.com/docs/api/components/grid/Grid/)

14. `Header` —— [页头](https://ionicframework.com/docs/api/components/toolbar/Header/)

15. `Slides` —— [广告类轮播图](https://ionicframework.com/docs/api/components/slides/Slides/)

16. `Spinner` —— [等待动画](https://ionicframework.com/docs/api/components/spinner/Spinner/)

17. `Tabs` —— [分栏](https://ionicframework.com/docs/api/components/tabs/Tabs/)

18. `Thumbnail` —— [行内图 ul li img](https://ionicframework.com/docs/components/#thumbnail-list)

19. `ToastController` —— [消息提示](https://ionicframework.com/docs/api/components/toast/ToastController/)

20. `Toggle` —— [开关](https://ionicframework.com/docs/api/components/toggle/Toggle/)

21. `Toolbar` —— [头部或导航左中右布局](https://ionicframework.com/docs/api/components/toolbar/Toolbar/)

22. `Icon`  —— [官方提供的图标](https://ionicframework.com/docs/api/components/icon/Icon/)

23. `Img` —— [优化填充图片](https://ionicframework.com/docs/api/components/img/Img/)

24. `InfiniteScroll` —— [无限滚动](https://ionicframework.com/docs/api/components/infinite-scroll/InfiniteScroll/)

25. `Input` —— [优化文本输入框](https://ionicframework.com/docs/api/components/input/Input/)

26. `Item` —— [子列表 li](https://ionicframework.com/docs/api/components/item/Item/)

27. `ItemReorder` —— [拖拽列表](https://ionicframework.com/docs/api/components/item/ItemReorder/)

28. `ItemSliding` —— [横滑列表](https://ionicframework.com/docs/api/components/item/ItemSliding/)

29. `List` —— [列表 ul](https://ionicframework.com/docs/api/components/list/List/)

30. `LoadingController` —— [等待覆盖层](https://ionicframework.com/docs/api/components/loading/LoadingController/)

31. `Menu` —— [侧菜单栏](https://ionicframework.com/docs/api/components/menu/Menu/)

32. `ModalController` —— [子预览层](https://ionicframework.com/docs/api/components/modal/ModalController/)

33. `Nav` —— [导航层](https://ionicframework.com/docs/api/components/nav/Nav/)

34. `Note` —— [列表详情 ul li span](https://ionicframework.com/docs/api/components/note/Note/)

35. `Option` + `Select` —— [多选项](https://ionicframework.com/docs/api/components/select/Select/)

36. `PopoverController` —— [侧选择覆盖层](https://ionicframework.com/docs/api/components/popover/PopoverController/)

37. `RadioButton` —— [单选开关](https://ionicframework.com/docs/api/components/radio/RadioButton/)

38. `Range` —— [范围滑条](https://ionicframework.com/docs/api/components/range/Range/)

39. `Refresher` —— [顶部下拉/底部上拉刷新](https://ionicframework.com/docs/api/components/refresher/Refresher/)

40. `Scroll` —— [自定义滚动条](https://ionicframework.com/docs/api/components/scroll/Scroll/)

41. `Searchbar` —— [搜索框](https://ionicframework.com/docs/api/components/searchbar/Searchbar/)

42. `Segment` —— [分割组件](https://ionicframework.com/docs/api/components/segment/Segment/)

### （三）引入第三方插件 

1. `swiper` 插件

  >（1）用 `typings` 安装 `swiper`、`jquery` 依赖包：
  
  ```
    npm i swiper@3.4.2 --save
    npm i jquery@3.2.1 --save
    
    typings search swiper
    typings install dt~swiper --global
    
    typings search jquery
    typings install dt~jquery --global
  ```

  >（2）引入 `swiper` 模块：
  
  ```
    import * as Swiper from 'swiper';
  ```
  
  >（3）实例化 `Swiper` 对象：
  
  ```
    this.oSwiper1 = new Swiper('.swiper1', {
      slidesPerView: 1,
      paginationClickable: true,
      centeredSlides: true,
      autoplay: 2000,
      // false -> 用户操作后继续自动播放
      autoplayDisableOnInteraction: false,
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      // 改变自动更新
      observer: true,
      observeParents: true
    });
  ```
  
  >（4）修复BUG：
  >
  >> * 无法通过 id 绑定元素 -> 是本人让 TabPage 发生两次加载同一页面的问题
  >>
  >> * 轮播完第一轮后，第一张图显示时间出错 + 轮播到最后一张图时，无法控制轮播方向 -> 由于是观察者更新数据，swiper无法在最后加入第一张图，导致首尾无法连贯，建议给定img元素后插值
  
  ```
   // 给定5个slide swiper为了连贯会生成6个slide
    <div #headerSwiper class="swiper-container swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img  class="swiper-img" alt="" src="" />
        </div>
        <div class="swiper-slide">
          <img  class="swiper-img" alt="" src="" />
        </div>
        <div class="swiper-slide">
          <img  class="swiper-img" alt="" src="" />
        </div>
        <div class="swiper-slide">
          <img  class="swiper-img" alt="" src="" />
        </div>
        <div class="swiper-slide">
          <img  class="swiper-img" alt="" src="" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
   
   // JS赋值img资源
    for (let i=0; i<imgList.length; i++) {
      imgList[i].src = imgInfo[i].src;
      imgList[i].alt = imgInfo[i].alt;
    }
  ```
  
  >> * 当从子页面返回到含轮播图页面时，新页面的轮播图不响应 -> 由于ionic页面栈回收缓慢，导致有一段时间先后相同页面元素重复出现，建议用类名绑定元素
  >>
  >> * 含轮播图页面加载后，从非活跃页面返回，轮播不再自动播放 -> ionic 的机制影响，建议用生命钩子调用swiper的实例、销毁方法
  
  ```
   // 预加载钩子：先获取img资源
    ionViewDidLoad() {
        this.getHeaderSliderData();
      }
     
   // 将显钩子：（再次）初始化swiper
    ionViewWillEnter() {
      this.initHeaderSlide();
      this.initToutiaoSlide();
    }
       
   // 已离钩子：销毁swiper
    ionViewDidLeave() {
      this.oSwiper1.destroy();
      this.oSwiper2.destroy();
    }
  ```
  
  >> * 与 IOS 的兼容
  
2. `flex.css`

  >（1）安装依赖包：
  
  ```
    npm install flex.css --save
  ```
  
  >（2）在 `node_modules\flex.css\dist` 目录找到 `flex.css` 文件，放入 `assets` 目录下
  >
  >（3）在 `index.html` 文件中 以 `<link>` 形式全局引入
    
  ```
    <link href="assets/css/flex.css" rel="stylesheet">
  ```
  
  >（4）最后就可以在元素中以属性的形式设置flex布局，更多用法请参考 [github中文文档](https://github.com/lzxb/flex.css/blob/master/docs/zh-ch.md)
  
  ```
    <div flex="main:center cross:center"></div>
  ```

3. `mixin.scss`

  >（1）将 `mixin.scss` 放入 `assets` 目录下
  >
  >（2）在所需要引入此上下文的 `scss` 文件的开头如下引入：
  
  ```
   // 以相对路径引入文件
    @import '../../assets/css/mixin.scss';
  ```
  >（3）最后使用 `@include ***();` 调用预先封装好的样式函数

### （四）修改 ion-* 默认组件样式

1. 全局修改：

  * 在 `/theme/variables.scss` 文件最下面根据官网公开的变量修改值，例如：

  ```
    $searchbar-ios-background-color: rgba(0, 0, 0, 0);
  ```

2. 局部修改：

  * 封装好的组件里面元素的类名需要在浏览器审查

  ```
   // 组件
    <!--搜索框-->
        <ion-searchbar class="header-searchbar" placeholder="美妆1元起 独家放价"></ion-searchbar>
   
   // 样式
    .header-searchbar {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    
        .searchbar-search-icon {
          top: 6px;
        }
      }
  ```

### （五）剖析 Angular 4 的 ElementRef + ViewChild + Renderer2 ——  native 元素操作

1. 作用：

    `ElementRef` 我们就可以封装不同平台下视图层中的 native 元素 (在浏览器环境中，native 元素通常是指 DOM 元素)，最后借助于 Angular 提供的强大的依赖注入特性，我们就可以轻松地访问到 native 元素。

    `ViewChild` 属性装饰器

    `Renderer` 对象提供的 API 能优雅地操作 DOM 元素
    
2. 使用：

  ```
   // 引入
    import { Component, ElementRef, ViewChild, AfterViewInit, Renderer } from '@angular/core';
   
    @Component({
      selector: 'my-app',
      template: `
        <h1>Welcome to Angular World</h1>
        <div #greet>Hello {{ name }}</div>
      `,
    })
    export class TabHomePage {
     // 作为声明类型
      name: string = 'Semlinker';
      
      @ViewChild('greet')
      greetDiv: ElementRef;
      
     // 注入类
      constructor(private elementRef: ElementRef, private renderer: Renderer) { }
       
     // 在生命周期函数实现操作DOM
       ngAfterViewInit() {
           // this.greetDiv.nativeElement.style.backgroundColor  = 'red';
           this.renderer.setElementStyle(this.greetDiv.nativeElement, 'backgroundColor', 'red');
         }
     }
  ```

3. Renderer2 API 还有常用的方法：
  
  ```
    export abstract class Renderer2 {
      abstract createElement(name: string, namespace?: string|null): any;
      abstract createComment(value: string): any;
      abstract createText(value: string): any;
      abstract setAttribute(el: any, name: string, value: string,
        namespace?: string|null): void;
      abstract removeAttribute(el: any, name: string, namespace?: string|null): void;
      abstract addClass(el: any, name: string): void;
      abstract removeClass(el: any, name: string): void;
      abstract setStyle(el: any, style: string, value: any, 
        flags?: RendererStyleFlags2): void;
      abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void;
      abstract setProperty(el: any, name: string, value: any): void;
      abstract setValue(node: any, value: string): void;
      abstract listen(
          target: 'window'|'document'|'body'|any, eventName: string,
          callback: (event: any) => boolean | void): () => void;
    }
  ```

4. 总结：

    `<div #greet>Hello {{ name }}</div>` + `@ViewChild('greet') greetDiv: ElementRef;` -> 通过给DOM元素设置 `id` 并注入 `ElementRef`
    
    `this.greetDiv.nativeElement` -> 相当于调用 `querySelector()` 获取DOM元素
    
    `this.renderer` -> 相当于 `document`

* 参考 [Angular 4 ElementRef](https://segmentfault.com/a/1190000008653690)

### （六）剖析 ionic-angular 的 生命周期函数（钩子）

* 以下返回 void

1. `ionViewDidLoad` -> 当页面加载的时候触发，仅在页面创建的时候触发一次，如果被缓存了，那么下次再打开这个页面则不会触发

2. `ionViewWillEnter` -> 当页面即将进入并成为活动页面时运行

3. `ionViewDidEnter` -> 当页面完全进入并且现在是活动页面时运行。无论是第一次加载还是缓存页面，此事件都会触发

4. `ionViewWillLeave` -> 当将要从页面离开时触发

5. `ionViewDidLeave` -> 离开页面时触发

6. `ionViewWillUnload` -> 当页面将要销毁同时页面上元素移除时触发

* 以下返回 boolean

7. `ionViewCanEnter` -> 设置什么时候返回 true，什么时候返回 false 实现控制页面的进入
  
8. `ionViewCanLeave` -> 设置什么时候返回 true，什么时候返回 false 实现控制页面的离开

* 参考 [来扯点ionic3[3] 页面的生命周期事件，也就是凡间所说的钩子](https://www.jianshu.com/p/72b704b5c9ed)

### （七）剖析 ionic-angular 的 NavParams ——页面间数据传递

1. 指定页面之间数据传递
  
  >（1）跳转前，组件：
  
  ```
    <button ion-button (click)="pushTestPage()">喜欢我就点我呀</button>
  ```
  
  >（2）跳转前，逻辑处理：
  
  ```
    import { Component } from '@angular/core';
    import { NavController } from 'ionic-angular';
    
    import { TestPage } from '../test/test';
    
    @Component({
        selector: 'page-home',
      templateUrl: './home.html'
    })
    export class HomePage {
      
      constructor(public navCtrl: NavController) {
      }
    
      pushTestPage(){
        this.navCtrl.push(TestPage,{
            title:'没有人可以比我帅'
        }););
      }
    
    }
  ```
  
  >（3）跳转后，逻辑处理：
  
  ```
    import { Component } from '@angular/core'
    
    import { NavParams } from 'ionic-angular' //step1
    
    @Component({
        selector: 'page-test',
        templateUrl:'./test.html'
    })
    export class TestPage {
    
        title:string; //step2
    
        constructor(public params:NavParams){ //step1
            this.title=this.params.get('title'); //step2
        }
    }
  ```

2. 适用于任何页面之间数据的传递

* 如果要把数据传递到任何一个页面，使用Events，[官网点这里](https://ionicframework.com/docs/api/util/Events/)

  >（1）发布页面：
  
  ```
    import { Events } from 'ionic-angular';    //导入
    ...
    export class EventsPage {
      user = '来自Events的数据'
    
      constructor(public events: Events) {}
    
      publishEvents(user) {
        console.log('User created!')
        this.events.publish('user:created',this.user, Date.now());
        console.log(this.user)
      }
    }
  ```
  
  >（2）要接收数据的页面（订阅页面）：
  
  ```
    import { Component} from '@angular/core';
    import { Events } from 'ionic-angular';
    
    @Component({
      selector: 'page-home',
      templateUrl: 'home.html'
    })
    export class HomePage {
      myEvent;
      constructor(public events: Events) {
        events.subscribe('user:created', (user, time) => {
          HomePage.prototype.myEvent = user; 
        });
      }
    }
  ```

* 注意：订阅必须再发布之前，不然接收不到。打个比喻：比如微信公众号，你要先关注才能接收到它的推文，不然它再怎么发推文，你也收不到。也就是说，接收页面必须在发布页面前被加载过。

* 另外，.subscribe()方法中有点this作用域的问题，对于这，我一般都是简单粗暴的用类名指定：HomePage.prototype.myEvent

* 参考 [《ionic3三种跳转方法对应的页面间数据传递及Events》](http://blog.csdn.net/qq993284758/article/details/77679283)

3. 结合 `IonicPage` 实现页面间的数据传递

* 参考 [Ionic3项目开发——页面跳转与参数传递](http://blog.csdn.net/gent__chen/article/details/78690877)

### （八）剖析 ionic-angular 的新特性 IonicPage —— 页面懒加载，跳转页面更简洁

1. 通过指令创建一个页面目录：

```
  ionic g page **
```

  > * 此时 ionic 已经帮我们做了如下事：
  >>（1）创建一个Component，并且通过@IonicPage()装饰器进行装饰
  >>
  >>（2）创建一个Module，在其中引入创建的Page,并且通过IonicPageModule.forChild(OptionsPage)在全局中声明这个Page
  > * 注意：目录名为 小驼峰式 会自动更换成 带“-”分割写法

2. 如果使用 tabs ，则需要将 tabs 目录也用此方法重新创建，然后修改如下：

  >（1）`html` ：
  
  ```
    <ion-tabs>
      <ion-tab [root]="tab1Root" tabTitle="首页" tabIcon="home"></ion-tab>
      <ion-tab [root]="tab2Root" tabTitle="分类" tabIcon="list"></ion-tab>
      <ion-tab [root]="tab3Root" tabTitle="购物车" tabIcon="cart"></ion-tab>
      <ion-tab [root]="tab4Root" tabTitle="我的" tabIcon="person"></ion-tab>
    </ion-tabs>

  ```
  
  >（2）`ts` ：
  
  ```
    @IonicPage()
    @Component({
      selector: 'page-tabs',
      templateUrl: 'tabs.html',
    })
    export class TabsPage {
    
      tab1Root = 'TabHomePage'; //改这！
      tab2Root = 'TabListPage'; //改这！
      tab3Root = 'TabCartPage'; //改这！
      tab4Root = 'TabMePage'; //改这！
    
      constructor(public navCtrl: NavController, public navParams: NavParams) {
      }
    
      ionViewDidLoad() {
        console.log('ionViewDidLoad TabsPage');
      }
    
    }
  ```

3. 修改 `app.component.ts` 文件，以字符串传递路由，而无需引入模块文件：

```
  import { Component } from '@angular/core';
  import { Platform } from 'ionic-angular';
  import { StatusBar } from '@ionic-native/status-bar';
  import { SplashScreen } from '@ionic-native/splash-screen';
  
  @Component({
    templateUrl: 'app.html'
  })
  export class MyApp {
    rootPage:any = 'TabsPage'; //改这！
  
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    }
  }

```

4. 最后将 `app.module.ts` 文件引入的文件模块全部删掉

5. 跳转至子页面（同时不再显示tabs），需要使用 `App` 模块的 `getRootNav().push()` 方法：

```
  import { Component } from '@angular/core';
  import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
  
  /**
   * Generated class for the TabHomePage page.
   *
   * See https://ionicframework.com/docs/components/#navigation for more info on
   * Ionic pages and navigation.
   */
  
  @IonicPage()
  @Component({
    selector: 'page-tab-home',
    templateUrl: 'tab-home.html',
  })
  export class TabHomePage {
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad TabHomePage');
    }
  
    goToOption() {
      // this.navCtrl.push('EntryPage');
      this.app.getRootNav().push('EntryPage', {
        aa: '66'
      });
    }
  }
```

6. 同层 `tab` 页面之间跳转：

```
  switchTabs() {
      this.navCtrl.parent.select(2);
    }
```

7. 子页面跳转至指定 `tab` 页面

  >（1）子页面逻辑，传递所需要跳转至 tabs 页面的 index：
  
  ```
    ...
    
    goToOption() {
      this.navCtrl.push('TabsPage', {
        index: 2
      });
    }
  ```
  
  >（2）父 tabs 页面的逻辑：
  
  ```
    import { Component, ViewChild } from '@angular/core'; // ViewChild 模块可以获取 native 元素
    
    /**
     * NavParams 获取通过 navCtl.push() 传递的值
     * Tabs      获取 Tabs 模块可以操作 tabs 组件
     * App       获取 App 模块可以操作根导航
     */
    import { IonicPage, NavController, NavParams, Tabs, App } from 'ionic-angular';

    @IonicPage()
    @Component({
      selector: 'page-tabs',
      templateUrl: 'tabs.html',
    })
    export class TabsPage {
    
      @ViewChild('myTabs') tabRef: Tabs; // tabs 组件给个 myTabs 作为 id
      tab1Root = 'TabHomePage';
      tab2Root = 'TabListPage';
      tab3Root = 'TabCartPage';
      tab4Root = 'TabMePage';
      tabIndex : number;
    
      constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
        this.tabIndex = this.navParams.get('index') || 0;
      }
    
      // ionViewDidLoad 此钩子只新页面加载时调用一次，同时无明显页面跳转
      ionViewDidLoad() {
        if (this.tabIndex !== 0) this.tabRef.select(this.tabIndex); // 手动实现 tabs 组件页面跳转
        
        if(this.app.getActiveNavs().length>1) this.navCtrl.remove(0, this.app.getActiveNavs().length); // remove() 可以移除栈的重复页面
      }
    }
  ```

* 参考 [Ionic3项目开发——页面跳转与参数传递](http://blog.csdn.net/gent__chen/article/details/78690877)

* 参考 [《Ionic3新特性--页面懒加载1》](https://www.cnblogs.com/gavin-cn/p/6943584.html)

* 参考 [《Ionic3新特性--页面懒加载2加载其他组件》](http://www.cnblogs.com/gavin-cn/p/6961376.html)

### （九）使用 Ionic and Typings 管理第三方JS库

1. 第一步：安装所想下载的第三方JS库

```
  npm install **.js --save
```

2. 第二步：全局安装typings

```
  npm install -g typings
```

3. 第三步：可以利用指令 `typings search chart.js` 搜一下有多少个 **.js 的源

4. 第四步：选择更好的源用 `typings` 安装依赖

```
  typings install chart.js --save
```

5. 第五步：引入库，以 chart.js 为例

```
  import * as ChartJs from 'chart.js'; // 导入chart.js
```

* 特别注意，搜索显示库来源为 `dt` 时，则需要全局安装库

```
  typings install dt~swiper --global
```

* 参考： 

  [《如何在Ionic2项目中使用第三方JavaScript库》](https://www.jianshu.com/p/5f603f593917) 
  
  [官网](https://blog.ionicframework.com/ionic-and-typings/)

### （十）HTTP 请求 + 跨域

1. 在 `app.module.ts` 文件导入 HttpModule 并注入模块

```
  import { HttpModule } from '@angular/http'; //改这！
  
  ...
  
  @NgModule({
    declarations: [
      MyApp
    ],
    imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      HttpModule //改这！
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      MyApp
    ],
    providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
  })
  export class AppModule {}
  
```

2. 在需要http请求的 `**.ts` 文件处理逻辑：

```
 // 注意此处导入的是 Http 和结果集 Response
  import { Http, Response } from '@angular/http';
  
  ...
  
 // 注入构造器
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, private http: Http) {
  }
  
  ...
  
 // 在需要的方法里调用，此时仍未解决跨域问题
  this.http.get('http://jsonplaceholder.typicode.com/photos')
    .subscribe((res: Response) => {
      this.listData = res.json().filter(function (item, index) {
        return index < 20;
      });
      console.log(this.listData);
    }, err => console.log(err));
```

3. 跨域：

```
  Failed to load http://localhost:3000/swiperData: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8100' is therefore not allowed access.
```

  > * 解决方法 —— 打开 `ionic.config.json` 文件，添加 `proxies` 代理配置字段：

```
  {
    "name": "master",
    "app_id": "3aad9716",
    "type": "ionic-angular",
    "integrations": {
      "cordova": {}
    },
   // 添加这！
    "proxies": [
      {
        "path": "/api",
        "proxyUrl": "http://localhost:3000"
      }
    ]
  }
```

  > * 调用姿势：

```
  this.http.get('/api/swiperData')...
```

  > * 特别注意，修改代理后需要重启服务！！！

4. 最终正确的调用姿势：

```
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
```

* 参考：

  [《ionic3 教程（五）基本的网络请求》](https://www.jianshu.com/p/3ad54d7d1077)

  [《通过设置Ionic-Cli代理解决ionic serve跨域调试问题》](https://www.cnblogs.com/itfantasy/p/7122482.html)
  
### （十一）ng-lazyload-image 图片懒加载

* [github文档](https://github.com/tjoskar/ng-lazyload-image)

1. 安装依赖包：

```
  npm install ng-lazyload-image --save
```

2. 在需要使用的模块文件，如 `tab-home.module.ts` 文件注入依赖：

```
  import { NgModule } from '@angular/core';
  import { IonicPageModule } from 'ionic-angular';
  import { TabHomePage } from './tab-home';
  
  import { LazyLoadImageModule } from 'ng-lazyload-image'; //改这！
  
  @NgModule({
    declarations: [
      TabHomePage,
    ],
    imports: [
      IonicPageModule.forChild(TabHomePage),
      LazyLoadImageModule //改这！
    ],
  })
  export class TabHomePageModule {}

```

3. 使用：

```
 // 给 ion-content 获取名 #container
  <ion-content #container id="home">
  
  ...
  
 // 属性值注意为 字符串定值 或 变量
  <img [defaultImage]="'assets/imgs/common/common_default.png'"
       [lazyLoad]="lazyLoad"
       [scrollObservable]="container.ionScroll" />

  ...
  
 // 获取 #container 以观察滚动事件
  @ViewChild('container')
    container: ElementRef;
  defaultImage = '';
  lazyLoad = 'assets/imgs/seckill_1.jpg';
```

### （十二）本地存储（IndexedDB）

* 无需安装依赖包，利用官方自带的 `@ionic/storage` 2x版本，参考： [《ionic3基础之本地缓存》](http://blog.csdn.net/fan2252228703/article/details/78116000)

1. 在 `app.module.ts` 导入并注入依赖：

```
  //app.module.ts  
  import { IonicStorageModule } from '@ionic/storage'; //导入换成这个
  
  //..
  @ngModule({
  
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(), //这需要添加 之前providers里的需要删除
  ]
```

2. 然后就可以在任何逻辑文件本地存储数据了，如 `tab-me.ts` 文件逻辑：

```
 // 导入模块
  import { Storage } from '@ionic/storage';
  
  @Component({
    templateUrl: 'Myapp.html',
  })
  export class MyApp {
    
   // 注入对象
    constructor(private storage: Storage) { }
    ...
    
    // 设置
    this.storage.set('name', 'Max');
  
    // 获取
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
    });
  }
```

* 当数据为对象时，注意转类型：

```
 //  存储时转换成字符串
  JSON.stringify(data)
  
 // 获取时转换成对象
 JSON.parse(data)
```

### （十三）通过 provider 提供全局声明服务

* 参考： [《ionic providers的使用》](http://blog.csdn.net/qq993284758/article/details/78171510?locationNum=5&fps=1)

1. 通过以下指令创建 `provider` 管理全局声明：

```
  ionic g provider Constants #全局常量
  
  ionic g provider GlobalData #全局变量、方法
```

  > * 此时它会在providers文件夹中帮你创建好，并且在 `app.module.ts` 中导入好
  >
  > * 但是全局常量无需导入 `app.module.ts` ，所以要把它删去，然后在 `constants.ts` 文件重新以以下形式写：
  
  ```
    
    export const CONSTDATA1 = '全局常量1，你不能改变我！';
    
    export const CONSTDATA2 = '全局常量2，你也不能改变我！';

  ```
  
  > * 全局变量、方法可以直接在以写好的形式继续编写：
  
  ```
    import { Injectable } from '@angular/core';
  
    @Injectable()
    export class GlobalDataProvider {
    
      private _username: string;
      
      constructor() {
        console.log('Hello GlobalDataProvider Provider');
      }
    
      get username(): string {
        return this._username;
      }
    
      set username(value: string) {
        this._username = value;
      }
    }
  ```
  
  > 注意：如果不用 `HttpClient` 一定要删掉导入和注入，否则报错
  
2. 最后在任意页面使用：

```
 // 按文件的相对路径引入模块
  import { CONSTDATA1, CONSTDATA2 } from './../../providers/constants/constants';
  import { GlobalDataProvider } from './../../providers/global-data/global-data';
  
  ...
  
 // 全局变量模块需要注入
  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public app: App,
                private storage: Storage,
                private global: GlobalDataProvider) {
    }
  
  ...
  
  // 任意使用
  console.log(CONSTDATA1);
  console.log(CONSTDATA2);
  this.global.username = '666';
  console.log(this.global.username);
```

### （十四）实现底部上拉新添数据

* 查看 `goods` 目录

1. 服务器这么写：

```
  router.post('/goodsData', function(req, res, next) {
      let option = req.body.option || {},
          currentPage = parseInt(req.body.currentPage) || 1,
          pageSize = req.body.pageSize || 7,
          skip = (currentPage - 1) * pageSize,
          sort = req.body.sort || {};
  
      Goods.find(option).skip(skip).limit(pageSize).sort(sort).exec(function(err, doc) {
          if (err) {
              res.json({
                  status: 500,
                  message: err.message
              });
          } else {
              res.json({
                  status: 200,
                  msg: '获取商品列表成功',
                  content: doc
              });
          }
      });
  });
```
 
2. 组件：

```
  <div class="pro" *ngFor="let item of obj_goodsListData, let i = index" (click)="startPage()">
    <div class="pro-warp">
      <div class="pro-body">
        <div class="pro-body-des">
          <!--<a ng-href="#/details/{{item.productId}}">-->
          <a>
            <img src="{{item.img}}" alt="">
          </a>
          <div class="pro-body-des-text">
            <span>{{item.name}}</span>
            <b>￥{{item.price}}</b>
            <div class="pro-body-des-con">
              <span>{{item.haoping}}%好评</span>
              <span>{{item.buy}}人</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">
    <ion-infinite-scroll-content
      loadingSpinner="bubbles"
      loadingText="Loading more data...">
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
```

3. 逻辑：

```
  obj_goodsListData =  [];
  currentPage = 0;
  
  ...
  
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
  
  ...
  
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
```

* JS原生的 `concat()` 不改变原有数组，返回多个数组连接后的副本数组

### （十五）登入登出功能

* 组件if-else条件显示参考： [《Angular 4 NgIf-Then-Else Example》](https://www.concretepage.com/angular-2/angular-4-ngif-then-else-example)

1. 服务器这么写：

```
  router.post('/login', function(req, res, next) {
      let username = req.body.username,
          password = req.body.password;
  
      User.findOne({ "name": username, "password": password }, function(err, doc) {
          if(err){
              return res.json({
                  status: 500,
                  message: '服务器出错'
              });
          }
  
          if(!doc){
              return res.json({
                  status: 404,
                  message: '登录失败'
              });
          }
  
          return res.json({
              status: 200,
              message: '登录成功',
              content: {
                  nickname: doc.nickname
              }
          });
      })
  });
```

2. 组件：

```
  <div *ngIf="isNotLogin; else onLogin">
    <ion-input id="user_name"
                   placeholder="用户名/邮箱/已验证手机"
                   style="padding-left: 15px"
                   [(ngModel)]="loginName"></ion-input>
                   
    <ion-input id="user_password"
                     placeholder="请输入密码"
                     clearInput
                     type="password"
                     style="padding-left: 15px"
                     [(ngModel)]="loginPsw"></ion-input>
    ...
  </div>
  
  <ng-template #onLogin>
    <div flex="main:center">欢迎 {{ nickname }} 回来！</div>

    <div flex="main:center"><button ion-button (click)="logout()">登出</button></div>
  </ng-template>
  
```

> * `#onLogin` 如果不用 `ElementRef, ViewChild` 捕获只能用内置标签 `<ng-template>`

3. 逻辑：

```
  isNotLogin: boolean = true;
  nickname: string = '';
  loginName = '';
  loginPsw = '';
  
  ...
  
  login(){
    this.http.post('/api/login', {
      username: this.loginName,
      password: this.loginPsw
    }).subscribe((response: Response) => {
      let res = response.json();

      if (res.status === 200) {
        this.nickname = res.content.nickname;
        this.isNotLogin = false;
      } else {
        console.log(res.message);
      }
    });
  }
  
  logout() {
    this.nickname = '';
    this.isNotLogin = true;
  }
```

### （十六）本地存储cookies的token实现长久登录

1. 服务器这样写：

```
  
router.get('/logout', function(req, res, next) {
    let token = req.cookies.token;

    if(token) {
        res.clearCookie('token');

        res.json({
            status: 200,
            message: '登出成功'
        });
    } else {
        res.json({
            status: 401,
            message: '非法登出'
        });
    }
});

router.post('/checkToken', function(req, res, next) {
    let token = req.cookies.token;

    if(token){
        let tokenList = token.split('+');
        let username = tokenList[0],
            password = tokenList[1];

        User.findOne({ "name": username, "password": password }, function(err, doc) {
            if(err){
                return res.json({
                    status: 500,
                    message: '服务器出错'
                });
            }

            if(!doc){
                return res.json({
                    status: 404,
                    message: 'token非法'
                });
            }

            res.json({
                status: 200,
                message: '登录成功',
                content: {
                    nickname: doc.nickname
                }
            });
        })
    } else {
        res.json({
            status: 401,
            message: '还未登录'
        });
    }
});
```

2. 入口逻辑：

```
  import { Http, Response } from '@angular/http';
  import { GlobalDataProvider } from '../providers/global-data/global-data';
  
  ...
  
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
```

3. 个人页面逻辑：

```
  ionViewDidLoad() {
    if(this.global.username === ''){
      this.isNotLogin = true;
    } else {
      this.isNotLogin = false;
      this.nickname = this.global.username;
    }
  }
  
  ...
  
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
```

## 生成apk

1. 先退出 `ionic serve` 运行模式

2. 按以下顺序执行指令：

```
  ionic build
  
  ionic cordova platform rm android
  
  ionic cordova platform add android
  
  ionic cordova run android --livereload -c -s #请求localhost服务器，请使用--livereload参数
```

3. 此时可根据命令窗口，随代码随机真机更新

4. 若非请求localhost服务器，即上线部署时，可使用如下更快启动程序：

```
  ionic cordova run android --prod
```

