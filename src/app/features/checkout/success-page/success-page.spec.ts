import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessPage } from './success-page';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { SharedModule } from '../../../shared/shared-module';

describe('SuccessPage', () => {
  let component: SuccessPage;
  let fixture: ComponentFixture<SuccessPage>;
  let mockRouter: any;
  let mockCartService: any;
  let mockNavigationState: any;

  beforeEach(() => {
    mockNavigationState = {
      order: {
        orderNumber: 'SR-123456',
        customerName: 'John Doe',
        email: 'john@example.com',
        totalAmount: 99.99,
        items: [{ title: 'Product 1', quantity: 2, price: 49.995 }],
        date: new Date().toISOString(),
      },
    };

    mockRouter = {
      navigate: vi.fn(),
      getCurrentNavigation: vi.fn().mockImplementation(() => ({
        extras: { state: mockNavigationState },
      })),
    };

    mockCartService = {
      clearCart: vi.fn(),
    };
  });

  async function createComponent() {
    await TestBed.configureTestingModule({
      declarations: [SuccessPage],
      imports: [SharedModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessPage);
    component = fixture.componentInstance;
  }

  it('should create and load order details, and clear the cart', async () => {
    await createComponent();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component['order']()).toEqual(mockNavigationState.order);
    expect(mockCartService.clearCart).toHaveBeenCalled();
  });

  it('should redirect to catalog if navigation state order is missing', async () => {
    mockNavigationState = null;
    await createComponent();
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/catalog']);
  });
});
