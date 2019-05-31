import { AuthProvider } from './../../providers/auth/auth';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the IsCurrentUserPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'isCurrentUser',
})
export class IsCurrentUserPipe implements PipeTransform {

  constructor(private auth: AuthProvider) {

  }
  transform(value: string, ...args) {
    return this.auth.me.profile.firebase_uid === value;
  }
}
