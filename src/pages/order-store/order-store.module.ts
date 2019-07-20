import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderStorePage } from './order-store';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderStorePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(OrderStorePage),
  ],
})
export class OrderStorePageModule {}
