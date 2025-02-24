
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']

})
export class CheckoutFormComponent implements OnInit {
  isPopupOpen: boolean = false;
  public model: any = {};
  public modelMain: any = {};
  public newmodel: any = {};
  orderDetails: any = {
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'cash',
    countryCode: '+92'
  };

  constructor(
    private router: Router,
    private productService: ProductService,
    public dialogRef: MatDialogRef<CheckoutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    debugger;
    this.modelMain = data;
    this.model = Object.assign({}, this.modelMain);
  }

  ngOnInit(): void { }

  openCheckoutPopup() {
    this.isPopupOpen = true;
  }

  closeCheckoutPopup(): void {
    this.isPopupOpen = false;
    this.dialogRef.close();
  }

  submitOrder(form: NgForm): void {
    if (form.valid) {
      debugger;
      console.log('Form is valid. Proceeding with order submission.');

      this.modelMain.forEach((item: any) => {
        console.log('Processing item:', item);

        this.orderDetails = {
          "productId": item.id,
          "quantity": item.quantity,
          "discountedPrice": item.discountedPrice,
          "imagePath": item.imagePath,
          userId: 1,
          "name": this.orderDetails.name,
          "email": this.orderDetails.email,
          "address": this.orderDetails.address,
          "orderDate": new Date(),
          "phone": this.orderDetails.phone,
          "countryCode": this.orderDetails.countryCode,
          "paymentMethod": this.orderDetails.paymentMethod,
          "orderStatus": "Pending",
          "totalPrice": item.discountedPrice * item.quantity,
          "isActive": true
      
        };

        console.log('Order details being sent to API:', this.orderDetails);

        this.productService.submitOrder(this.orderDetails).subscribe(
          (data: any) => {
            debugger;
            console.log('API response:', data);
            Swal.fire('Order placed successfully!', 'Your order has been submitted.', 'success').then(() => {
              this.router.navigate(['/home']); 
            }); 
          },
          (error) => {
            debugger;
            console.error('Error from API:', error);
            Swal.fire('Error', 'There was an issue submitting your order.', 'error');
          }
        );
      });

      this.closeCheckoutPopup();
    } else {

      console.warn('Form is invalid. Cannot proceed with order submission.');
      Swal.fire('Form Error', 'Please fill in all required fields.', 'error');
    }
  }




  validateOrderDetails(): boolean {
      return (
        this.orderDetails.name.trim() !== '' &&
        this.orderDetails.address.trim() !== '' &&
        this.orderDetails.phone.trim() !== '' &&
        this.orderDetails.email.trim() !== '' &&
        this.orderDetails.paymentMethod.trim() !== ''
      );
    }
}
