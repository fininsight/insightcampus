import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Community } from '../models/community';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBoards(dataTable: DataTable): Observable<DataTable> {
    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'community/' + dataTable.size + '/' + dataTable.pageNumber)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getBoard(board_seq: number): Observable<Community> {
    return this.http.get<Community>(this.baseUrl + 'community/' + board_seq)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateTemplate(_community: Community) {
    return this.http.put(this.baseUrl + 'community/template', _community).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteBoard(board_seq: number) {
    return this.http.delete(this.baseUrl + 'community/' + board_seq)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  writeBoard(_community: Community) {
    return this.http.post(this.baseUrl + 'community', _community)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  increaseViewCount(_community: Community) {
    _community.view_count += 1;
    
    return this.http.put(this.baseUrl + 'community/view_count', _community).pipe(
      retry(1),
      catchError(this.errorHandl)
    )
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
