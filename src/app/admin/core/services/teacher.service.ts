import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class TeacherService extends Common {
  [x: string]: any;

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {
    super();
   }

   getUserId() {
    const token: string = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
   }

   getTeacherExcel(filter) {

    const param_filter = [];

    if (filter.name !== '') {
      param_filter.push({
        k: 'name',
        v: filter.name
      });
    }

    const postData = new FormData();
    const xhr = new XMLHttpRequest();
    const token = localStorage.getItem('token');
    xhr.open('GET', this.baseUrl + 'teacher/excel' + '?f=' + JSON.stringify(param_filter), true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.responseType = 'blob';
    xhr.onload = (e) => {
      const downloadUrl = URL.createObjectURL(xhr.response);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = downloadUrl;
      a.download = '강사관리.xlsx';
      a.click();
    };
    xhr.send(postData);
  }

   getTeachers(dataTable: DataTable, filter): Observable<DataTable> {
     
    const param_filter = [];

    if (filter.name !== '') {
      param_filter.push({
        k: 'name',
        v: filter.name
      });
    }

    return this.http.get<DataTable>(this.baseUrl + 'teacher/' +
                                    + dataTable.size + '/' + dataTable.pageNumber + '?f=' + JSON.stringify(param_filter), this.jwt())

    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getTeacher(dataTable: DataTable, teacherSeq: number): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'teacher/' + teacherSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  searchTeacher(searchText: string): Observable<Array<Teacher>> {

    if (searchText === '') {
      searchText = 'ALL';
    }
    return this.http.get<Array<Teacher>>(this.baseUrl + 'teacher/search/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addTeacher(teacher: Teacher) {
    return this.http.post(this.baseUrl + 'teacher', teacher, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateTeacher(teacher: Teacher) {
    return this.http.put(this.baseUrl + 'teacher', teacher, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteTeacher(teacherSeq: number) {
    return this.http.delete(this.baseUrl + 'teacher/' + teacherSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
