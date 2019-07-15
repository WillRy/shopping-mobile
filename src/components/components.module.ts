import { NgModule } from '@angular/core';
import { FirebasePhoneNumberCheckComponent } from './firebase-phone-number-check/firebase-phone-number-check';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { SelectCountriesCodeComponent } from './select-countries-code/select-countries-code';
import { ProductSearchbarComponent } from './product-searchbar/product-searchbar';
import { ChatGroupListComponent } from './chat-group-list/chat-group-list';
import { ProductListComponent } from './product-list/product-list';
import { DirectivesModule } from '../directives/directives.module';
import { ProductListModule } from './product-list/product-list.module';
import { ChatGroupListModule } from './chat-group-list/chat-group-list.module';
import { OrderStatusComponent } from './order-status/order-status';
import { MoreOptionsComponent } from './more-options/more-options';


@NgModule({
	declarations: [
    SelectCountriesCodeComponent,
    FirebasePhoneNumberCheckComponent,
    ProductSearchbarComponent,
    OrderStatusComponent
  ],
	imports: [
    IonicModule,
    PipesModule,
    DirectivesModule,

  ],
  exports: [
    SelectCountriesCodeComponent,
    FirebasePhoneNumberCheckComponent,
    ProductSearchbarComponent,
    OrderStatusComponent
  ]
})
export class ComponentsModule {}
