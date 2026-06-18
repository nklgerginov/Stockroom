import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

const CART_STORAGE_KEY = 'stockroom-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items = this._items.asReadonly();

  readonly itemCount = computed(() =>
    this._items().reduce((total, item) => total + item.quantity, 0),
  );

  readonly total = computed(() =>
    this._items().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
  );

  readonly isEmpty = computed(() => this._items().length === 0);

  addToCart(product: Product, quantity = 1): void {
    this._items.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);

      if (existing) {
        return items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...items, { product, quantity }];
    });
    this.persist();
  }

  removeFromCart(productId: number): void {
    this._items.update((items) =>
      items.filter((item) => item.product.id !== productId),
    );
    this.persist();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    this._items.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
    this.persist();
  }

  clearCart(): void {
    this._items.set([]);
    this.persist();
  }

  getQuantity(productId: number): number {
    return (
      this._items().find((item) => item.product.id === productId)?.quantity ?? 0
    );
  }

  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this._items()));
  }
}
