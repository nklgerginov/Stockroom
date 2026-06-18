# Stockroom

An Angular-based e-commerce storefront that connects to a live product API, supporting full catalog browsing, cart management, and a complete checkout flow.

## Features

- **Product Catalog** — paginated grid of products fetched from [FakeStore API](https://fakestoreapi.com), with real-time search and category filtering.
- **Product Detail** — dedicated view for each product with ratings, description, and an adjustable quantity selector.
- **Shopping Cart** — persistent cart (backed by `localStorage`) with quantity controls, item removal, and order summary.
- **Checkout** — multi-section form (contact, shipping, payment) with field-level reactive validation and a simulated order submission flow.
- **Order Confirmation** — success page displaying the generated order number, itemized receipt, and total paid.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 22 (NgModule architecture) |
| Language | TypeScript 6 |
| State | Angular Signals (`signal`, `computed`) |
| Forms | Reactive Forms (`FormBuilder`, `Validators`) |
| HTTP | `HttpClient` with `withFetch()` |
| Styling | Tailwind CSS v4 (PostCSS plugin) |
| Typography | Inter (Google Fonts) |
| Unit Tests | Vitest 4 via `@angular/build:unit-test` |
| Build | Angular CLI / `@angular/build:application` |

## Architecture

```
src/app/
├── core/                       # Singleton services and domain models
│   ├── models/
│   │   ├── product.model.ts
│   │   └── cart-item.model.ts
│   └── services/
│       ├── product.service.ts   # API communication + signal-based state
│       └── cart.service.ts      # Cart operations + localStorage persistence
├── features/                    # Lazy-loaded feature modules
│   ├── catalog/                 # Product listing with search/filter
│   ├── product-detail/          # Single product view
│   ├── cart/                    # Shopping cart page
│   └── checkout/                # Checkout form + order success page
└── shared/                      # Reusable UI components
    └── components/
        ├── header/              # App header with cart badge
        ├── product-card/        # Product grid card
        ├── loading-spinner/     # Loading state indicator
        └── error-message/       # Error display with retry action
```

Each feature module is lazy-loaded via the Angular router for optimal initial bundle size. Shared components are declared once in `SharedModule` and exported for use across all feature modules.

### State Management

Application state is managed through Angular Signals rather than external libraries like NgRx. The `ProductService` holds catalog data, loading/error flags, and filter state as writable signals, exposing read-only views and `computed` derived state (e.g. `filteredProducts`). The `CartService` follows the same pattern, persisting cart items to `localStorage` on every mutation.

### Checkout Flow

1. User clicks **Checkout** from the cart page.
2. `CheckoutPage.ngOnInit()` guards against empty carts by redirecting to the catalog.
3. A reactive form collects contact, shipping, and payment details with synchronous validators (email format, ZIP pattern, card number length, expiry format).
4. On valid submission, the component simulates a 1.5-second processing delay, then navigates to `/checkout/success` with order data passed via router state.
5. `SuccessPage` reads the order from `history.state`, clears the cart, and renders the confirmation view.

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+

### Installation

```bash
git clone <repository-url>
cd Stockroom
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

### Production Build

```bash
npm run build
```

Output is written to `dist/stockroom/`. The production build applies AOT compilation, tree-shaking, and content hashing.

### Running Tests

```bash
npm test
```

Runs the full Vitest suite. All tests execute in a jsdom environment without `zone.js`.

## Project Conventions

- **Module-per-feature** — each route is its own NgModule, lazy-loaded for code splitting.
- **Signals over observables** — local component and service state uses signals; `HttpClient` observables are consumed at the service boundary and written into signals.
- **Barrel-free imports** — components and services are imported by their direct file paths to keep dependency graphs explicit.
- **Tailwind utility classes** — styling is applied inline via Tailwind v4 utilities; component `.css` files are reserved for host-level or keyframe declarations.

## License

This project is provided for educational purposes.
