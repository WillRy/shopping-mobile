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

  ) {

  }

  ngOnInit() {
    this.chatGroupFb.list().subscribe((groups) => {
      this.groups = groups;
    });

    this.chatGroupFb.onAdded().subscribe((group) => {
      this.groups.unshift(group);
    });

    this.chatGroupFb.onChanged().subscribe((group) => {
      const index = this.groups.findIndex(g => g.id === group.id);
      if(index === -1){
        return
      };

      this.groups.splice(index,1);
      this.groups.unshift(group);
    });
  }

  formatTextMessage(message: ChatMessage) {
    return message.content.length > 15 ? message.content.slice(0, 15) + '...' : message.content
  }

}
