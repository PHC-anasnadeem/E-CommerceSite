import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  laptops: any[] = [];
  lcds: any[] = [];
  accessories: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }


  title = 'e-commercesite.client';
}
