# Wholesale Marketplace - Frontend

A comprehensive React-based frontend for an AliExpress-like wholesale marketplace.

## Features

### 🛍️ Buyer Features
- Product browsing with advanced filters
- Search functionality
- Cart management
- Wishlist
- Order tracking
- Product reviews
- Buyer-seller messaging
- Multiple shipping addresses
- Order history

### 🏪 Vendor Dashboard
- Store management
- Product CRUD operations
- Inventory management
- Order management
- Sales analytics
- Customer reviews
- Bulk pricing configuration
- Product variants

### 👨‍💼 Admin Panel
- User management
- Vendor approval workflow
- Product moderation
- Order overview
- Analytics dashboard
- Dispute resolution
- Coupon management

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + Material-UI
- **Icons:** React Icons + Material Icons
- **HTTP Client:** Axios
- **State Management:** Context API + useReducer
- **Build Tool:** Vite
- **Real-time:** Socket.IO Client

## Installation

```bash
cd frontend
npm install
```

## Environment Setup

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## Development

```bash
npm run dev
```

Visit `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── assets/              # Images, fonts
│   ├── components/          # Reusable components
│   │   ├── vendor/         # Vendor dashboard components
│   │   ├── admin/          # Admin panel components
│   │   ├── buyer/          # Buyer-specific components
│   │   └── common/         # Shared components
│   ├── context/            # React Context providers
│   ├── pages/              # Page components
│   │   ├── vendor/        # Vendor pages
│   │   ├── admin/         # Admin pages
│   │   └── buyer/         # Buyer pages
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   └── App.jsx             # Main app component
├── public/                  # Static assets
└── index.html              # Entry HTML
```

## Key Pages

### Public Pages
- Home
- Product Listing
- Product Details
- About
- Contact
- Sign In / Sign Up

### Buyer Pages
- Dashboard
- Orders
- Order Details
- Cart
- Checkout
- Wishlist
- Profile
- Messages
- Reviews

### Vendor Pages
- Vendor Dashboard
- Store Settings
- Add/Edit Product
- Product List
- Order Management
- Analytics
- Messages
- Reviews

### Admin Pages
- Admin Dashboard
- User Management
- Vendor Approval
- Product Moderation
- Order Management
- Analytics
- Dispute Resolution
- Coupon Management

## Features Implemented

✅ Multi-vendor marketplace
✅ Advanced product search & filters
✅ Shopping cart with multi-vendor support
✅ Wishlist functionality
✅ Order management
✅ Real-time messaging
✅ Product reviews & ratings
✅ Vendor dashboard
✅ Admin panel
✅ Payment integration (Stripe)
✅ Responsive design
✅ Dark mode support (optional)

## Integration with Backend

The frontend connects to the Node.js/Express backend API. Ensure the backend is running on `http://localhost:5000` or update the `VITE_API_URL` accordingly.

## Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Token sent with each API request
4. Auto-refresh on token expiry
5. Role-based routing (Buyer/Seller/Admin)

## Deployment

### Vercel/Netlify
```bash
npm run build
# Deploy the `dist` folder
```

### Configure redirects for SPA in `public/_redirects`:
```
/*  /index.html  200
```

## License

MIT
