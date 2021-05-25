import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends Common {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getStudent(classSeq: number, dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'classstudent/' + classSeq + '/'
                                    + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText,
                                    this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  sendCertification(classSeq: Number, orderUserSeq: Number) {
    return this.http.post(this.baseUrl + 'classstudent/sendcertification/' + classSeq + '/' + orderUserSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
