import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutFormComponent } from '../add-to-proceed/checkout-form/checkout-form.component'

const routes: Routes = [
  { path: '', component: CheckoutFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddToProceedRoutingModule { }
