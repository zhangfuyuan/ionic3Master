import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsPage } from './goods';

@NgModule({
  declarations: [
    GoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsPage),
  ],
})
export class GoodsPageModule {}
