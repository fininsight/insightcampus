import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { OrderData } from '../models/order-data';
import { Common } from './common';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends Common {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  getOrdersFilter(dataTable: DataTable, filter): Observable<DataTable> {

    const param_filter = [];

    if (filter.order_type !== '') {
      param_filter.push({
        k: 'order_type',
        v: filter.class_nm
      });
    }

    if (filter.address !== '') {
      param_filter.push({
        k: 'address',
        v: filter.teacher
      });
    }

    return this.http.get<DataTable>(this.baseUrl + 'order/'
                                    + dataTable.size + '/' + dataTable.pageNumber + '?f=' + JSON.stringify(param_filter), this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getOrders(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'order/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  getOrderItems(order_id: Number) {
    return this.http.get<Array<OrderItem>>(this.baseUrl + 'orderitem/' + order_id, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addOrder(orders: OrderData) {
    return this.http.post(this.baseUrl + 'order', orders, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateOrder(orders: OrderData, order_id: Number) {
    return this.http.put(this.baseUrl + 'order/' + order_id, orders, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteOrder(order_id: Number) {
    return this.http.delete(this.baseUrl + 'order/' + order_id, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
}
