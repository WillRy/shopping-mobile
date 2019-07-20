import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { ProductListComponent } from './product-list';

@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    IonicModule,
    PipesModule,
    IonicPageModule.forChild(ProductListComponent),
  ]

})
export class ProductListModule {}
