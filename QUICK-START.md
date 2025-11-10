# 🚀 Quick Start Guide - Swiftcart Wholesale Marketplace

## Prerequisites
- Node.js v18 or higher
- MongoDB (local or cloud)
- Git

## 1. Clone & Setup

```bash
# Clone the repository
cd d:\Swiftcart-main
```

## 2. Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
# Copy and paste this into backend/.env:

DATABASE_URL="mongodb://localhost:27017/swiftcart"
# OR use MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/swiftcart"

JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this"
JWT_EXPIRE="24h"
JWT_REFRESH_EXPIRE="7d"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

STRIPE_SECRET_KEY="sk_test_your_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@swiftcart.com"

FRONTEND_URL="http://localhost:5173"
PORT=5000

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with demo data
npx prisma db seed

# Start backend server
npm run dev
```

**Backend should be running on http://localhost:5000**

## 3. Frontend Setup (3 minutes)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
# Copy and paste this into frontend/.env:

VITE_API_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# Start frontend dev server
npm run dev
```

**Frontend should be running on http://localhost:5173**

## 4. Test the Application

### A. Test Authentication
1. Open browser: `http://localhost:5173/signup`
2. Create account:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Should redirect to home page
4. You're logged in! ✅

### B. Or Use Seeded Accounts

**Admin Account:**
- Email: `admin@swiftcart.com`
- Password: `admin123`
- Access: `/admin/dashboard`

**Vendor Account 1:**
- Email: `vendor1@example.com`
- Password: `password123`
- Access: `/vendor/dashboard`

**Vendor Account 2:**
- Email: `vendor2@example.com`
- Password: `password123`
- Access: `/vendor/dashboard`

### C. Test Features

**1. Browse Products**
- Home page shows featured products
- Click "Products" to see all
- ✅ Should see 4 demo products

**2. Shopping Cart**
- Add products to cart
- Go to `/cart`
- See cart items with totals
- ✅ Cart should persist even after refresh

**3. Vendor Dashboard** (Login as vendor)
- Navigate to `/vendor/dashboard`
- See stats: products, orders, revenue
- Go to `/vendor/orders`
- Update order status
- ✅ Dashboard shows vendor data

**4. Admin Dashboard** (Login as admin)
- Navigate to `/admin/dashboard`
- See platform statistics
- Go to `/admin/vendors`
- Approve/reject vendors
- ✅ Admin controls work

## 5. Check Redux DevTools

1. Install Redux DevTools extension (Chrome/Firefox)
2. Open DevTools → Redux tab
3. See all state:
   - auth (user data, token)
   - product (products array)
   - cart (items, total)
   - vendor (stats, orders)
   - admin (stats, users)
4. Watch state update in real-time! 🎉

## 6. Check API Responses

1. Open Network tab in browser DevTools
2. Perform any action (login, add to cart, etc.)
3. See API calls to `http://localhost:5000/api/*`
4. Check:
   - ✅ Request headers (Authorization token)
   - ✅ Response status (200, 201)
   - ✅ Response data

## 7. Test Socket.IO (Optional)

1. Login to application
2. Check browser console
3. Should see: `Socket connected: [socket-id]`
4. ✅ Real-time connection established

## Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solution:**
```bash
# Check MongoDB is running
# If using local MongoDB:
mongod

# Or update DATABASE_URL to use MongoDB Atlas
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in backend/.env
PORT=5001

# Update frontend/.env
VITE_API_URL=http://localhost:5001
```

### Issue: "Products not showing"
**Solution:**
```bash
# Re-run database seed
cd backend
npx prisma db seed
```

### Issue: "401 Unauthorized"
**Solution:**
- Logout and login again
- Check JWT_SECRET is set in backend/.env
- Clear browser localStorage

## Project Structure Overview

```
backend/
├── prisma/schema.prisma    # Database models
├── src/
│   ├── server.js           # Main server file
│   ├── routes/             # API routes
│   ├── controllers/        # Request handlers
│   └── middleware/         # Auth, validation
└── .env                    # Backend config

frontend/
├── src/
│   ├── App.jsx             # Main app + routing
│   ├── main.jsx            # Redux Provider
│   ├── store/              # Redux slices
│   ├── services/           # API calls
│   ├── pages/              # Page components
│   └── components/         # Reusable components
└── .env                    # Frontend config
```

## What's Working Now

✅ User authentication (login/register)  
✅ Product browsing  
✅ Shopping cart  
✅ Wishlist  
✅ Vendor dashboard with stats  
✅ Admin dashboard with vendor approval  
✅ Toast notifications  
✅ Protected routes  
✅ Real-time Socket.IO  

## Next Steps

1. ✅ **Test everything** - Try all features
2. 🔄 **Add products** - Use vendor account
3. 🔄 **Place orders** - Complete checkout flow
4. 🔄 **Customize** - Modify UI/styling
5. 🔄 **Deploy** - Push to production

## Support

- Check `INTEGRATION-GUIDE.md` for detailed API docs
- Check `PROJECT-STATUS.md` for feature status
- Check `IMPLEMENTATION-SUMMARY.md` for what's complete

## Quick Commands Reference

```bash
# Backend
cd backend
npm run dev              # Start dev server
npx prisma studio        # Open Prisma Studio (DB GUI)
npx prisma db seed       # Reseed database

# Frontend  
cd frontend
npm run dev              # Start dev server
npm run build            # Build for production
```

---

**Time to Full Setup**: ~10 minutes  
**Ready for Development**: ✅  
**Ready for Testing**: ✅  
**Ready for Production**: ~85%

🎉 **Enjoy building your wholesale marketplace!**
