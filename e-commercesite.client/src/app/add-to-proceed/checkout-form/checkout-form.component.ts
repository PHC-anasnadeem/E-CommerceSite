//import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
//import { ActivatedRoute } from '@angular/router';
//import { ProductService } from '../../product.service';
//import Swal from 'sweetalert2';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Inject } from '@angular/core';
//import { NgForm } from '@angular/forms';

//@Component({
//  selector: 'app-checkout-form',
//  templateUrl: './checkout-form.component.html',
//  styleUrls: ['./checkout-form.component.css']  // Fixed typo here from `styleUrl` to `styleUrls`
//})
//export class CheckoutFormComponent implements OnInit {
//  isPopupOpen: boolean = false;
//  public modelMain: any = {};
//  public model: any = {};
//  orderDetails: any = {
//    name: '',
//    address: '',
//    phone: '',
//    email: '',
//    paymentMethod: 'cash'
//  };

//  constructor(
//    private router: Router,
//    public dialog: MatDialog,
//    public route: ActivatedRoute,
//    private productService: ProductService,
//    public dialogRef: MatDialogRef<CheckoutFormComponent>,
//    @Inject(MAT_DIALOG_DATA) public data: any
//  )
//  {
//    this.modelMain = data;
//    this.orderDetails = Object.assign({}, this.modelMain);
//  }

//  ngOnInit(): void { }

//  openCheckoutPopup() {
//    this.isPopupOpen = true;
//  }

//  closeCheckoutPopup(): void {
//    this.isPopupOpen = false;
//  }

//  submitOrder(form: NgForm): void {
//    if (form.valid) {
//      if (this.validateOrderDetails()) {
//        Swal.fire('Order placed successfully!', 'Your order has been submitted.', 'success');
//        this.closeCheckoutPopup();
//      } else {
//        Swal.fire('Form Error', 'Please fill in all required fields.', 'error');
//      }
//    } else {
//      console.log('Form is invalid');
//    }
//  }

//  // Function to validate form fields
//  validateOrderDetails(): boolean {
//    return (
//      this.orderDetails.name.trim() !== '' &&
//      this.orderDetails.address.trim() !== '' &&
//      this.orderDetails.phone.trim() !== '' &&
//      this.orderDetails.email.trim() !== '' &&
//      this.orderDetails.paymentMethod.trim() !== ''
//    );
//  }
//}
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

      this.modelMain.forEach((item: any) => {
        this.orderDetails = {
          id: item.id,
          quantity: item.quantity,
          discountedPrice: item.discountedPrice,
          imagePath: item.imagePath,

          name: this.orderDetails.name,
          email: this.orderDetails.email,
          address: this.orderDetails.address,
          phone: this.orderDetails.phone,
          countryCode: this.orderDetails.countryCode,
          paymentMethod: this.orderDetails.paymentMethod,
        };

        this.productService.submitOrder(this.orderDetails).subscribe(
          (data: any) => {
            Swal.fire('Order placed successfully!', 'Your order has been submitted.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'There was an issue submitting your order.', 'error');
          }
        );
      });
      this.closeCheckoutPopup();
    } else {
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
