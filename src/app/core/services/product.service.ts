import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://fakestoreapi.com';

  private readonly _products = signal<Product[]>([]);
  private readonly _categories = signal<string[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _selectedCategory = signal('all');
  private readonly _searchQuery = signal('');

  readonly products = this._products.asReadonly();
  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly selectedCategory = this._selectedCategory.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();

  readonly filteredProducts = computed(() => {
    const category = this._selectedCategory();
    const query = this._searchQuery().toLowerCase().trim();

    return this._products().filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  });

  loadProducts(): void {
    if (this._products().length > 0) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.http
      .get<Product[]>(`${this.apiUrl}/products`)
      .pipe(
        tap((products) => this._products.set(products)),
        catchError(() => {
          this._error.set('Failed to load products. Please try again.');
          return throwError(() => new Error('Failed to load products'));
        }),
        finalize(() => this._loading.set(false)),
      )
      .subscribe();
  }

  loadCategories(): void {
    if (this._categories().length > 0) {
      return;
    }

    this.http
      .get<string[]>(`${this.apiUrl}/products/categories`)
      .pipe(
        tap((categories) => this._categories.set(categories)),
        catchError(() => {
          this._error.set('Failed to load categories.');
          return throwError(() => new Error('Failed to load categories'));
        }),
      )
      .subscribe();
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  setCategory(category: string): void {
    this._selectedCategory.set(category);
  }

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  retry(): void {
    this._products.set([]);
    this._categories.set([]);
    this.loadProducts();
    this.loadCategories();
  }
}
