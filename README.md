# Catene.pk

demo e commerce website for keychains and charms

---

## Technical Overview

this project is built using a pure frontend architecture (HTML, CSS, JavaScript) without any framework.  

The application handles product rendering, filtering, and cart management entirely on the client side.

---

## Core Features

- Dynamic product rendering using JavaScript
- Category-based filtering system
- Price range filtering (range slider)
- Sorting (price, rating, newest)
- Real-time cart system
- Promo code handling
- Currency selector 
- Fully responsive layout
- Advanced UI animations and transitions

---

## Architecture & Workflow

### 1. Rendering System
- Product data is managed in JavaScript
- Products are injected into the DOM dynamically
- Separate sections for:
  - Featured products (`index.html`)
  - Shop products (`shop.html`)

---

### 2. Filtering & Sorting System
- Category filters via checkboxes
- Price filtering via range input
- Sorting controlled via dropdown
- All filters trigger a re-render of product grid

---

### 3. Cart System

- Central cart state managed in JavaScript
- Stored and updated dynamically
- Features:
  - Add to cart
  - Remove item
  - Quantity control
  - Price calculation (subtotal, total)
  - Promo code logic

Cart UI is rendered in:
- `cart.html`

---

### 4. UI / Animation Layer

The UI is heavily enhanced using CSS:

- Custom properties (CSS variables) for design system 0  
- Keyframe animations:
  - fadeInUp
  - slideIn / slideOut
  - floating elements
  - glow & pulse effects 1  

- Micro-interactions:
  - Button press effects
  - Hover scaling
  - Cart badge animation

---

### 5. Multi-Page Structure

- `index.html` → Landing + featured products 2  
- `shop.html` → Product listing + filters 3  
- `cart.html` → Cart management + checkout UI 4  

---

## Tech Stack

- HTML5
- CSS3 (Advanced styling + animations)
- JavaScript (Vanilla)

External:
- Google Fonts (Poppins, Great Vibes)
- Font Awesome (icons)

---

## Project Structure
Keychains-and-charm-website/ │── index.html        # Landing page + featured products │── shop.html         # Shop page with filters & product grid │── cart.html         # Cart page with summary & checkout UI │── style.css         # Full UI system + animations │── script.js         # Core logic (products, cart, filters) │── README.md 
---

## Data Flow

1. Product data defined in JavaScript  
2. Rendered into DOM (products grid)  
3. User interactions trigger functions:
   - filterProducts()
   - addToCart()
   - updateCart()
4. Cart state updates  
5. UI re-renders dynamically  

---

## Design System

- CSS variables for colors, spacing, shadows
- Gradient-based theme
- Consistent typography system
- Reusable component styles (buttons, cards, layout)

---

## Future Improvements

- LocalStorage for persistent cart
- Backend integration (Node.js / API)
- Authentication system
- Payment gateway (Stripe / Razorpay)
- Product search system
- Admin dashboard
- API-based product management

---

## Development Notes

- Fully frontend-based architecture
- Easily extendable to full-stack
or readability and modular expansion

---

## License

MIT License
