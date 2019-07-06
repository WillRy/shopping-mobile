import { ToastController } from 'ionic-angular';
import {
  MoreOptionsComponent
} from './../../components/more-options/more-options';
import {
  AudioRecorderProvider
} from '../../providers/audio-recorder/audio-recorder';
import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {
  ChatGroupListComponent
} from '../../components/chat-group-list/chat-group-list';
import {
  RedirectIfNotAuthProvider
} from '../../providers/redirect-if-not-auth/redirect-if-not-auth';
import {
  PushNotificationProvider
} from '../../providers/push-notification/push-notification';
import {
  FirebaseMessaging
} from '@ionic-native/firebase-messaging';
import {
  SuperTab,
  SuperTabs
} from 'ionic2-super-tabs';
import { ChatInvitationProvider } from '../../providers/chat-invitation/chat-invitation';
import { ProductListComponent } from '../../components/product-list/product-list';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  chatGroupList = ChatGroupListComponent;
  productList = ProductListComponent;
  canShowSearchBar = false;

  @ViewChild('tabChatGroupList')
  tabChatGroupList: SuperTab

  @ViewChild(SuperTabs)
  superTabs: SuperTabs

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private audioRecorder: AudioRecorderProvider,
    private redirectIfNotAuth: RedirectIfNotAuthProvider,
    private popover: PopoverController,
    private pushNotification: PushNotificationProvider,
    private fcm: FirebaseMessaging,
    private chatInvitation: ChatInvitationProvider,
    private toastCtrl: ToastController
  ) {}

  ionViewCanEnter() {
    return this.redirectIfNotAuth.ionViewCanEnter();
  }

  ionViewDidLoad() {
    this.pushNotification.registerToken();
    this.pushNotification.onNewMessage().subscribe(data => {
      if(data.background){
        const component: ChatGroupListComponent = this.tabChatGroupList.getViews()[0].instance;
        component.goToMessagesFromNotification(data.data.chat_group_id);
      }
    });

    this.pushNotification.onChatGroupSubscribe().subscribe(data => {
       const toast = this.toastCtrl.create({
         message: `Sua inscrição no grupo ${data.data.chat_group_name} foi aprovada`,
         duration: 7000
       });
       toast.present();
    });

    const hasPermissionToRecorder = this.audioRecorder.hasPermission;
    this.audioRecorder.requestPermission()
      .then((result) => {
        if (result && !hasPermissionToRecorder) {
          this.audioRecorder.showAlertToCloseApp();
        }
      });
      this.chatInvitation.requestInvitation();
  }

  presentMoreOptions(event) {
    const popover = this.popover.create(MoreOptionsComponent);
    popover.present({
      ev: event
    });
  }

  get canShowSearchIcon(){
    const superTab = this.superTabs.getActiveTab();
    return superTab.tabId === 'products';
  }

  onTabSelect(event){
    if(event.id !== "products"){
      this.canShowSearchBar = false;
    }
  }

}
