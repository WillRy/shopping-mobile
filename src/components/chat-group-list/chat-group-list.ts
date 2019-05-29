import { FirebaseAuthProvider } from './../../providers/auth/firebase-auth';
import { Component } from '@angular/core';
import { chatGroup } from '../../app/model';


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

  groups: chatGroup[] = [];

  constructor(private firebaseAuth: FirebaseAuthProvider) {

  }

  ngOnInit() {
    const database = this.firebaseAuth.firebase.database();
    database.ref('chat_groups').on('child_added', (data) => {
      const group = data.val() as chatGroup;
      this.groups.push(group);
    });

    database.ref('chat_groups').on('child_changed', (data) => {
      const group = data.val() as chatGroup;
      const index = this.groups.findIndex((g) => g.id === group.id);
      if (index != -1) {
        this.groups[index] = group;
      }
    });
  }

}
