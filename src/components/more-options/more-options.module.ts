import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

import { MoreOptionsComponent } from './more-options';

@NgModule({
  declarations: [
    MoreOptionsComponent,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(MoreOptionsComponent),
  ]

})
export class MoreOptionsModule {}
