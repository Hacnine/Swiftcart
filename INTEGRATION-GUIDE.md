# Frontend-Backend Integration Guide

## ✅ Completed Integration

### Authentication Flow
- **SignIn Component** → Redux `login` thunk → `/api/auth/login`
- **SignUp Component** → Redux `register` thunk → `/api/auth/register`
- Socket.IO initialized on successful login
- JWT tokens stored in localStorage
- Automatic token refresh on 401 errors

### Product Management
- **Home Page** → `fetchFeaturedProducts` → `/api/products?featured=true`
- **Product Listing** → `fetchProducts(filters)` → `/api/products` with query params
- **Product Details** → `fetchProduct(id)` → `/api/products/:id`

### Shopping Cart
- **Cart Page** → `fetchCart` → `/api/cart`
- Add to cart → `addToCart` → `POST /api/cart`
- Update quantity → `updateCartItem` → `PUT /api/cart/:id`
- Remove item → `removeFromCart` → `DELETE /api/cart/:id`

### Wishlist
- Fetch wishlist → `fetchWishlist` → `/api/wishlist`
- Add to wishlist → `addToWishlist` → `POST /api/wishlist`
- Remove from wishlist → `removeFromWishlist` → `DELETE /api/wishlist/:productId`

### Vendor Dashboard
- **VendorDashboard** → `fetchVendorStats` → `/api/vendors/stats`
- **VendorOrders** → `fetchVendorOrders` → `/api/vendors/orders`
- Update order status → `updateOrderStatus` → `PUT /api/vendors/orders/:id/status`

### Admin Dashboard
- **AdminDashboard** → `fetchAdminStats` → `/api/admin/stats`
- **AdminVendors** → `fetchUsers({role: 'SELLER'})` → `/api/admin/users?role=SELLER`
- Approve vendor → `approveVendor` → `PUT /api/admin/vendors/:id/approve`
- Reject vendor → `rejectVendor` → `PUT /api/admin/vendors/:id/reject`

## 🔧 Setup Instructions

### 1. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration:
# DATABASE_URL, JWT_SECRET, CLOUDINARY_*, STRIPE_SECRET_KEY, EMAIL_*

# Generate Prisma client
npx prisma generate

# Push schema to MongoDB
npx prisma db push

# Seed database with demo data
npx prisma db seed

# Start backend server
npm run dev
# Server runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env:
# VITE_API_URL=http://localhost:5000
# VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
# VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Start frontend dev server
npm run dev
# App runs on http://localhost:5173
```

## 🧪 Testing the Integration

### 1. Test Authentication
```bash
# Open http://localhost:5173/signup
# Create a new account
# Should redirect to home page after successful registration
# Check Redux DevTools to see auth state populated
```

### 2. Test Product Browsing
```bash
# Home page should show featured products
# Navigate to /product to see all products
# Use filters to search/filter products
# Click on product to see details
```

### 3. Test Shopping Cart
```bash
# Add products to cart
# Go to /cart to see cart items
# Update quantities
# See total automatically calculated
```

### 4. Test Vendor Flow
```bash
# Login as vendor (email: vendor1@example.com, password: password123)
# Navigate to /vendor/dashboard
# View stats and recent orders
# Go to /vendor/orders to manage orders
# Update order status
```

### 5. Test Admin Flow
```bash
# Login as admin (email: admin@swiftcart.com, password: admin123)
# Navigate to /admin/dashboard
# View platform stats
# Go to /admin/vendors to approve/reject vendors
```

## 📡 API Endpoints Used

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (Vendor only)
- `PUT /api/products/:id` - Update product (Vendor only)
- `DELETE /api/products/:id` - Delete product (Vendor only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

### Vendor
- `POST /api/vendors/register` - Register as vendor
- `GET /api/vendors/profile` - Get vendor profile
- `PUT /api/vendors/profile` - Update vendor profile
- `GET /api/vendors/stats` - Get vendor statistics
- `GET /api/vendors/orders` - Get vendor orders
- `PUT /api/vendors/orders/:id/status` - Update order status

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/vendors/:id/approve` - Approve vendor
- `PUT /api/admin/vendors/:id/reject` - Reject vendor

