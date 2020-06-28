import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Code } from '../models/code';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) {
  }

  getCode(dataTable: DataTable, codegroupId: string): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'code/' + codegroupId + '/'
                                    + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addCode(code: Code) {
    return this.http.post(this.baseUrl + 'code', code).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCode(code: Code) {
    return this.http.put(this.baseUrl + 'code', code).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCode(codegroup_id: string, code_id: string) {
    return this.http.delete(this.baseUrl + 'code/' + codegroup_id + '/' + code_id).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
