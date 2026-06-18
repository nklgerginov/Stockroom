import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPage } from './checkout-page/checkout-page';
import { SuccessPage } from './success-page/success-page';

const routes: Routes = [
  { path: '', component: CheckoutPage },
  { path: 'success', component: SuccessPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
