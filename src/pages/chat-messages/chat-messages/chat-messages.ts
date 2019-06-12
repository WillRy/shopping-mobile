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

  @ViewChild(Content)
  content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider,
    private chatMessageFb: ChatGMessageFbProvider
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
          this.content.scrollToBottom(0);
          this.showContent = true;
        }, 500);
      });

      this.chatMessageFb.onAdded(this.chatGroup).subscribe(
        (message) => {
        this.messages.push(message);
        },
        (error) => console.log(error));
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

}
