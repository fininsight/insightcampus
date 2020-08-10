import { Injectable } from '@angular/core';
import { IncamContract } from '../models/incam-contract';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class IncamContractService extends Common {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    super();
  }

  getIncamContracts(dataTable: DataTable): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamcontract/' +
                                    + dataTable.size + '/' + dataTable.pageNumber, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getIncamContract(dataTable: DataTable, contractSeq: number): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamcontract/' + contractSeq, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  searchIncamContract(searchText: string): Observable<Array<IncamContract>> {
    if (searchText === '') {
      searchText = 'ALL';
    }
    return this.http.get<Array<IncamContract>>(this.baseUrl + 'incamcontract/search/' + searchText, this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  addIncamContract(incamContract: IncamContract) {
    return this.http.post(this.baseUrl + 'incamcontract', incamContract, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateIncamContract(incamContract: IncamContract) {
    return this.http.put(this.baseUrl + 'incamcontract', incamContract, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteIncamContract(contractSeq: number) {
    return this.http.delete(this.baseUrl + 'incamcontract/' + contractSeq, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
