import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabMePage } from './tab-me';

@NgModule({
  declarations: [
    TabMePage,
  ],
  imports: [
    IonicPageModule.forChild(TabMePage),
  ],
})
export class TabMePageModule {}
