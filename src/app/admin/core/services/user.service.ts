import { Injectable } from "@angular/core";
import { User } from '../models/user';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: "root",
})
export class UserService extends Common {
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

  getUsers(dataTable: DataTable, filter): Observable<DataTable> {

    const param_filter = [];

    if (filter.name !== '') {
      param_filter.push({
        k: 'name',
        v: filter.name
      });
    }

    if (filter.email !== '') {
      param_filter.push({
        k: 'email',
        v: filter.email
      });
    }

    return this.http.get<DataTable>(this.baseUrl + 'user/' + dataTable.size + '/' + dataTable.pageNumber + '?f=' + JSON.stringify(param_filter), this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  addUser(user: User) {
    return this.http.post(this.baseUrl + 'user', user).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateUser(user: User, user_seq: Number) {
    return this.http.put(this.baseUrl + 'user/' + user_seq, user).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteUser(user_seq: Number) {
    return this.http.delete(this.baseUrl + 'user/' + user_seq).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
