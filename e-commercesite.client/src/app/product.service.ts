import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

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
