import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  showCart: boolean = false; // Flag to control cart visibility

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  openCart(): void {
    this.showCart = true;
  }

  closeCart(): void {
    this.showCart = false;
  }
}
