import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPhoneNumberPage } from './reset-phone-number';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ResetPhoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPhoneNumberPage),
    ComponentsModule
  ],
})
export class ResetPhoneNumberPageModule {}
