import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl = 'http://localhost:5260/api/values/login';
  private apiUrl = 'http://localhost:5260/api/values/AddProduct';
  private categoryUrl = 'http://localhost:5260/api/values/GetCategories';
  private cartUrl = 'http://localhost:5260/api/values/AddToCart';
  private OrderSubmit = 'http://localhost:5260/api/values/SubmitOrder';
  baseService: string = 'http://localhost:5260/';

  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

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
      errorMessage = `Error: ${error.error.message}`;
    } else {
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

  addToCart(data: any): Observable<any> {
    return this.http.post<any>(this.cartUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      catchError(this.handleError)
    );
  }

  updateCartItemCount(count: number) {
    this.cartItemCount.next(count);
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    sessionStorage.removeItem('cart');
    this.updateCartItemCount(0);
  }


  public submitOrder(orderDetails: any) {
    debugger;
    return this.http.post('http://localhost:5260/api/Values/SubmitOrder', JSON.stringify(orderDetails), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  }
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(  'http://localhost:5260/api/Values/GetOrders').pipe(
      catchError(this.handleError)
    );
  }
  completeOrder(orderId: number): Observable<void> {
    return this.http.post<void>(`http://localhost:5260/api/Values/CompleteOrder/${orderId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

}

