import { CustomerCreatePage } from './../customer-create/customer-create';
import {
  FirebaseAuthProvider
} from './../../providers/auth/firebase-auth';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import {
  AuthProvider
} from '../../providers/auth/auth';
import {
  MainPage
} from '../main/main';


/**
 * Generated class for the LoginPhoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider,
    private authService: AuthProvider,
    public loadingCtrl: LoadingController
  ) {

  }



  ionViewDidLoad() {

    const unsubscribe = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
      this.showLoading();
      if (user) {

        this.authService.login().subscribe(
          (token) => {
            this.dismissLoading();
            this.redirectToMainPage();

          },
          (error) => {

            this.dismissLoading();
            this.navCtrl.setRoot(CustomerCreatePage);
          });
        unsubscribe();
      } else {

        this.dismissLoading();
      }
    });
    this.firebaseAuth.makePhoneNumberForm('#firebaseui');
  }

  redirectToMainPage() {
    this.navCtrl.setRoot(MainPage);
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Por favor, aguarde!"
    });
    this.loader.present();
  }

  dismissLoading() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }


}
