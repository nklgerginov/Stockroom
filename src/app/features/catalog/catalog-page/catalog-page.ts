import { Component, OnInit, inject, signal } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-catalog-page',
  standalone: false,
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  protected readonly loading = this.productService.loading;
  protected readonly error = this.productService.error;
  protected readonly categories = this.productService.categories;
  protected readonly filteredProducts = this.productService.filteredProducts;
  protected readonly searchQuery = this.productService.searchQuery;
  protected readonly selectedCategory = this.productService.selectedCategory;

  protected readonly toastMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.productService.loadProducts();
    this.productService.loadCategories();
  }

  onSearchChange(query: string): void {
    this.productService.setSearchQuery(query);
  }

  selectCategory(category: string): void {
    this.productService.setCategory(category);
  }

  categoryButtonClass(category: string): string {
    const base =
      'rounded-full px-4 py-2 text-sm font-medium capitalize transition active:scale-95';
    const isActive = this.selectedCategory() === category;

    return isActive
      ? `${base} bg-brand-600 text-white shadow-sm`
      : `${base} bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50`;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showToast(`Added "${product.title}" to cart`);
  }

  retry(): void {
    this.productService.retry();
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(null), 2500);
  }
}
