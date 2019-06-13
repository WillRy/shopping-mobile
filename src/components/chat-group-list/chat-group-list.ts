import { ChatGroupViewerProvider } from './../../providers/chat-group-viewer/chat-group-viewer';
import { ChatMessagesPage } from './../../pages/chat-messages/chat-messages/chat-messages';
import {
  ChatMessage
} from './../../app/model';
import {
  ChatGroupFbProvider
} from './../../providers/firebase/chat-group-fb';
import {
  FirebaseAuthProvider
} from './../../providers/auth/firebase-auth';
import {
  Component
} from '@angular/core';
import {
  ChatGroup
} from '../../app/model';
import {
  AuthProvider
} from '../../providers/auth/auth';
import { App } from 'ionic-angular';


/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent {

  groups: ChatGroup[] = [];

  constructor(
    private firebaseAuth: FirebaseAuthProvider,
    private chatGroupFb: ChatGroupFbProvider,
    private app: App,
    private chatGroupViewer: ChatGroupViewerProvider

  ) {

  }

  ngOnInit() {
    this.chatGroupFb.list().subscribe((groups) => {
      groups.forEach(group => {
        this.chatGroupViewer.loadViewed(group);
      })
      this.groups = groups;
    });

    this.chatGroupFb.onAdded().subscribe((group) => {
      this.chatGroupViewer.loadViewed(group);
      this.groups.unshift(group);
    });

    this.chatGroupFb.onChanged().subscribe((group) => {
      const index = this.groups.findIndex(g => g.id === group.id);
      if(index === -1){
        return
      };
      this.chatGroupViewer.loadViewed(group);
      this.groups.splice(index,1);
      this.groups.unshift(group);
    });
  }

  formatTextMessage(message: ChatMessage) {
    return message.content.length > 15 ? message.content.slice(0, 15) + '...' : message.content
  }

  goToMessages(group: ChatGroup){
    this.chatGroupViewer.viewed(group);
    this.app.getRootNav().push('ChatMessagesPage', {'chat_group':group});
  }
}
