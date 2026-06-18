import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

const ORDER_STATE_KEY = 'stockroom-last-order';

export interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  totalAmount: number;
  items: Array<{ title: string; quantity: number; price: number }>;
  date: string;
}

@Component({
  selector: 'app-success-page',
  standalone: false,
  templateUrl: './success-page.html',
  styleUrl: './success-page.css',
})
export class SuccessPage implements OnInit {
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  protected readonly order = signal<OrderDetails | null>(null);

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = (navigation?.extras.state || history.state) as { order?: OrderDetails };
    const order = state?.order ?? this.loadOrderState();

    if (order) {
      this.order.set(order);
      this.cartService.clearCart();
      this.clearOrderState();
    } else {
      this.router.navigate(['/catalog']);
    }
  }

  private loadOrderState(): OrderDetails | null {
    try {
      const raw = sessionStorage.getItem(ORDER_STATE_KEY);
      return raw ? (JSON.parse(raw) as OrderDetails) : null;
    } catch {
      return null;
    }
  }

  private clearOrderState(): void {
    try {
      sessionStorage.removeItem(ORDER_STATE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }
}
