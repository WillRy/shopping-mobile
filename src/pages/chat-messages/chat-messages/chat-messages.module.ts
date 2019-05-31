import { ChatFooterComponent } from './../chat-footer/chat-footer';
import { ChatContentDetailComponent } from './../chat-content-detail/chat-content-detail';
import { ChatContentRightComponent } from './../chat-content-right/chat-content-right';
import { ChatContentLeftComponent } from './../chat-content-left/chat-content-left';
import { ChatAvatarComponent } from './../chat-avatar/chat-avatar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagesPage } from './chat-messages';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    ChatMessagesPage,
    ChatAvatarComponent,
    ChatContentDetailComponent,
    ChatContentLeftComponent,
    ChatContentRightComponent,
    ChatFooterComponent,
  ],
  imports: [
    IonicPageModule.forChild(ChatMessagesPage),
    MomentModule
  ],
})
export class ChatMessagesPageModule {}
