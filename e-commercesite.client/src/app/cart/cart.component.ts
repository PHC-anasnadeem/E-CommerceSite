import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  grandTotal: number = 0;
  isPopupOpen: boolean = false;
  orderDetails: any = {
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'cash'
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  //loadCart(): void {
  //  const cartData = localStorage.getItem('cart');
  //  if (cartData) {
  //    try {
  //      this.cartItems = JSON.parse(cartData) || [];
  //      this.calculateGrandTotal();
  //    } catch (error) {
  //      console.error('Error parsing cart data from session storage', error);
  //      this.cartItems = [];
  //    }
  //  } else {
  //    this.cartItems = [];
  //  }
  //}

  loadCart(): void {
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
    if (typeof this.cartItems[index].quantity !== 'number') {
      this.cartItems[index].quantity = Number(this.cartItems[index].quantity) || 0;
    }
    this.cartItems[index].quantity++;
    this.updateCart();
  }

  decreaseQuantity(index: number): void {
    if (typeof this.cartItems[index].quantity !== 'number') {
      this.cartItems[index].quantity = Number(this.cartItems[index].quantity) || 0;
    }
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateCart();
    }
  }

  updateCart(): void {
    this.cartItems.forEach(item => {
      if (typeof item.quantity !== 'number' || isNaN(item.quantity)) {
        item.quantity = Number(item.quantity) || 1;
      }
    });

    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateGrandTotal();
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.updateCart();
  }

  clearCart(): void {
    this.cartItems = [];
    sessionStorage.removeItem('cart');
    this.grandTotal = 0;
  }

  goBackToShopping(): void {
    this.router.navigate(['/home']);
  }

  openCheckoutPopup(): void {
    this.isPopupOpen = true;
  }

  closeCheckoutPopup(): void {
    this.isPopupOpen = false;
  }

  submitOrder(): void {
    if (this.orderDetails.name && this.orderDetails.address && this.orderDetails.phone) {
      // Handle form submission, e.g., send order details to backend
      console.log('Order Details:', this.orderDetails);
      // After successful submission, clear cart and close popup
      this.clearCart();
      this.closeCheckoutPopup();
    }
  }
}
