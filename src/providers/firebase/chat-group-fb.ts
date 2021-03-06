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
    return Observable.create(observer => {
      this.database.ref('chat_groups')
        .orderByChild('updated_at')
        .once('value', (data) => {
          const groups = [];
          data.forEach(child => {
            const group = child.val() as ChatGroup;
            group.is_member = this.getMember(group);
            group.last_message = this.getLastMessage(group);
            groups.unshift(group);
          });
          observer.next(groups);
        });
    });
  }


  onAdded(): Observable < ChatGroup > {
    return Observable.create((observer) => {
      this.database.ref('chat_groups')
        .orderByChild('created_at')
        .startAt(Date.now())
        .on('child_added',
          (data) => {
            const group = data.val() as ChatGroup;
            group.is_member = this.getMember(group);
            group.last_message = this.getLastMessage(group);
            observer.next(group);
          },
          (error) => {
            console.log(error);
          });
    });
  }

  onChanged(): Observable < ChatGroup > {
    return Observable.create((observer) => {
      this.database.ref('chat_groups')
        .once('child_changed',
          (data) => {
            const group = data.val() as ChatGroup;
            group.is_member = this.getMember(group);
            group.last_message = this.getLastMessage(group);
            observer.next(group);
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

  private getUser(userId) {
    return Observable.create(observer => {
      this.database.ref(`users/${userId}`)
        .once('value', data => {
          const user = data.val();
          return observer.next(user);
        });
    });
  }


}
