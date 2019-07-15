import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { MainPage } from './main';
import { ComponentsModule } from '../../components/components.module';
import { SuperTabsModule } from "ionic2-super-tabs";


@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(MainPage),
    ComponentsModule,
    SuperTabsModule

  ]
})
export class MainPageModule {}
