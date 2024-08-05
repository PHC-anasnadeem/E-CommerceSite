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

  constructor(private fb: FormBuilder, private productService: ProductService, private http: HttpClient, private router: Router) { 
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: [0, Validators.required],
      discount: [0],
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

  onImageSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Product Data:', productData);

  
      const formData = new FormData();
      formData.append('productName', productData.productName);
      formData.append('price', productData.price);
      formData.append('discount', productData.discount);
      formData.append('description', productData.description);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.productService.addProduct(formData).subscribe(
        (response: any) => {
          debugger;
          console.log('Form submitted successfully!', response);

          Swal.fire({
            icon: 'success',
            title: 'Added Successful',
            text: 'You have successfully Added!',
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
            text: 'Product Did not Added.',
            confirmButtonText: 'Try Again'
          });
        }
      );
    }
  }
}
