import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ResetPhoneNumberPage } from './reset-phone-number';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ResetPhoneNumberPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(ResetPhoneNumberPage),
    ComponentsModule
  ],
})
export class ResetPhoneNumberPageModule {}
