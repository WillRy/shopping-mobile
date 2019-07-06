import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "@app/env";
import { Product } from "../../app/model";
import { AuthProvider } from "../../providers/auth/auth";
import { ProductSearchProvider } from "../../providers/product-search/product-search";

@Injectable()
export class ProductHttpProvider{
  private baseUrl = `${environment.api.url}/open/products`;

  constructor(
    private http: HttpClient,
    private authService: AuthProvider,
    private productSearchProvider: ProductSearchProvider
    ) {}

  list(
    page: Number
  ): Observable<{ data: Array<Product>; meta: any }> {
    const fromObject = {
      page,
      'categories[]': this.productSearchProvider.options.categories,
      sort: this.productSearchProvider.options.orderBy === 'latest' ? '-created_at' : 'created_at',
      search: this.productSearchProvider.options.search,
    };
    const params = new HttpParams({fromObject:(<any>fromObject)});
    return this.http.get<{ data: Array<Product>; meta: any }>(this.baseUrl, {params});
  }


}
