import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl = 'https://localhost:7094/api/values/login';

  constructor(private http: HttpClient) { }

  Login(loginData: { username: string; password: string }): Observable<any> {
    debugger;
    const url = `${this.loginUrl}?username=${encodeURIComponent(loginData.username)}&password=${encodeURIComponent(loginData.password)}`;
    return this.http.post<any>(url, null)
      .pipe(
        map(res => {
      debugger;
        return res;
    })
    );
  }


  login2(loginData: { username: string; password: string }): Observable<any> {
    debugger;
    const url = this.loginUrl;
    const body = { username: loginData.username, password: loginData.password };
    return this.http.post<any>(url, body).pipe(
      tap(response => {
        debugger;
        console.log('Response from API:', response);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    return throwError(() => new Error('An error occurred while logging in'));
  }


  login1(loginData: { username: string; password: string }): Observable<any> {
    debugger;
    return this.http.post<any>(this.loginUrl, loginData).pipe(
      catchError(error => {
        debugger;
        console.error('Error occurred:', error);
        return throwError(() => new Error('An error occurred while logging in'));
      })
    );
  }

  getLaptops() {
    return this.http.get<any[]>('/api/laptops');
  }

  getLcds() {
    return this.http.get<any[]>('/api/lcds');
  }

  getAccessories() {
    return this.http.get<any[]>('/api/accessories');
  }

  
}
