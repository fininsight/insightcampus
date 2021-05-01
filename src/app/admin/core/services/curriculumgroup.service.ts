import { Injectable } from '@angular/core';
import { Curriculumgroup } from '../models/curriculumgroup';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class CurriculumgroupService extends Common {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    super();
   }

   getCurriculumgroup(dataTable: DataTable, class_seq: number): Observable<DataTable> {
    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'curriculumgroup/' + class_seq + "/" +
                                    + dataTable.size + '/' + dataTable.pageNumber, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
   }

   addCurriculumgroup(curriculumgroup: Curriculumgroup) {
    return this.http.post(this.baseUrl + 'curriculumgroup', curriculumgroup, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateCurriculumgroup(curriculumgroup: Curriculumgroup) {
    return this.http.put(this.baseUrl + 'curriculumgroup', curriculumgroup, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteCurriculumgroup(curriculumgroup_seq: number) {
    return this.http.delete(this.baseUrl + 'curriculumgroup/' + curriculumgroup_seq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }


}
