import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { DataTable } from '../models/datatable';
import { map, retry, catchError } from 'rxjs/operators';
import { Common } from './common';
import { EmailLog } from '../models/emaillog';

@Injectable({
  providedIn: 'root'
})
export class EmailLogService extends Common{

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getEmailLogs(dataTable: DataTable): Observable<DataTable> {

    let searchText = '';

    if (dataTable.search != null) {
      searchText = JSON.stringify(dataTable.search);
      searchText = encodeURI(searchText);
    }

    return this.http.get<DataTable>(this.baseUrl + 'emaillog/' + dataTable.size + '/' + dataTable.pageNumber + '/' + searchText)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  addEmailLog(emaillog: EmailLog) {
    return this.http.post(this.baseUrl + 'emaillog', emaillog).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateEmailLog(emaillog: EmailLog, email_log_seq: Number) {
    return this.http.put(this.baseUrl + 'emaillog/' + email_log_seq, emaillog).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteEmailLog(email_log_seq: Number) {
    return this.http.delete(this.baseUrl + 'emaillog/' + email_log_seq).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

}
