import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { ChatGroupListComponent } from './chat-group-list';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    ChatGroupListComponent,
  ],
  imports: [
    IonicModule,
    PipesModule,
    IonicPageModule.forChild(ChatGroupListComponent),
    DirectivesModule
  ]

})
export class ChatGroupListModule {}
