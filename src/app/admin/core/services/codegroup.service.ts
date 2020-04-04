import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Codegroup } from '../models/CodeGroup';

@Injectable({
  providedIn: 'root'
})
export class CodegroupService {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getCodegroups(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'codegroup/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  addCodegroup(codeGroup: Codegroup) {
    return this.http.post(this.baseUrl + 'codegroup', codeGroup).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCodegroup(codeGroup: Codegroup) {
    return this.http.put(this.baseUrl + 'codegroup', codeGroup).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCodegroup(codegroup_id: Codegroup) {
    return this.http.delete(this.baseUrl + 'codegroup/' + codegroup_id).pipe(
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
