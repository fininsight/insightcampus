import { Injectable } from '@angular/core';
import { FinWorkDetail } from '../models/fin-work-detail';
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
export class FinWorkDetailService extends Common {
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

   getFinWorkDetails(dataTable: DataTable): Observable<DataTable> {

     let searchText = '';

     if (dataTable.search != null) {
       searchText = JSON.stringify(dataTable.search);
       searchText = '/' + encodeURI(searchText);
     }

     return this.http.get<DataTable>(this.baseUrl + 'finworkdetail/' + dataTable.size + '/' + dataTable.pageNumber + searchText, this.jwt())
       .pipe(
         retry(1),
         catchError(this.errorHandl)
     );

   }

  getFinWorkDetail(dataTable: DataTable, workSeq: number): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'finworkdetail/' + workSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addFinWorkDetail(finWorkDetail: FinWorkDetail) {
    return this.http.post(this.baseUrl + 'finworkdetail', finWorkDetail, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateFinWorkDetail(finWorkDetail: FinWorkDetail) {
    return this.http.put(this.baseUrl + 'finworkdetail', finWorkDetail, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteFinWorkDetail(workSeq: number) {
    return this.http.delete(this.baseUrl + 'finworkdetail/' + workSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
