import { ChatFooterComponent } from './../chat-footer/chat-footer';
import { ChatContentDetailComponent } from './../chat-content-detail/chat-content-detail';
import { ChatContentRightComponent } from './../chat-content-right/chat-content-right';
import { ChatContentLeftComponent } from './../chat-content-left/chat-content-left';
import { ChatAvatarComponent } from './../chat-avatar/chat-avatar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagesPage } from './chat-messages';
import { MomentModule } from 'ngx-moment';
import { PipesModule } from '../../../pipes/pipes.module';
import {LongPressModule} from "ionic-long-press";
import {AudioRecorderProvider} from "../../../providers/audio-recorder/audio-recorder";
import { ChatGMessageFbProvider } from '../../../providers/firebase/chat-message-fb';

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
    MomentModule,
    PipesModule,
    LongPressModule
  ],
  providers: [
    AudioRecorderProvider,
    ChatGMessageFbProvider
  ]
})
export class ChatMessagesPageModule {}
