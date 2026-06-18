import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  private readonly cartService = inject(CartService);

  protected readonly items = this.cartService.items;
  protected readonly total = this.cartService.total;
  protected readonly itemCount = this.cartService.itemCount;
  protected readonly isEmpty = this.cartService.isEmpty;

  increaseQuantity(productId: number): void {
    const current = this.cartService.getQuantity(productId);
    this.cartService.updateQuantity(productId, current + 1);
  }

  decreaseQuantity(productId: number): void {
    const current = this.cartService.getQuantity(productId);
    this.cartService.updateQuantity(productId, current - 1);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
