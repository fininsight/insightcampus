import { Injectable } from '@angular/core';
import { Curriculum } from '../models/curriculum';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService extends Common {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    super();
   }

  getCurriculum(dataTable: DataTable, curriculumgroup_seq: number): Observable<DataTable> {
    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'curriculum/' + curriculumgroup_seq + "/" +
                                    + dataTable.size + '/' + dataTable.pageNumber, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addCurriculum(curriculum: Curriculum) {
    return this.http.post(this.baseUrl + 'curriculum', curriculum, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCurriculum(curriculum: Curriculum) {
    return this.http.put(this.baseUrl + 'curriculum', curriculum, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCurriculum(curriculumSeq: number) {
    return this.http.delete(this.baseUrl + 'curriculum/' + curriculumSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
}

