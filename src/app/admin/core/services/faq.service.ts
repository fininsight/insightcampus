import { Injectable } from '@angular/core';
import { Faq } from '../models/faq';
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
export class FaqService extends Common {
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

   getFaqs(dataTable: DataTable): Observable<DataTable> {

     let searchText = '';

     if (dataTable.search != null) {
       searchText = JSON.stringify(dataTable.search);
       searchText = '/' + encodeURI(searchText);
     }

     return this.http.get<DataTable>(this.baseUrl + 'faq/' + dataTable.size + '/' + dataTable.pageNumber + searchText, this.jwt())
       .pipe(
         retry(1),
         catchError(this.errorHandl)
     );

   }

  getFaq(dataTable: DataTable, faqSeq: number): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'faq/' + faqSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  searchFaq(searchText: string): Observable<Array<Faq>> {

    if (searchText === '') {
      searchText = 'ALL';
    }
    return this.http.get<Array<Faq>>(this.baseUrl + 'faq/search/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addFaq(faq: Faq) {
    return this.http.post(this.baseUrl + 'faq', faq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateFaq(faq: Faq) {
    return this.http.put(this.baseUrl + 'faq', faq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteFaq(faqSeq: number) {
    return this.http.delete(this.baseUrl + 'faq/' + faqSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
