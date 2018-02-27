import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabHomePage } from './tab-home';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    TabHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TabHomePage),
    LazyLoadImageModule
  ],
})
export class TabHomePageModule {}
