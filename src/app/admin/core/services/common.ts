import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Common {

    jwt() {
        const token = localStorage.getItem('token');

        return {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            })
        };
    }

    jwtWithBody(body: any) {
        const token = localStorage.getItem('token');

        return {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }),
            observe: body,
            responseType: 'json'
        };
    }

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

    getFormatDate(date) {
        const year = date.getFullYear();
        let month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    }

}
