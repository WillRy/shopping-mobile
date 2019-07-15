import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
  selector: 'more-options',
  templateUrl: 'more-options.html'
})
export class MoreOptionsComponent {



  constructor(private auth: AuthProvider, private app: App, private viewCtrl: ViewController) {

  }

  logout(){
    this.auth.logout().subscribe(()=>{
      this.viewCtrl.dismiss();
      this.app.getRootNav().setRoot('LoginOptionsPage');
    }, (error)=> console.log(error))
  }

}
