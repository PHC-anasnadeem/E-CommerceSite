import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../app/product.service';
import Swiper from 'swiper';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  laptops: any[] = [];
  lcds: any[] = [];
  accessories: any[] = [];

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit() {
    this.loadLaptops();
    this.loadLcds();
    this.loadAccessories();
  }

  private loadLaptops() {
    this.productService.getLaptops().subscribe((data: any[]) => {
      this.laptops = data;
      this.initializeSwiper('.product-laptop-swiper');
    });
  }

  private loadLcds() {
    this.productService.getLcds().subscribe((data: any[]) => {
      this.lcds = data;
      this.initializeSwiper('.product-lcd-swiper');
    });
  }

  private loadAccessories() {
    this.productService.getAccessories().subscribe((data: any[]) => {
      this.accessories = data;
      this.initializeSwiper('.product-accessory-swiper');
    });
  }

  private initializeSwiper(swiperSelector: string) {
    setTimeout(() => {
      new Swiper(swiperSelector, {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        },
      });
    }, 100);
  }

  title = 'e-commercesite.client';
}
