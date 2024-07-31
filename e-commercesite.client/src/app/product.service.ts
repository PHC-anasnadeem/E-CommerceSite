import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private loginUrl = 'https://localhost:7094/api/values/login';

  constructor(private http: HttpClient) { }

  login(loginData: { username: string; password: string }): Observable<any[]> {
    return this.http.post<any[]>(this.loginUrl, loginData);
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
