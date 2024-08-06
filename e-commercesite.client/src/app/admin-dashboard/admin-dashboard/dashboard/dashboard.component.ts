import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedCategory: string = '';
  productForm: FormGroup;
  selectedFile: File | null = null;
  isImageSelected: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService, private http: HttpClient, private router: Router) { 
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: [null, Validators.required],
      discount: [null],
      discountedPrice: [{ value: 0, disabled: true }], 
      description: ['', Validators.required],
    });

    // Subscribe to changes in price and discount to recalculate discounted price
    this.productForm.get('price')?.valueChanges.subscribe(() => this.calculateDiscountedPrice());
    this.productForm.get('discount')?.valueChanges.subscribe(() => this.calculateDiscountedPrice());
  }

  ngOnInit(): void { }

  onCategoryChange() {

  }

  calculateDiscountedPrice() {
    const price = this.productForm.get('price')?.value || 0;
    const discount = this.productForm.get('discount')?.value || 0;
    const discountedPrice = price - (price * (discount / 100));
    this.productForm.get('discountedPrice')?.setValue(discountedPrice, { emitEvent: false });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.isImageSelected = true; 
    } else {
      this.selectedFile = null;
      this.isImageSelected = false;
    }
  }

  onSubmit(): void {

    if (this.productForm.valid && this.selectedFile) {
      debugger;
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('image', this.selectedFile);

      this.productService.addProduct(formData).subscribe(
        (response: any) => {
          debugger;
          Swal.fire({
            icon: 'success',
            title: 'Added Successful',
            text: 'You have successfully added the product!',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/home']);
          });

          this.productForm.reset();
          this.selectedFile = null;
        },
        (error: any) => {
          debugger;
          console.error('Error submitting form:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Product could not be added.',
            confirmButtonText: 'Try Again'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill out all required fields and attach an image.',
        confirmButtonText: 'OK'
      });
    }
  }

}
