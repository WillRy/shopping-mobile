import {
  ChatGroup,
  ChatMessage} from './../../app/model';
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
export class ChatGMessageFbProvider {

  database;

  constructor(
    public http: HttpClient,
    private firebaseAuth: FirebaseAuthProvider  ) {
    this.database = this.firebaseAuth.firebase.database();
  }

  latest(group: ChatGroup, limit: number) {
    return Observable.create(observer => {
      this.database.ref(`chat_groups_messages/${group.id}/messages`)
        .orderByKey()
        .limitToLast(limit)
        .once('value', (data) => {
          const messages = [];
          data.forEach(child => {
            const message = child.val() as ChatMessage;
            message.user$ = this.getUser(message.user_id);
            messages.push(message);
          });
          observer.next(messages);
        });
    });
  }


  // onAdded(): Observable < ChatGroup > {
  //   return Observable.create((observer) => {
  //     this.database.ref('chat_groups')
  //       .orderByChild('created_at')
  //       .startAt(Date.now())
  //       .on('child_added',
  //         (data) => {
  //           const group = data.val() as ChatGroup;
  //           group.is_member = this.getMember(group);
  //           group.last_message = this.getLastMessage(group);
  //           observer.next(group);
  //         },
  //         (error) => {
  //           console.log(error);
  //         });
  //   });
  // }

  // onChanged(): Observable < ChatGroup > {
  //   return Observable.create((observer) => {
  //     this.database.ref('chat_groups')
  //       .once('child_changed',
  //         (data) => {
  //           const group = data.val() as ChatGroup;
  //           group.is_member = this.getMember(group);
  //           group.last_message = this.getLastMessage(group);
  //           observer.next(group);
  //         },
  //         (error) => {
  //           console.log(error);
  //         });
  //   });
  // }

  private getUser(userId): Observable < {name: string, photo_url: string} >{
    return Observable.create(observer => {
      this.database.ref(`users/${userId}`)
        .once('value', data => {
          const user = data.val();
          return observer.next(user);
        });
    });
  }


}
