import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  userToken: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
  }

  loggedIn() {
    const token: string = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(login: any): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'auth/login', login)
    .pipe(map((user: User) => {
      if (user.result) {
        localStorage.setItem('token', user.message);
        this.userToken = user.message;
      }
      return user;
    }),
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
