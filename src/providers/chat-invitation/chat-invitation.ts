import { AuthProvider } from './../auth/auth';
import { environment } from "@app/env";

import {
  FirebaseDynamicLinks,
  IDynamicLink
} from "@ionic-native/firebase-dynamic-links";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "ionic-angular";

const CHAT_GROUP_INVITATION_SLUG = "chat_group_invitation_slug";
@Injectable()
export class ChatInvitationProvider {
  constructor(
    public fbDynamicLinks: FirebaseDynamicLinks,
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private auth: AuthProvider
  ) {}

  listen() {
    this.fbDynamicLinks.onDynamicLink().subscribe((res: IDynamicLink) => {
      this.saveInStorage(res.deepLink);
      // chama o metodo, pois pode haver a possibilidade de abrir um link com o app aberto
      this.requestInvitationIfAuth();
    });
  }

  private requestInvitationIfAuth(){
    this.auth.isAuth().then(isAuth => {
      if(isAuth){
        this.requestInvitation();
      }
    })
  }

  // executa somente uma vez, ao ser aberto o app, por isso o requestInvitationIfAuth existe
  requestInvitation() {
    if (!this.slug) {
      return;
    }
    const loader = this.loadCtrl.create({
      content: "Ingressando no grupo..."
    });
    loader.present();
    const slug = this.slug;
    this.slug = null;
    this.http
      .post(`${environment.api.url}/chat_invitations/${slug}`, {})
      .subscribe(
        res => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message:'Inscrição aceita, espere um Administrador aceitar seu convite',
            duration:3000
          });
          toast.present();
        },
        error => {
          loader.dismiss();
          let message = 'Não foi possível ingressar no grupo';
          if(error.status == 403 || error.status == 422){
            message = error.error.message;
          }
          const toast = this.toastCtrl.create({
            message: message,
            duration:3000
          });
          toast.present();
        }
      );
  }

  private getInvitationSlugFromLink(deepLink: string) {
    const deepLinkFirstPart = deepLink.split("&")[0];
    return deepLinkFirstPart.substr(
      deepLinkFirstPart.lastIndexOf("/") + 1,
      deepLinkFirstPart.length
    );
  }

  private saveInStorage(deepLink: string) {
    this.slug = this.getInvitationSlugFromLink(deepLink);
    console.log(this.slug);
  }

  private get slug() {
    return window.localStorage.getItem(CHAT_GROUP_INVITATION_SLUG);
  }

  private set slug(value) {
    value
      ? window.localStorage.setItem(CHAT_GROUP_INVITATION_SLUG, value)
      : window.localStorage.removeItem(CHAT_GROUP_INVITATION_SLUG);
  }
}
