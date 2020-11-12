import { Injectable } from '@angular/core';
import { WpboardNotice } from '../models/wpboardnotice';
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
export class WpboardNoticeService extends Common {
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

   getWpboardNotices(dataTable: DataTable): Observable<DataTable> {

     let searchText = '';

     if (dataTable.search != null) {
       searchText = JSON.stringify(dataTable.search);
       searchText = '/' + encodeURI(searchText);
     }

     return this.http.get<DataTable>(this.baseUrl + 'wpboardnotice/' + dataTable.size + '/' + dataTable.pageNumber + searchText, this.jwt())
       .pipe(
         retry(1),
         catchError(this.errorHandl)
     );

  }

  getWpboardNoticeLibrarys(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = '/' + encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'wpboardnotice/library/' + dataTable.size + '/' + dataTable.pageNumber + searchText, this.jwt())
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );

  }

  getWpboardNoticeReviews(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = '/' + encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'wpboardnotice/review/' + dataTable.size + '/' + dataTable.pageNumber + searchText, this.jwt())
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );

  }

  searchWpboardNotice(searchText: string): Observable<Array<WpboardNotice>> {

    if (searchText === '') {
      searchText = 'ALL';
    }
    return this.http.get<Array<WpboardNotice>>(this.baseUrl + 'wpboardnotice/search/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
