import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  showCart: boolean = false;

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

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with ID ${sectionId} not found.`);
    }
  }
}
