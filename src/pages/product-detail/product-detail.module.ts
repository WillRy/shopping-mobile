import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductDetailPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ProductDetailPage),
  ],
})
export class ProductDetailPageModule {}
