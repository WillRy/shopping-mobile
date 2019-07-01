import { FirebaseDynamicLinks, IDynamicLink } from '@ionic-native/firebase-dynamic-links';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const CHAT_GROUP_INVITATION_SLUG = 'chat_group_invitation_slug';
@Injectable()
export class ChatInvitationProvider {

  constructor(public fbDynamicLinks: FirebaseDynamicLinks) {

  }

  listen(){
    this.fbDynamicLinks.onDynamicLink().subscribe((res: IDynamicLink) => {
      this.saveInStorage(res.deepLink);
    });
  }

  private getInvitationSlugFromLink(deepLink: string){
    const deepLinkFirstPart = deepLink.split('&')[0];
    return deepLinkFirstPart.substr(deepLinkFirstPart.lastIndexOf('/')+1, deepLinkFirstPart.length);
  }

  private saveInStorage(deepLink: string){
    this.slug = this.getInvitationSlugFromLink(deepLink);
  }

  private get slug(){
    return window.localStorage.getItem(CHAT_GROUP_INVITATION_SLUG);
  }

  private set slug(value){
   value ? window.localStorage.setItem(CHAT_GROUP_INVITATION_SLUG, value) : window.localStorage.removeItem(CHAT_GROUP_INVITATION_SLUG);
  }

}
