import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl = 'http://localhost:5260/api/values/login';
  private apiUrl = 'http://localhost:5260/api/values/AddProduct';
  private categoryUrl = 'http://localhost:5260/api/values/GetCategories';
  private cartUrl = 'http://localhost:5260/api/cart'; // Endpoint for cart operations

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(loginData: { username: string; password: string }): Observable<any> {
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

  getLaptops(): Observable<any[]> {
    return this.http.get<any[]>('/api/laptops').pipe(
      catchError(this.handleError)
    );
  }

  getLcds(): Observable<any[]> {
    return this.http.get<any[]>('/api/lcds').pipe(
      catchError(this.handleError)
    );
  }

  getAccessories(): Observable<any[]> {
    return this.http.get<any[]>('/api/accessories').pipe(
      catchError(this.handleError)
    );
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getCategoryData(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post<any>(`${this.cartUrl}/add`, { productId }).pipe(
      catchError(this.handleError)
    );
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      catchError(this.handleError)
    );
  }


  updateCartItemCount(count: number): void {
    this.cartItemCountSubject.next(count);
  }
}
