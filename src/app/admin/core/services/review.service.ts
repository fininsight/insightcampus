import { Injectable } from '@angular/core';
import { Review } from '../models/class_review';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends Common {
  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    super();
   }

  getClassReview(dataTable: DataTable, classSeq: number): Observable<DataTable> {
    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'classreview/' + classSeq + "/" +
                                    + dataTable.size + '/' + dataTable.pageNumber)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
