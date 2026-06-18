import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { ProductCard } from './components/product-card/product-card';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { ErrorMessage } from './components/error-message/error-message';

@NgModule({
  declarations: [Header, ProductCard, LoadingSpinner, ErrorMessage],
  imports: [CommonModule, RouterModule],
  exports: [Header, ProductCard, LoadingSpinner, ErrorMessage, CommonModule, RouterModule],
})
export class SharedModule {}
