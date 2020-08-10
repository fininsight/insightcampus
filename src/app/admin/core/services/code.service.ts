import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Code } from '../models/code';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class CodeService extends Common {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getCode(dataTable: DataTable, codegroupId: string): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'code/' + codegroupId + '/'
                                    + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText,
                                    this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getCodes(codegroupId: string): Observable<Array<Code>> {

    return this.http.get<Array<Code>>(this.baseUrl + 'code/' + codegroupId, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addCode(code: Code) {
    return this.http.post(this.baseUrl + 'code', code, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCode(code: Code) {
    return this.http.put(this.baseUrl + 'code', code, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCode(codegroup_id: string, code_id: string) {
    return this.http.delete(this.baseUrl + 'code/' + codegroup_id + '/' + code_id, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
