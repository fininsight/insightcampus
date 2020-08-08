import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { DataTable } from "../models/datatable";
import { map, retry, catchError } from "rxjs/operators";
import { ClassQna } from "../models/class-qna";
import { Common } from './common';

@Injectable({
  providedIn: "root",
})
export class ClassQnaService extends Common {

  constructor(private http: HttpClient) {
    super();
  }

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getClassQnaes(dataTable: DataTable, class_seq: number): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'classqna/' + class_seq + '/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  addQna(qna: ClassQna) {
    return this.http.post(this.baseUrl + 'classqna', qna).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
}
