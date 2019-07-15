import { MoreOptionsComponent } from './../components/more-options/more-options';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseAuthProvider } from '../providers/auth/firebase-auth';
import { AuthProvider } from '../providers/auth/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerHttpProvider } from '../providers/http/customer-http';
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
import { RefreshTokenInterceptor } from '../providers/auth/refresh-token-interceptor';
import { RedirectIfNotAuthProvider } from '../providers/redirect-if-not-auth/redirect-if-not-auth';
import { FirebaseMessaging } from '@ionic-native/firebase-messaging';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';
import { UserProfileHttp } from '../providers/http/user-profile-http';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links';
import { ChatInvitationProvider } from '../providers/chat-invitation/chat-invitation';
import { ProductHttpProvider } from '../providers/http/product-http';
import { ProductSearchProvider } from '../providers/product-search/product-search';
import { CategoryHttpProvider } from '../providers/http/category-http';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ProductPhotosPage } from '../pages/product-photos/product-photos';
import { OrderHttpProvider } from '../providers/http/order-http';
import { OrderStorePage } from '../pages/order-store/order-store';

import { Clipboard } from '@ionic-native/clipboard';
import { SuperTabsModule } from 'ionic2-super-tabs';

export function jwtFactory(authProvider: AuthProvider) {
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
    MoreOptionsComponent,
    ProductDetailPage,
    ProductPhotosPage,
    OrderStorePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtFactory,
        deps: [AuthProvider]
      }
    }),
    SuperTabsModule.forRoot(),
    PipesModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MoreOptionsComponent,
    ProductDetailPage,
    ProductPhotosPage,
    OrderStorePage,

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
    UserProfileHttp,
    FirebaseDynamicLinks,
    ChatInvitationProvider,
    ProductHttpProvider,
    ProductSearchProvider,
    CategoryHttpProvider,
    OrderHttpProvider,
    Clipboard
  ]
})
export class AppModule {}
