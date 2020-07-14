import { Injectable } from '@angular/core';
import { IncamAddfare } from '../models/incam-addfare';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncamAddfareService {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getIncamAddfares(dataTable: DataTable): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamaddfare/' +
                                    + dataTable.size + '/' + dataTable.pageNumber)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getIncamAddfare(dataTable: DataTable, addfareSeq: number) : Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamaddfare/' + addfareSeq)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addIncamAddfare(incamaddfare: IncamAddfare) {
    return this.http.post(this.baseUrl + 'incamaddfare', incamaddfare).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateIncamAddfare(incamaddfare: IncamAddfare) {
    return this.http.put(this.baseUrl + 'incamaddfare', incamaddfare).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteIncamAddfare(addfareSeq: number) {
    return this.http.delete(this.baseUrl + 'incamaddfare/' + addfareSeq).pipe(
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