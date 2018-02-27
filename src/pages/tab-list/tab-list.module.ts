import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabListPage } from './tab-list';

@NgModule({
  declarations: [
    TabListPage,
  ],
  imports: [
    IonicPageModule.forChild(TabListPage),
  ],
})
export class TabListPageModule {}
