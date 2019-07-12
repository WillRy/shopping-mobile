import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Order, OrderStatus } from '../../app/model';
import { OrderHttpProvider } from '../../providers/http/order-http';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  order: Order;
  STATUS_ENUM = OrderStatus;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private orderHttp: OrderHttpProvider,
    private toastCtrl: ToastController
    ) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {

  }


  cancel(){
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    this.orderHttp.cancel(this.order.id).subscribe((order) => {
      this.order = order;
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: "Pedido cancelado com sucesso",
        duration: 7000
      });
      toast.present();
    },
    error => {
      loader.dismiss();
    })
  }

}
