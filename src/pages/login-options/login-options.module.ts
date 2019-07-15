import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOptionsPage } from './login-options';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LoginOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOptionsPage),
    ComponentsModule
  ],
  exports: [
    LoginOptionsPage
  ]
})
export class LoginOptionsPageModule {}
