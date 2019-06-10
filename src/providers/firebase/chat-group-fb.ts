import {
  AuthProvider
} from './../auth/auth';
import {
  ChatGroup,
  Role,
  ChatMessage
} from './../../app/model';
import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  FirebaseAuthProvider
} from '../auth/firebase-auth';
import {
  Observable
} from 'rxjs/Observable';


@Injectable()
export class ChatGroupFbProvider {

  database;

  constructor(
    public http: HttpClient,
    private firebaseAuth: FirebaseAuthProvider,
    private auth: AuthProvider
  ) {
    this.database = this.firebaseAuth.firebase.database();
  }

  list(): Observable < ChatGroup[] > {
    return Observable.create((observer) => {
      this.database.ref('chat_groups').orderByChild('updated_at').once('value',
        (data) => {
          const groupsRaw = data.val() as Array < ChatGroup > ;
          const groupsKeys = Object.keys(groupsRaw).reverse();
          const groups = [];
          for (const key of groupsKeys) {
            groupsRaw[key].is_member = this.getMember(groupsRaw[key]);
            groupsRaw[key].last_message = this.getLastMessage(groupsRaw[key]);
            groups.push(groupsRaw[key]);
          }
          observer.next(groups);
        },
        (error) => {
          console.log(error);
        });
    });
  }

  private getMember(group: ChatGroup): Observable < boolean > {
    return Observable.create(observer => {
      if (this.auth.me.role === Role.SELLER) {
        return observer.next(true);
      }
      this.database.ref(`chat_groups_users/${group.id}/${this.auth.me.profile.firebase_uid}`)
        .on('value', data => {
          return data.exists() ? observer.next(true) : observer.next(false);
        });
    });
  }

  private getLastMessage(group: ChatGroup): Observable < ChatMessage > {
    return Observable.create(observer => {
      this.database.ref(`chat_groups_messages/${group.id}/last_message_id`)
        .on('value', data => {
          if (!data.exists()) {
            return;
          }
          const lastMessageId = data.val();
          this.getMessage(group, lastMessageId).subscribe((message) => {
            observer.next(message);
          })
        });
    });
  }

  private getMessage(group: ChatGroup, lasMessageId: string): Observable < ChatMessage > {
    return Observable.create(observer => {
      this.database.ref(`chat_groups_messages/${group.id}/messages/${lasMessageId}`)
        .once('value', data => {
          const message = data.val();
          this.getUser(message.user_id).subscribe((user) => {
            message.user = user;
            return observer.next(message);
          })
        });
    });
  }

  private getUser(userId){
    return Observable.create(observer => {
      this.database.ref(`users/${userId}`)
        .once('value', data => {
          const user = data.val();
          return observer.next(user);
        });
    });
  }


}
