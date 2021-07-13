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

export class ClassService extends Common {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  getClassesFilter(dataTable: DataTable, filter): Observable<DataTable> {

    const param_filter = [];

    if (filter.class_nm !== '') {
      param_filter.push({
        k: 'class_nm',
        v: filter.class_nm
      });
    }

    if (filter.teacher !== '') {
      param_filter.push({
        k: 'teacher',
        v: filter.teacher
      });
    }

    if (filter.online_yn !== '') {
      param_filter.push({
        k: 'online_yn',
        v: filter.online_yn
      });
    }

    console.log(param_filter);

    return this.http.get<DataTable>(this.baseUrl + 'class/'
                                    + dataTable.size + '/' + dataTable.pageNumber + '?f=' + JSON.stringify(param_filter))
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getClasses(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'class/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  addClass(classes: Class) {
    return this.http.post(this.baseUrl + 'class', classes, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateClass(classes: Class, class_seq: Number) {
    return this.http.put(this.baseUrl + 'class/' + class_seq, classes, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateThumbnail(_file: File) {
    const formData = new FormData();
    formData.append('file', _file);
    return this.http.post(this.baseUrl + 'class/thumbnail', formData).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteClass(class_seq: Number) {
    return this.http.delete(this.baseUrl + 'class/' + class_seq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
}
