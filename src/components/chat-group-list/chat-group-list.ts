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
import { IonicPage } from 'ionic-angular/navigation/ionic-page';


/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@IonicPage()
@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent {

  groups: ChatGroup[] = [];
  chatActive;
  chatGroupIdToFirstOpen = null;

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
      this.goToMessagesFromNotification();
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

      if(!this.chatActive || group.id !== this.chatActive.id){
        this.chatGroupViewer.loadViewed(group);
      }else{
        this.chatGroupViewer.viewed(group);
      }
      this.groups.splice(index,1);
      this.groups.unshift(group);
    });
  }

  formatTextMessage(message: ChatMessage) {
    return message.content.length > 15 ? message.content.slice(0, 15) + '...' : message.content
  }

  goToMessagesFromNotification(chatGroupId = null){
    if(chatGroupId){
      this.chatGroupIdToFirstOpen = chatGroupId;
    }
    if(this.chatGroupIdToFirstOpen){
      const group = this.getById(chatGroupId);
      if(group){
        this.goToMessages(group);
      }
    }
  }

  getById(chatGroupId){
    // push notification string
    const index = this.groups.findIndex((group) => group.id == chatGroupId);
    return index === -1 ? null : this.groups[index];

  }

  goToMessages(group: ChatGroup){
    this.chatGroupViewer.viewed(group);
    this.chatActive = group;
    this.app.getRootNav().push('ChatMessagesPage', {'chat_group':group});
  }
}
