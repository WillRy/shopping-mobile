import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@app/env";
import { Category, Order } from "../../app/model";
import { map } from "rxjs/operators/map";

@Injectable()
export class OrderHttpProvider {
  private baseUrl = `${environment.api.url}/open/orders`;

  constructor(
    private http: HttpClient
  ) {}

  list(page: Number): Observable < {data: Array<Order>, meta: any} > {
    const fromObject = {
      page
    };
    const params = new HttpParams({fromObject:(<any>fromObject)});

    return this.http.get < {data: Array<Order>, meta: any} > (this.baseUrl, {
      params
    });
  }

  get(id: number): Observable<Order>{
    return this.http.get < {data: Order} > (`${this.baseUrl}/${id}`).pipe(
      map(
        response => response.data
      )
    );
  }
}