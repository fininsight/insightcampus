import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Common } from './common';


@Injectable({
  providedIn: "root",
})
export class UserService extends Common {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'user/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText)
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
