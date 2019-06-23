import {
  LoginOptionsPage
} from './../../pages/login-options/login-options';
import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  AuthProvider
} from '../auth/auth';
import {
  App
} from 'ionic-angular/components/app/app';

/*
  Generated class for the RedirectIfNotAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RedirectIfNotAuthProvider {

  constructor(
    public http: HttpClient,
    private auth: AuthProvider,
    private app: App
  ) {
    console.log('Hello RedirectIfNotAuthProvider Provider');
  }

  ionViewCanEnter(): Promise < boolean > {
    return this.auth
      .isFullyAuth()
      .then(isAuth => {
        if (!isAuth) {
          setTimeout(() => {
            this.app.getRootNav().setRoot(LoginOptionsPage);
          })
        }

        return isAuth;
      })
  }
}
