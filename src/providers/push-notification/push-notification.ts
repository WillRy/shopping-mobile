import { Observable } from 'rxjs/Observable';
import { UserProfileHttp } from './../http/user-profile-http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { Platform } from 'ionic-angular/platform/platform';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { database } from 'firebase';
import { shareReplay } from 'rxjs/operators';

enum NotificationType {
  CHAT_GROUP_SUBSCRIBE = "1",
  NEW_MESSAGE = "2"
};

@Injectable()
export class PushNotificationProvider {

  private notification = merge<{background: boolean, data:any}>(
    this.fcm.onBackgroundMessage().pipe(
      map(data => ({background: true, data: data}))
    ),
    this.fcm.onMessage().pipe(
      map(data => ({background: false, data: data}))
    )
  ).pipe(shareReplay());
  // share replay para repetir mais de uma vez, pois ao dar subscribe em um, anula o outro - onChatGroupSubscribe e onNewMessage

  constructor(private fcm: FirebaseMessaging, private platform: Platform, private profileHttp: UserProfileHttp) {

  }

  registerToken(){
    if(this.platform.is('ios')){
      this.fcm.requestPermission().then(()=>{
        this.saveToken();
      });
    }
    if(this.platform.is('android')){
      this.saveToken();
    }
  }

  saveToken(){
    this.fcm.getToken().then((token) => {
      this.profileHttp.update({device_token: token}).subscribe(()=>{
        console.log('token registrado');
      })
    });
  }

  onChatGroupSubscribe(): Observable<{background: boolean, data:any}>{
    return Observable.create(observer => {
      this.notification.subscribe(data => {
        console.log("sub", data)
        if(data.data.type === NotificationType.CHAT_GROUP_SUBSCRIBE){
          observer.next(data);
        }
      });
    })
  }

  onNewMessage(): Observable<{background: boolean, data:any}>{
    return Observable.create(observer => {
      this.notification.subscribe(data => {
        console.log("Message", data);
        if(data.data.type === NotificationType.NEW_MESSAGE){
          observer.next(data);
        }
      });
    })
  }
}
