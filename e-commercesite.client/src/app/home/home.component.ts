import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  laptops: any[] = [];
  lcds: any[] = [];
  accessories: any[] = [];
  errorMessage: string | null = null;
  slideCount: number = 0;
  currentSlideIndex: number = 0;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Clear cart data on home page load
    localStorage.removeItem('cart');
    sessionStorage.removeItem('cart');
    this.productService.updateCartItemCount(0);

    this.getCategoryData();
  }

  ngAfterViewInit(): void {
    this.slideCount = document.querySelectorAll('.slide').length;
  }

  getCategoryData(): void {
    this.productService.getCategoryData().subscribe(
      data => {
        this.laptops = data.filter(product => product.selectedCategory === 'LAPTOP');
        this.lcds = data.filter(product => product.selectedCategory === 'LCD');
        this.accessories = data.filter(product => product.selectedCategory === 'ACCESSORIES');
        this.errorMessage = null;
      },
      error => {
        console.error('Error fetching data', error);
        this.errorMessage = 'An error occurred while fetching data.';
      }
    );
  }

  addToCart(data: any): void {
    if (!data) {
      console.error('Invalid data provided');
      return;
    }

    const cartData = localStorage.getItem('cart');
    let cartItems: any[] = cartData ? JSON.parse(cartData) : [];

    const existingItemIndex = cartItems.findIndex(item => item.id === data.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      data.quantity = 1;
      cartItems.push(data);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.productService.updateCartItemCount(cartItems.length);

    console.log('Product added to cart:', data);
  }
}
