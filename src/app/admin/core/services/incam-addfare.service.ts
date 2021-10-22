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

  getIncamAddfaresExcel(filter) {

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
    xhr.open('GET', this.baseUrl + 'incamaddfare/excel' + '?f=' + JSON.stringify(param_filter), true);
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

  getIncamAddfares(dataTable: DataTable, filter): Observable<DataTable> {

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

    if (filter.deposit == 0 || filter.deposit == 1 ) {

      param_filter.push({
        k: 'deposit',
        v: filter.deposit
      });
    }

    if (filter.evidenceType !== '') {
      param_filter.push({
        k: 'evidenceType',
        v: filter.evidenceType
      });
    }

    return this.http.get<DataTable>(this.baseUrl + 'incamaddfare/' +
                                    + dataTable.size + '/' + dataTable.pageNumber + '?f=' + JSON.stringify(param_filter), this.jwt())
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getFamilyIncamAddfares(dataTable: DataTable): Observable<DataTable> {

    return this.http.get<DataTable>(this.baseUrl + 'incamaddfare/family/' +
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

  updateDeposit(incamaddfares) {
    return this.http.put(this.baseUrl + 'incamaddfare/deposit', incamaddfares, this.jwt()).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateEvidenceType(incamaddfares) {
    return this.http.put(this.baseUrl + 'incamaddfare/evidenceType', incamaddfares, this.jwt()).pipe(
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

  async sendAddfare(incamaddfare: IncamAddfare[]) {
    return await this.http.post(this.baseUrl + 'incamaddfare/SendAddfare', incamaddfare, this.jwt()).toPromise();
  }
}
