import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/*
  Generated class for the ProductSearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductSearchProvider {

  options = {
    orderBy: 'latest',
    categories: [],
    search: ''
  };

  onUpdate = new Subject<any>();

  constructor(public http: HttpClient) {
    console.log('Hello ProductSearchProvider Provider');
  }

}
