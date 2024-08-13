import { Component, OnInit } from '@angular/core';
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
  selectedFile: File | null = null;
  isImageSelected: boolean = false;
  public model: any = {};
  public modelMain: any = {};
  files: any[] = [];

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void { }

  onCategoryChange() {
    // Handle category change
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


  onSubmit(form: any): void {
    debugger;
    if (form.valid && this.selectedFile) {

      // Create FormData object
      const formData = new FormData();
      formData.append("selectedCategory", this.selectedCategory || '');
      formData.append("ProductName", this.model.productName || '');
      formData.append("Price", this.model.price || '0');
      formData.append("Discount", this.model.discount || '0');
      formData.append("Description", this.model.description || '');
      formData.append('Image', this.selectedFile || new Blob());


      this.productService.addProduct(formData).subscribe(
        (response: any) => {
          debugger;
          Swal.fire({
            icon: 'success',
            title: 'Added Successfully',
            text: 'You have successfully added the product!',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/home']);
          });

          form.reset();
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
