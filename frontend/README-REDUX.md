# Wholesale Marketplace Frontend

Complete Redux-based frontend for AliExpress-like wholesale marketplace with multi-vendor support.

## Tech Stack
- React 18 + Vite
- Redux Toolkit + Redux Persist
- React Router DOM v6
- Tailwind CSS + Material-UI
- Axios
- Socket.IO Client

## Redux Store Architecture

### Slices Overview
1. **authSlice** - Authentication & user management
2. **productSlice** - Product catalog & filters
3. **cartSlice** - Shopping cart operations
4. **wishlistSlice** - Wishlist management
5. **orderSlice** - Order creation & tracking
6. **vendorSlice** - Vendor dashboard & stats
7. **adminSlice** - Admin operations
8. **notificationSlice** - Real-time notifications
9. **messageSlice** - Messaging system
10. **uiSlice** - UI state (modals, toasts, theme)

### State Persistence
- `auth` - User session persisted in localStorage
- `cart` - Cart data persisted in localStorage
- Other slices are session-only

## Features

### For Buyers (BUYER role)
- Browse products with advanced filters
- Add to cart/wishlist
- Bulk pricing for wholesale orders
- Order tracking
- Review & rating system
- Real-time messaging with vendors
- Order history

### For Vendors (SELLER role)
- Vendor registration & approval workflow
- Product management (CRUD with variants)
- Order management
- Sales analytics dashboard
- Customer messaging
- Inventory tracking

### For Admins (ADMIN role)
- User management
- Vendor approval/rejection
- Platform analytics
- Dispute resolution
- System settings

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Redux Usage Examples

### Authentication
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser, selectIsAuthenticated } from './store/slices/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const handleLogin = async (credentials) => {
    await dispatch(login(credentials));
  };
};
```

### Products with Filters
```javascript
import { fetchProducts, selectProducts, selectFilters } from './store/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filters = useSelector(selectFilters);
  
  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [filters]);
};
```

### Cart Operations
```javascript
import { addToCart, selectCartItems, selectCartTotal } from './store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product.id,
      quantity: 1,
      variantId: selectedVariant?.id,
    }));
  };
};
```

## API Integration

All API calls are handled through Redux async thunks. The `services/` directory contains the Axios instance with interceptors for:
- Automatic token injection
- Token refresh on 401
- Error handling

## Socket.IO Integration

Real-time features:
```javascript
import { initSocket, disconnectSocket } from './services/socket';

// Initialize on login
useEffect(() => {
  if (isAuthenticated && token) {
    initSocket(token);
  }
  return () => disconnectSocket();
}, [isAuthenticated, token]);
```

## Protected Routes

Routes are protected by role:
```javascript
<ProtectedRoute allowedRoles={['SELLER']}>
  <VendorDashboard />
</ProtectedRoute>
```

## Project Structure
```
src/
├── store/
│   ├── index.js              # Redux store config
│   └── slices/               # All Redux slices
├── services/
│   ├── api.js                # Axios instance
│   ├── index.js              # API services
│   └── socket.js             # Socket.IO client
├── components/               # Reusable components
├── pages/                    # Page components
├── assets/                   # Images, fonts
└── App.jsx                   # Main app with routing
```

## Development Guidelines

### Component Pattern
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { someAction, selectSomeData } from '../store/slices/someSlice';

const Component = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectSomeData);
  
  useEffect(() => {
    dispatch(someAction());
  }, []);
  
  return <div>{/* Component JSX */}</div>;
};
```

### Error Handling
Each slice handles errors in `extraReducers`. Display errors using:
```javascript
const error = useSelector((state) => state.someSlice.error);
```

### Toast Notifications
```javascript
import { showToast } from './store/slices/uiSlice';

dispatch(showToast({ message: 'Success!', type: 'success' }));
```

## Next Steps

1. ✅ Redux store setup complete
2. ✅ All 10 slices implemented
3. ✅ API service layer ready
4. ✅ Socket.IO integration setup
5. 🔄 Build page components
6. 🔄 Implement responsive UI
7. 🔄 Add Stripe payment integration
8. 🔄 Testing & optimization

## Backend Connection

Ensure backend is running on `http://localhost:5000` or update `VITE_API_URL`.

Backend repository: `../backend/`

## License
MIT
