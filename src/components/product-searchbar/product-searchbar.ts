import { Component, EventEmitter, Output } from '@angular/core';
import { ProductSearchProvider } from '../../providers/product-search/product-search';


@Component({
  selector: 'product-searchbar',
  templateUrl: 'product-searchbar.html'
})
export class ProductSearchbarComponent {

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(public productSearch: ProductSearchProvider) {

  }

  filter(){
    this.productSearch.onUpdate.next(true);
  }

  back(){
    this.onBack.emit(true);
  }
}
