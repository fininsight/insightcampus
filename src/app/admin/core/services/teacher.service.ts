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


   getTeachers(dataTable: DataTable): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'teacher/' +
                                    + dataTable.size + '/' + dataTable.pageNumber, this.jwt())
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
