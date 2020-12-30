import { Injectable } from '@angular/core';
import { FinWork } from '../models/fin-work';
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
export class FinWorkService extends Common {
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

   getFinWorks(dataTable: DataTable): Observable<DataTable> {

     let searchText = '';

     if (dataTable.search != null) {
       searchText = JSON.stringify(dataTable.search);
       searchText = '/' + encodeURI(searchText);
     }

     return this.http.get<DataTable>(this.baseUrl + 'finwork/' + dataTable.size + '/' + dataTable.pageNumber + searchText, this.jwt())
       .pipe(
         retry(1),
         catchError(this.errorHandl)
     );

   }

  getFinWork(dataTable: DataTable, workSeq: number): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'finwork/' + workSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  searchFinWork(searchText: string): Observable<Array<FinWork>> {

    if (searchText === '') {
      searchText = 'ALL';
    }
    return this.http.get<Array<FinWork>>(this.baseUrl + 'finwork/search/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addFinWork(finWork: FinWork) {
    return this.http.post(this.baseUrl + 'finwork', finWork, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateFinWork(finWork: FinWork) {
    return this.http.put(this.baseUrl + 'finwork', finWork, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteFinWork(workSeq: number) {
    return this.http.delete(this.baseUrl + 'finwork/' + workSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
