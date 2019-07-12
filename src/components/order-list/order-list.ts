import { Component } from '@angular/core';
import { Order } from 'app/model';
import { OrderHttpProvider } from '../../providers/http/order-http';
import { InfiniteScroll, Refresher } from 'ionic-angular';

/**
 * Generated class for the OrderListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'order-list',
  templateUrl: 'order-list.html'
})
export class OrderListComponent {

  orders: { data: Order[] } = {
    data: []
  };

  page = 1;
  canMoreOrders = true;
  constructor(private orderHttp: OrderHttpProvider) {

  }

  ionViewDidLoad() {
    this.getOrders().subscribe(orders => {
      this.orders = orders;
    }, error => {
      console.log(error);
    })
  }

  getOrders() {
    return this.orderHttp.list(this.page);
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.page++;
    this.getOrders().subscribe(
      orders => {
        this.orders.data.push(...orders.data);
        if (!orders.data.length) {
          this.canMoreOrders = false;
        }
        infiniteScroll.complete();
      },
      error => {
        infiniteScroll.complete();
      }
    );
  }

  doRefresh(refresher: Refresher) {
    this.reset();
    this.getOrders().subscribe(
      orders => {
        this.orders = orders;
        refresher.complete();
      },
      error => refresher.complete()
    );
  }

  reset() {
    this.page = 1;
    this.canMoreOrders = true;
  }
}
