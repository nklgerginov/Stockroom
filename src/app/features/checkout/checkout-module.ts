import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';
import { CheckoutRoutingModule } from './checkout-routing-module';
import { CheckoutPage } from './checkout-page/checkout-page';
import { SuccessPage } from './success-page/success-page';

@NgModule({
  declarations: [CheckoutPage, SuccessPage],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, CheckoutRoutingModule],
})
export class CheckoutModule {}
