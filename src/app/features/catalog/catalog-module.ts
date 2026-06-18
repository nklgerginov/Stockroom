import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CatalogRoutingModule } from './catalog-routing-module';
import { CatalogPage } from './catalog-page/catalog-page';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [CatalogPage],
  imports: [SharedModule, FormsModule, CatalogRoutingModule],
})
export class CatalogModule {}
