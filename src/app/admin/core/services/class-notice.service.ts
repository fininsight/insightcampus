import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { DataTable } from "../models/datatable";
import { map, retry, catchError } from "rxjs/operators";
import { ClassNotice } from "../models/class-notice";
import { Common } from './common';

@Injectable({
  providedIn: "root",
})
export class ClassNoticeService extends Common {
  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  getClassNotices(dataTable: DataTable, class_seq: number): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'classnotice/' + class_seq + '/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  getAllClassNotices(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'classnotice/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }
}

