import {
  Injectable
} from '@angular/core';
import * as firebase from 'firebase';
// import * as firebaseui from 'firebaseui';
import scriptjs from 'scriptjs';
import firebaseConfig from '../../app/firebase-config';


declare const firebaseui;
( < any > window).firebase = firebase;

/*
  Generated class for the FirebaseAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAuthProvider {

  private ui;


  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  get firebase() {
    return firebase;
  }
  async makePhoneNumberForm(selectorElement: string) {
    await this.getFirebaseUI();

    return new Promise((resolve) => {

      const uiConfig = {
        signInOptions: [{
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // defaultCountry: navigator.language.slice(-2),
            defaultCountry: 'US'
          }
        ],
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {

            resolve(true);
            return false;
          }
        }
      };
     this.makeFormFirebaseUI('#firebase-ui', uiConfig);
    })





  }

  private makeFormFirebaseUI(selectorElement, uiConfig) {
    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start('#firebase-ui', uiConfig);
    } else {
      this.ui.delete().then(() => {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start('#firebase-ui', uiConfig);
      });
    }
  }

  private async getFirebaseUI() {
    return new Promise((resolve, reject) => {
      if (window.hasOwnProperty('firebaseui')) {
        resolve(firebaseui);
        return;
      }
      scriptjs('https://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui);
      });
    });

  }

   getUser(): Promise < firebase.User | null > {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return Promise.resolve(currentUser);
    }
    return new Promise((resolve, reject) => {
      const unsubscribe = this.firebase.auth().onAuthStateChanged(
        (user) => {
          resolve(user);
          unsubscribe();
        },
        (error) => {
          reject(error);
          unsubscribe();
        });
    });
  }

  async getToken(): Promise <any> {
    try {
      const user = await this.getUser();
      if(!user) {
        throw new Error('User not found');
      }
      const token = await user.getIdTokenResult();

      return token.token;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  getCurrentUser(): firebase.User | null {
    return this.firebase.auth().currentUser;
  }
}
