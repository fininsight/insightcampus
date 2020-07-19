import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Codegroup } from '../models/codegroup';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class CodegroupService extends Common {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getCodegroups(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'codegroup/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText,
              this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  addCodegroup(codeGroup: Codegroup) {
    return this.http.post(this.baseUrl + 'codegroup', codeGroup, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCodegroup(codeGroup: Codegroup) {
    return this.http.put(this.baseUrl + 'codegroup', codeGroup, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCodegroup(codegroup_id: string) {
    return this.http.delete(this.baseUrl + 'codegroup/' + codegroup_id, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
