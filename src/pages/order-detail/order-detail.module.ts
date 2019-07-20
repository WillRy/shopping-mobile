import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailPage } from './order-detail';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailPage),
    ComponentsModule,
    PipesModule
  ],
})
export class OrderDetailPageModule {}
