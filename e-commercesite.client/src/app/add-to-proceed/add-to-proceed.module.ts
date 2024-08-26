import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { DxDataGridModule } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddToProceedRoutingModule } from './add-to-proceed-routing.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CheckoutFormComponent
  ],
  imports: [
    CommonModule,
    DxDataGridModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot(), 
    FormsModule,
    ReactiveFormsModule,
    AddToProceedRoutingModule,
    MatSelectModule
  ],
  exports: [
    CheckoutFormComponent 
  ]
})
export class AddToProceedModule { }
