import {
  ChatGMessageFbProvider
} from './../../../providers/firebase/chat-message-fb';
import {
  ChatGroup
} from './../../../app/model';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
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
  messages: ChatMessage[] = [];
  limit = 20;

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
    this.chatMessageFb.latest(this.chatGroup, this.limit).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        console.log(error);
      });

  }

}
