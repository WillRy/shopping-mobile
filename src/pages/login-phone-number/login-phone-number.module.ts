import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { LoginPhoneNumberPage } from './login-phone-number';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    LoginPhoneNumberPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(LoginPhoneNumberPage),
    ComponentsModule
  ]
})
export class LoginPhoneNumberPageModule {}
