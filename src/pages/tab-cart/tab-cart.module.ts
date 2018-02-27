import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabCartPage } from './tab-cart';

@NgModule({
  declarations: [
    TabCartPage,
  ],
  imports: [
    IonicPageModule.forChild(TabCartPage),
  ],
})
export class TabCartPageModule {}
