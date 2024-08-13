import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private loginUrl = 'http://localhost:5260/api/values/login';
  private apiUrl = 'http://localhost:5260/api/values/AddProduct';
  private categoryUrl = 'http://localhost:5260/api/values/GetCategories';

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

  addProduct(formData: FormData): Observable<any>
  {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, formData).pipe(
    map(res => res),
    catchError(this.handleError)
  );
  }

  getCategoryData(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  
}
