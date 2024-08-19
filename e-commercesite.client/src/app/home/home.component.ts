import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  laptops: any[] = [];
  lcds: any[] = [];
  accessories: any[] = [];
  errorMessage: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategoryData();
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
  addToCart(productId: number): void {
    this.productService.addToCart(productId).subscribe(
      () => {
        this.productService.getCart().subscribe(cartItems => {
          this.productService.updateCartItemCount(cartItems.length);
        });
        console.log('Product added to cart:', productId);
      },
      error => console.error('Error adding product to cart', error)
    );
  }

  removeFromCart(productId: number): void {
    
  }
}
