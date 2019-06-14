import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const CAN_WRITE_IN_SOTRAGE = 'can_write_in_storage';
@Injectable()
export class StoragePermissionProvider {

  constructor(public diagnostic: Diagnostic, private platform: Platform) {

  }

  requestPermission(): Promise<boolean>{
    return new Promise((resolve,reject) => {
      if(this.platform.is('android') &&  !this.canWriteInStorage){
        this.platform.ready().then(() => {
          this.diagnostic.requestExternalStorageAuthorization()
          .then((result) => {
            this.canWriteInStorage = result === 'GRANTED';
            resolve(this.canWriteInStorage);
          });
        });
      }else{
        this.canWriteInStorage = true;
        resolve(this.canWriteInStorage);
      }
    });
  }

  get canWriteInStorage(): boolean{
    const canWriteInStorage = window.localStorage.getItem(CAN_WRITE_IN_SOTRAGE);
    return canWriteInStorage === 'true';
  }

  set canWriteInStorage(value){
    window.localStorage.setItem(CAN_WRITE_IN_SOTRAGE, value ? 'true' : 'false');
  }

}
