import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      debugger;
      this.productService.Login(this.loginForm.value).subscribe(
        (data: any) => {
          debugger;
          console.log('Login successful:', data);

          localStorage.setItem('authToken', data.token);


          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in!',
            confirmButtonText: 'OK'
          }).then(() => {
   
            this.router.navigate(['/home']);
          });
        },
        (error) => {
          debugger;
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
