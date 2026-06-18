import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

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
    // Read state passed from router navigation
    const navigation = this.router.getCurrentNavigation();
    const state = (navigation?.extras.state || history.state) as { order?: OrderDetails };

    if (state && state.order) {
      this.order.set(state.order);
      // Success! Clear the cart so the user can start a new shopping session
      this.cartService.clearCart();
    } else {
      // If someone lands on /success directly without ordering, redirect to catalog
      this.router.navigate(['/catalog']);
    }
  }
}
