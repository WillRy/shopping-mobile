import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular";
import { ProductHttpProvider } from "../../providers/http/product-http";
import { Product, ProductPhoto } from "../../app/model";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-product-detail",
  templateUrl: "product-detail.html"
})
export class ProductDetailPage {

  productId: number;
  productData: {product: Product, photos: ProductPhoto[]};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productHttp: ProductHttpProvider,
    private modalCtrl: ModalController
  ) {
    this.productId = this.navParams.get('product');
  }

  ionViewWillEnter() {
    this.productHttp.get(this.productId).subscribe((product) => {
      this.productData = product;
    })
  }

  openPhotos(){
    this.navCtrl.push('ProductPhotosPage', {product_data: this.productData});
  }

  openOrderStore(){
    if(this.productData){
      const modal = this.modalCtrl.create('OrderStorePage', {product: this.productData.product});
      modal.onWillDismiss(result => {
        if(result){
          this.navCtrl.push('OrderDetailPage', {order: result});
        }
      });
      modal.present();
    }
  }
}
