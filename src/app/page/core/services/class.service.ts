import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Class } from '../models/class';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class ClassService extends Common{

  baseUrl = environment.apiUrl;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };


  constructor(private http: HttpClient) {
    super();
  }

  getClasses(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'class/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getClass(class_seq: number): Observable<Class> {
    return this.http.get<Class>(this.baseUrl + 'class/' + class_seq)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  updateTemplate(_class: Class) {
    return this.http.put(this.baseUrl + 'class/template', _class, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateThumbnail(class_seq: number, _file: File) {
    const formData = new FormData();
    formData.append('file', _file);
    return this.http.put(this.baseUrl + 'class/thumbnail/' + class_seq, formData, this.jwt()).pipe(
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
