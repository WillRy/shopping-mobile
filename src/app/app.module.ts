import { MoreOptionsComponent } from './../components/more-options/more-options';
import { FirebasePhoneNumberCheckComponent } from './../components/firebase-phone-number-check/firebase-phone-number-check';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SuperTabsModule } from "ionic2-super-tabs";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from './../pages/main/main';
import { ResetPhoneNumberPage } from './../pages/reset-phone-number/reset-phone-number';
import { LoginPhoneNumberPage } from './../pages/login-phone-number/login-phone-number';
import { LoginOptionsPage } from './../pages/login-options/login-options';
import { CustomerCreatePage } from '../pages/customer-create/customer-create';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { AuthProvider } from '../providers/auth/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerHttpProvider } from '../providers/http/customer-http';
import { ChatGroupListComponent } from '../components/chat-group-list/chat-group-list';
import { ChatMessageHttpProvider } from '../providers/http/chat-messag-http';
import {environment} from '@app/env';
import {Media} from "@ionic-native/media";
import {File} from '@ionic-native/file';
import { ChatGroupFbProvider } from '../providers/firebase/chat-group-fb';
import { PipesModule } from '../pipes/pipes.module';
import { ChatGroupViewerProvider } from '../providers/chat-group-viewer/chat-group-viewer';
import { DirectivesModule } from '../directives/directives.module';
import { StoragePermissionProvider } from '../providers/storage-permission/storage-permission';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AudioRecorderProvider } from '../providers/audio-recorder/audio-recorder';
import { SelectCountriesCodeComponent } from '../components/select-countries-code/select-countries-code';
import { RefreshTokenInterceptor } from '../providers/auth/refresh-token-interceptor';
import { RedirectIfNotAuthProvider } from '../providers/redirect-if-not-auth/redirect-if-not-auth';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';
import { UserProfileHttp } from '../providers/http/user-profile-http';

function jwtFactory(authProvider: AuthProvider) {
  return {
    tokenGetter: () => {
      return authProvider.getToken();
    },
    whitelistedDomains: [
      new RegExp(`${environment.api.host}`),
      new RegExp('http://localhost:8000')
    ]
  };
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthProvider]
      }
    }),
    PipesModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    MoreOptionsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,
    CustomerHttpProvider,
    ChatMessageHttpProvider,
    Media,
    File,
    ChatGroupFbProvider,
    ChatGroupViewerProvider,
    StoragePermissionProvider,
    AudioRecorderProvider,
    Diagnostic,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
  },
    RedirectIfNotAuthProvider,
    FirebaseMessaging,
    PushNotificationProvider,
    UserProfileHttp
  ]
})
export class AppModule {}
