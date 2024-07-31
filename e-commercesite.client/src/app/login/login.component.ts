import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  login: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

onSubmit(): void {
  if(this.loginForm.valid) {
  this.productService.login(this.loginForm.value).subscribe(
    (data: any[]) => {
      this.login = data;
      console.log('Login successful:', this.login);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
        confirmButtonText: 'OK'
      });
    },
    (error) => {
      console.error('Login failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password.',
        confirmButtonText: 'Try Again'
      });
    }
  );
} else {
  Swal.fire({
    icon: 'warning',
    title: 'Invalid Form',
    text: 'Please fill out all required fields.',
    confirmButtonText: 'OK'
  });
  console.log('Form is not valid');
}
}

}
