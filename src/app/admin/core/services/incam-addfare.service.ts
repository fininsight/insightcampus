import { Injectable } from '@angular/core';
import { IncamAddfare } from '../models/incam-addfare';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';


@Injectable({
  providedIn: 'root'
})
export class IncamAddfareService extends Common{

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { 
    super();
  }

  getIncamAddfares(dataTable: DataTable): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamaddfare/' +
                                    + dataTable.size + '/' + dataTable.pageNumber, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getIncamAddfare(dataTable: DataTable, addfareSeq: number): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamaddfare/' + addfareSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addIncamAddfare(incamaddfare: IncamAddfare) {
    return this.http.post(this.baseUrl + 'incamaddfare', incamaddfare, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateIncamAddfare(incamaddfare: IncamAddfare) {
    return this.http.put(this.baseUrl + 'incamaddfare', incamaddfare, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteIncamAddfare(addfareSeq: number) {
    return this.http.delete(this.baseUrl + 'incamaddfare/' + addfareSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getFamilyIncamAddfare(dataTable: DataTable): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamaddfare/family/' +
                                    + dataTable.size + '/' + dataTable.pageNumber, this.jwt())
    .pipe(
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
