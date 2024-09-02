import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  laptops: any[] = [];
  lcds: any[] = [];
  accessories: any[] = [];

  visibleLaptops: any[] = [];
  visibleLcds: any[] = [];
  visibleAccessories: any[] = [];

  itemsToShowLaptops = 8;
  itemsToShowLcds = 8;
  itemsToShowAccessories = 8;

  showLoadMoreLaptops = false;
  showLoadMoreLcds = false;
  showLoadMoreAccessories = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCategoryData();
  }

  getCategoryData(): void {
    this.productService.getCategoryData().subscribe(
      data => {
        this.laptops = data.filter(product => product.selectedCategory === 'LAPTOP');
        this.lcds = data.filter(product => product.selectedCategory === 'LCD');
        this.accessories = data.filter(product => product.selectedCategory === 'ACCESSORIES');

        this.updateVisibleLaptops();
        this.updateVisibleLcds();
        this.updateVisibleAccessories();
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  updateVisibleLaptops(): void {
    this.visibleLaptops = this.laptops.slice(0, this.itemsToShowLaptops);
    this.showLoadMoreLaptops = this.laptops.length > this.itemsToShowLaptops;
  }

  updateVisibleLcds(): void {
    this.visibleLcds = this.lcds.slice(0, this.itemsToShowLcds);
    this.showLoadMoreLcds = this.lcds.length > this.itemsToShowLcds;
  }

  updateVisibleAccessories(): void {
    this.visibleAccessories = this.accessories.slice(0, this.itemsToShowAccessories);
    this.showLoadMoreAccessories = this.accessories.length > this.itemsToShowAccessories;
  }

  loadMoreLaptops(): void {
    this.itemsToShowLaptops += 8;
    this.updateVisibleLaptops();
  }

  loadMoreLcds(): void {
    this.itemsToShowLcds += 8;
    this.updateVisibleLcds();
  }

  loadMoreAccessories(): void {
    this.itemsToShowAccessories += 8;
    this.updateVisibleAccessories();
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
