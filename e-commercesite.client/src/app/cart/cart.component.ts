import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.productService.getCart().subscribe(
      items => {
        this.cartItems = items;
      },
      error => console.error('Error fetching cart items', error)
    );
  }

  removeFromCart(itemId: number): void {
    // Implement remove from cart logic
  }
}
