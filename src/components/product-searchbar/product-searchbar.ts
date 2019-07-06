import { Component, EventEmitter, Output } from '@angular/core';
import { ProductSearchProvider } from '../../providers/product-search/product-search';
import { ModalController } from 'ionic-angular';
import { ProductSearchOptionsComponent } from '../product-search-options/product-search-options';


@Component({
  selector: 'product-searchbar',
  templateUrl: 'product-searchbar.html'
})
export class ProductSearchbarComponent {

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public productSearch: ProductSearchProvider,
    private modalCtrl: ModalController
    ) {

  }

  filter(){
    this.productSearch.onUpdate.next(true);
  }

  back(){
    this.onBack.emit(true);
  }

  openProductSearchOptions(){
   const modal = this.modalCtrl.create(ProductSearchOptionsComponent);
   modal.present();
  }
}
