import { NgModule } from '@angular/core';
import { FirebasePhoneNumberCheckComponent } from './firebase-phone-number-check/firebase-phone-number-check';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from 'ionic-angular';
import { SelectCountriesCodeComponent } from './select-countries-code/select-countries-code';


@NgModule({
	declarations: [
    SelectCountriesCodeComponent,
    FirebasePhoneNumberCheckComponent
  ],
	imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
    SelectCountriesCodeComponent,
    FirebasePhoneNumberCheckComponent
  ]
})
export class ComponentsModule {}
