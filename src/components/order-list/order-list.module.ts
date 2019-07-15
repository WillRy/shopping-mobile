import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { OrderListComponent } from './order-list';
import { ComponentsModule } from '../components.module';

@NgModule({
  declarations: [
    OrderListComponent,
  ],
  imports: [
    IonicModule,
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(OrderListComponent),
  ]

})
export class OrderListModule {}
