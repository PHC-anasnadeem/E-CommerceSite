import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl = 'https://localhost:7094/api/values/login';

  constructor(private http: HttpClient) { }

  login(loginData: { username: string; password: string }): Observable<any> {
    debugger;
    const url = `${this.loginUrl}?username=${encodeURIComponent(loginData.username)}&password=${encodeURIComponent(loginData.password)}`;
    return this.http.post<any>(url, null);
  }

  //login1(loginData: any = {}): Observable<any> {
  //  // Prepare URL-encoded data
  //  const data = new URLSearchParams({
  //    grant_type: 'password',
  //    username: loginData.Username || '',
  //    password: loginData.Password || '',
  //    Registration_Number: loginData.Registration_Number || '',
  //    isHCEUser: loginData.isHCEUser || ''
  //  }).toString();

  //  // Set headers for URL-encoded content
  //  const headers = new HttpHeaders({
  //    'Content-Type': 'application/x-www-form-urlencoded'
  //  });

  //  return this.http.post<any>(
  //    `${this.loginUrl}Token`,
  //    data,
  //    { headers }
  //  ).pipe(
  //    tap((response: any) => {
  //      // Handle the response if needed
  //      console.log('Login successful:', response);
  //      return response;
  //    })
  //  );
  //}

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