## 🔐 Authentication Flow

1. User submits login/signup form
2. Redux thunk makes API call
3. Backend validates and returns JWT tokens
4. Tokens stored in localStorage
5. Axios interceptor adds token to all requests
6. On 401 error, interceptor attempts token refresh
7. Socket.IO connection initialized with token

## 🎨 Component Architecture

```
App.jsx (Redux Provider + Toast)
├── Public Routes
│   ├── Home (Featured Products)
│   ├── Product (Product Listing + Filters)
│   ├── SignIn (Auth)
│   └── SignUp (Auth)
├── Protected Routes (Any authenticated user)
│   ├── Cart
│   ├── Wishlist
│   ├── Checkout
│   └── Profile
├── Vendor Routes (SELLER role only)
│   ├── VendorDashboard
│   └── VendorOrders
└── Admin Routes (ADMIN role only)
    ├── AdminDashboard
    └── AdminVendors
```

## 🔄 Real-time Features (Socket.IO)

### Connection
```javascript
// Initialized in SignIn.jsx after successful login
initSocket(token);
```

### Events
- `notification` - New notification received
- `message` - New message in conversation
- `orderUpdate` - Order status changed

### Rooms
- User joins their own room: `user:${userId}`
- Vendors join: `vendor:${vendorId}`
- Conversations: `conversation:${conversationId}`

## 🐛 Debugging Tips

### Redux DevTools
- Install Redux DevTools extension
- View all state changes
- Time-travel debugging
- Action replay

### Network Tab
- Check API calls
- Verify request headers (Authorization)
- Check response status codes
- View request/response payloads

### Console Logs
- Auth errors logged in browser console
- Socket connection status logged
- API errors displayed as toast notifications

## 📊 State Management

### Redux Store Structure
```javascript
{
  auth: { user, token, isAuthenticated, loading, error },
  product: { products, featuredProducts, filters, loading },
  cart: { items, total, itemCount, loading },
  wishlist: { items, loading },
  order: { orders, currentOrder, loading },
  vendor: { profile, stats, orders, loading },
  admin: { stats, users, loading },
  notification: { notifications, unreadCount },
  message: { conversations, currentConversation },
  ui: { toast, modal, theme }
}
```

## 🎯 Next Steps

### Additional Features to Implement
1. Product reviews and ratings UI
2. Advanced search with autocomplete
3. Order tracking page
4. Vendor product management (CRUD)
5. Payment integration (Stripe)
6. Email verification flow
7. Password reset flow
8. Real-time messaging UI
9. Notification dropdown component
10. Analytics charts for vendor/admin

### Performance Optimization
1. Implement pagination for product lists
2. Add image lazy loading
3. Code splitting for routes
4. Caching with React Query (optional)
5. Optimize bundle size

### Testing
1. Unit tests for Redux slices
2. Integration tests for API calls
3. E2E tests with Cypress
4. Component tests with React Testing Library

## 📝 Environment Variables Required

### Backend (.env)
```env
DATABASE_URL="mongodb://..."
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🚀 Deployment Checklist

- [ ] Update CORS settings for production domain
- [ ] Set secure environment variables
- [ ] Configure production database
- [ ] Set up Cloudinary account
- [ ] Configure Stripe webhooks
- [ ] Set up email service (SendGrid/Mailgun)
- [ ] Build frontend: `npm run build`
- [ ] Deploy backend to Heroku/Railway/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Test all features in production
- [ ] Set up error tracking (Sentry)
- [ ] Configure CDN for static assets

---

**Integration Status**: ✅ Complete
**Last Updated**: November 9, 2025
