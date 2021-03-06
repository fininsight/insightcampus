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

  getIncamContractsExcel(filter) {

    const param_filter = [];

    if (filter.name !== '') {
      param_filter.push({
        k: 'name',
        v: filter.name
      });
    }

    if (filter.original_company !== '') {
      param_filter.push({
        k: 'company',
        v: filter.original_company
      });
    }

    if (filter.class !== '') {
      param_filter.push({
        k: 'class',
        v: filter.class
      });
    }

    if (filter.date.length > 0) {

      param_filter.push({
        k: 'start_date',
        v: this.getFormatDate(filter.date[0])
      });

      param_filter.push({
        k: 'end_date',
        v: this.getFormatDate(filter.date[1])
      });
    }

    const postData = new FormData();
    const xhr = new XMLHttpRequest();
    const token = localStorage.getItem('token');
    xhr.open('GET', this.baseUrl + 'incamcontract/excel' + '?f=' + JSON.stringify(param_filter), true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.responseType = 'blob';
    xhr.onload = (e) => {
      const downloadUrl = URL.createObjectURL(xhr.response);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = downloadUrl;
      a.download = '내부정산.xlsx';
      a.click();
    };
    xhr.send(postData);
  }

  getIncamContracts(dataTable: DataTable, filter): Observable<DataTable> {

    const param_filter = [];

    if (filter.name !== '') {
      param_filter.push({
        k: 'name',
        v: filter.name
      });
    }

    if (filter.original_company !== '') {
      param_filter.push({
        k: 'company',
        v: filter.original_company
      });
    }

    if (filter.class !== '') {
      param_filter.push({
        k: 'class',
        v: filter.class
      });
    }

    if (filter.date.length > 0) {

      param_filter.push({
        k: 'start_date',
        v: this.getFormatDate(filter.date[0])
      });

      param_filter.push({
        k: 'end_date',
        v: this.getFormatDate(filter.date[1])
      });
    }

    return this.http.get<DataTable>(this.baseUrl + 'incamcontract/' +
      + dataTable.size + '/' + dataTable.pageNumber + '?f=' + JSON.stringify(param_filter), this.jwt())
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
