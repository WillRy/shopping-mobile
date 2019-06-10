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
import { AuthProvider } from '../../providers/auth/auth';


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
    private auth: AuthProvider
  ) {
    console.log(this.auth.me  );
  }

  ngOnInit() {
    this.chatGroupFb.list().subscribe((groups) => {
      this.groups = groups;
      console.log(groups);
    });


    // const database = this.firebaseAuth.firebase.database();


    // database.ref('chat_groups').on('child_changed', (data) => {
    //   const group = data.val() as ChatGroup;
    //   const index = this.groups.findIndex((g) => g.id === group.id);
    //   if (index != -1) {
    //     this.groups[index] = group;
    //   }
    // });
  }

}
