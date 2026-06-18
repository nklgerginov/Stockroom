import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutPage } from './checkout-page';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { SharedModule } from '../../../shared/shared-module';

describe('CheckoutPage', () => {
  let component: CheckoutPage;
  let fixture: ComponentFixture<CheckoutPage>;
  let mockRouter: any;
  let mockCartService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn(),
      getCurrentNavigation: vi.fn(),
    };

    mockCartService = {
      isEmpty: vi.fn().mockReturnValue(false),
      items: vi.fn().mockReturnValue([]),
      total: vi.fn().mockReturnValue(0),
      itemCount: vi.fn().mockReturnValue(0),
      clearCart: vi.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CheckoutPage],
      imports: [ReactiveFormsModule, SharedModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPage);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should redirect to catalog if cart is empty on init', () => {
    mockCartService.isEmpty.mockReturnValue(true);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/catalog']);
  });

  it('should not redirect if cart is not empty on init', () => {
    mockCartService.isEmpty.mockReturnValue(false);
    fixture.detectChanges();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should mark all controls as touched and not navigate if form is invalid', () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(component.isInvalid('email')).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should submit successfully if form is valid', () => {
    fixture.detectChanges();
    component.checkoutForm.setValue({
      email: 'test@example.com',
      fullName: 'John Doe',
      address: '123 Test St',
      city: 'Test City',
      zipCode: '12345',
      cardNumber: '1234567812345678',
      cardExpiry: '12/26',
      cardCvc: '123',
    });

    component.onSubmit();
    expect(component.isSubmitting()).toBe(true);

    vi.advanceTimersByTime(1500);

    expect(component.isSubmitting()).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/checkout/success'], {
      state: expect.any(Object),
    });
  });
});
