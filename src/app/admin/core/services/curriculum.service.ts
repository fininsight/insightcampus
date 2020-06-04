import { Injectable } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCurriculums(dataTable: DataTable): Observable<DataTable> {
    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'curriculum/' + 
                                    + dataTable.size + '/' + dataTable.pageNumber)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getCurriculum(curriculumSeq: number) {
    return this.http.get<DataTable>(this.baseUrl + 'curriculum/' + 
                                    + curriculumSeq)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addCurriculum(curriculum: Curriculum) {
    return this.http.post(this.baseUrl + 'curriculum', curriculum).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCurriculum(curriculum: Curriculum) {
    return this.http.put(this.baseUrl + 'curriculum', curriculum).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCurriculum(curriculumSeq: number) {
    return this.http.delete(this.baseUrl + 'curriculum/' + curriculumSeq).pipe(
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