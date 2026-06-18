import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing-module';
import { CartPage } from './cart-page/cart-page';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [CartPage],
  imports: [SharedModule, CartRoutingModule],
})
export class CartModule {}
