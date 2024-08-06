import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl = 'https://localhost:7094/api/values/login';
  private apiUrl = 'https://localhost:7094/api/values/addProduct';

  constructor(private http: HttpClient) { }

  Login(loginData: { username: string; password: string }): Observable<any> {
    const url = `${this.loginUrl}?username=${encodeURIComponent(loginData.username)}&password=${encodeURIComponent(loginData.password)}`;
    return this.http.post<any>(url, null).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
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

  addProduct(formData: FormData): Observable<any> {
    debugger;
    return this.http.post(`${this.apiUrl}/products`, formData);
  }

  
}
