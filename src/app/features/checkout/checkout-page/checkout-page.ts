import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

const ORDER_STATE_KEY = 'stockroom-last-order';

@Component({
  selector: 'app-checkout-page',
  standalone: false,
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  protected readonly cartService = inject(CartService);

  public readonly checkoutForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
    cardCvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  public readonly isSubmitting = signal(false);

  ngOnInit(): void {
    if (this.cartService.isEmpty()) {
      this.router.navigate(['/catalog']);
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate API call for checkout process
    setTimeout(() => {
      this.isSubmitting.set(false);
      
      const orderData = {
        orderNumber: `SR-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: this.checkoutForm.value.fullName,
        email: this.checkoutForm.value.email,
        totalAmount: this.cartService.total(),
        items: this.cartService.items().map((item) => ({
          title: item.product.title,
          quantity: item.quantity,
          price: item.product.price,
        })),
        date: new Date().toISOString(),
      };

      this.saveOrderState(orderData);
      this.router.navigate(['/checkout/success'], {
        state: { order: orderData },
      });
    }, 1500);
  }

  private saveOrderState(orderData: unknown): void {
    try {
      sessionStorage.setItem(ORDER_STATE_KEY, JSON.stringify(orderData));
    } catch {
      // Ignore storage errors in private browsing or restrictive environments.
    }
  }

  // Form helper methods
  isInvalid(controlName: string): boolean {
    const control = this.checkoutForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.checkoutForm.get(controlName);
    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (control.errors['minlength']) {
      return `Must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['pattern']) {
      if (controlName === 'zipCode') {
        return 'ZIP code must be 5 digits (e.g. 12345)';
      }
      if (controlName === 'cardNumber') {
        return 'Card number must be 16 digits';
      }
      if (controlName === 'cardExpiry') {
        return 'Expiry must be in MM/YY format';
      }
      if (controlName === 'cardCvc') {
        return 'CVC must be 3 or 4 digits';
      }
      return 'Invalid format';
    }

    return 'Invalid field value';
  }
}
