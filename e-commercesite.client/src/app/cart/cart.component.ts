import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CheckoutFormComponent } from '../add-to-proceed/checkout-form/checkout-form.component'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  grandTotal: number = 0;
  isPopupOpen: boolean = false;

  constructor(private productService: ProductService, private router: Router, public dialog: MatDialog, public route: ActivatedRoute,) { }

  ngOnInit(): void {
    debugger;
    this.loadCart();
  }

  loadCart(): void {
    debugger;
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        this.cartItems = JSON.parse(cartData) || [];
        this.calculateGrandTotal();
        this.productService.updateCartItemCount(this.cartItems.length);
      } catch (error) {
        console.error('Error parsing cart data from localStorage', error);
        this.cartItems = [];
        this.productService.updateCartItemCount(0);
      }
    } else {
      this.cartItems = [];
      this.productService.updateCartItemCount(0);
    }
  }

  calculateGrandTotal(): void {
    this.grandTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.updateCart();
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateCart();
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);  
    this.updateCart();
  }

  updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateGrandTotal();
    this.productService.updateCartItemCount(this.cartItems.length);
  }

  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cart');
    sessionStorage.removeItem('cart');
    this.grandTotal = 0;
  }

  goBackToShopping(): void {
    this.router.navigate(['/home']);
  }

  openCheckoutPopup(cartItems: any): void {
    debugger;

    const dialogRef = this.dialog.open(CheckoutFormComponent, {
      width: '700px',
      height: 'auto',
      data: cartItems,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
   
  }

  closeCheckoutPopup(): void {
    this.isPopupOpen = false;
  }

  

  }

