import { NgModule } from '@angular/core';

import { ProductDetailRoutingModule } from './product-detail-routing-module';
import { ProductDetailPage } from './product-detail-page/product-detail-page';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ProductDetailPage],
  imports: [SharedModule, ProductDetailRoutingModule],
})
export class ProductDetailModule {}
