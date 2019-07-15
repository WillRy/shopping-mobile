import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ProductSearchOptionsComponent } from './product-search-options';

@NgModule({
  declarations: [
    ProductSearchOptionsComponent,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(ProductSearchOptionsComponent),
  ]

})
export class ProductSearchOptionsModule {}
