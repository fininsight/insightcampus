import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { DataTable } from "../models/datatable";
import { map, retry, catchError } from "rxjs/operators";
import { Review } from "../models/class_review";
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class ClassReviewService extends Common {

  constructor(private http: HttpClient) {
    super();
  }

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getClassReviews(dataTable: DataTable, class_seq: number): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'classreview/' + class_seq + '/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  addReview(review: Review) {
    return this.http.post(this.baseUrl + 'classreview', review).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateReview(review: Review, class_seq: Number) {
    return this.http.put(this.baseUrl + 'classreview/' + class_seq, review).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteReview(seq: Number) {
    return this.http.delete(this.baseUrl + 'classreview/' + seq).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
