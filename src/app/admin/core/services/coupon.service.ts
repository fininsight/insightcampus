import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class CouponService extends Common {
  [x: string]: any;

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {
    super();
   }

   getUserId() {
    const token: string = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
   }

   getCoupons(dataTable: DataTable): Observable<DataTable> {

     let searchText = '';

     if (dataTable.search != null) {
       searchText = JSON.stringify(dataTable.search);
       searchText = encodeURI(searchText);
     }

     return this.http.get<DataTable>(this.baseUrl + 'coupon/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText, this.jwt())
       .pipe(
         retry(1),
         catchError(this.errorHandl)
     );

   }

  getCoupon(dataTable: DataTable, couponSeq: number): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'coupon/' + couponSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  searchCoupon(searchText: string): Observable<Array<Coupon>> {

    if (searchText === '') {
      searchText = 'ALL';
    }
    return this.http.get<Array<Coupon>>(this.baseUrl + 'coupon/search/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addCoupon(coupon: Coupon) {
    return this.http.post(this.baseUrl + 'coupon', coupon, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCoupon(coupon: Coupon) {
    return this.http.put(this.baseUrl + 'coupon', coupon, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCoupon(couponSeq: number) {
    return this.http.delete(this.baseUrl + 'coupon/' + couponSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
