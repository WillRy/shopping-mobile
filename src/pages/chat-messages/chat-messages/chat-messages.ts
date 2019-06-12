import { IsCurrentUserPipe } from './../../../pipes/is-current-user/is-current-user';
import {
  ChatGMessageFbProvider
} from './../../../providers/firebase/chat-message-fb';
import {
  ChatGroup
} from './../../../app/model';
import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  InfiniteScroll
} from 'ionic-angular';
import {
  FirebaseAuthProvider
} from '../../../providers/auth/firebase-auth';
import {
  ChatMessage
} from '../../../app/model';
import {
  Observable
} from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-chat-messages',
  templateUrl: 'chat-messages.html',
})

export class ChatMessagesPage {

  chatGroup: ChatGroup;
  messages: {
    key: string,
    value: ChatMessage
  } [] = [];
  limit = 20;
  showContent = false;
  canMoreMessages = true;
  countNewMessages = 0;

  @ViewChild(Content)
  content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider,
    private chatMessageFb: ChatGMessageFbProvider,
    private isCurrentUser: IsCurrentUserPipe
  ) {
    // this.chatGroup = this.navParams.get('chat_group');
    this.chatGroup = {
      id: 1,
      name: 'string',
      photo_url: 'string',
    };
  }

  ionViewDidLoad() {
    this.chatMessageFb.latest(this.chatGroup, this.limit)
      .subscribe((messages) => {
        this.messages = messages;

        setTimeout(() => {
          this.scrollToBottom();
          this.showContent = true;
        }, 500);
      });

      this.chatMessageFb.onAdded(this.chatGroup).subscribe(
        (message) => {
        this.messages.push(message);
        if (this.isCurrentUser.transform(message.value.user_id)) {
            return;
        }
        this.countNewMessages++;

      },
      (error) => {
        console.log(error);
      });
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.chatMessageFb.oldest(this.chatGroup, this.limit, this.messages[0].key)
      .subscribe((messages) => {
          if (!messages.length) {
            this.canMoreMessages = false;
          }
          this.messages.unshift(...messages);
          infiniteScroll.complete();
        },
        (error) => {
          infiniteScroll.complete();
        });
  }

  scrollToBottom() {
    this.countNewMessages = 0;
    this.content.scrollToBottom(0);
  }

  showButtonScrollBottom() {
    const dimensions = this.content.getContentDimensions();
    const contentHeight = dimensions.contentHeight;
    const scrollTop = dimensions.scrollTop;
    const scrollHeight = dimensions.scrollHeight;

    return scrollHeight > scrollTop + contentHeight;
  }

}
