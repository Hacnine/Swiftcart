# Wholesale Marketplace Backend

A comprehensive AliExpress-like wholesale marketplace backend built with Node.js, Express, Prisma, and MongoDB.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (Buyer, Seller, Admin)
- Password reset and email verification
- Secure session management

### 👥 Multi-Vendor Support
- Vendor registration and approval workflow
- Vendor dashboard with analytics
- Store customization (name, logo, banner, description)
- Vendor verification system

### 📦 Advanced Product Management
- Full CRUD operations for products
- Product variants with attributes
- Bulk pricing tiers for wholesale
- Minimum order quantities (MOQ)
- Product specifications and images
- SEO optimization (meta tags, slugs)
- Inventory tracking
- Featured/New Arrival/Best Seller flags

### 🛒 Shopping Features
- Cart management with multi-vendor support
- Wishlist functionality
- Advanced search with filters
- Category and brand filtering
- Price range filtering
- Pagination and sorting

### 💳 Order Management
- Multi-vendor order processing
- Order tracking with status updates
- Shipping integration
- Order cancellation
- Order history

### ⭐ Reviews & Ratings
- Verified purchase reviews
- Star ratings (1-5)
- Image uploads with reviews
- Vendor reply to reviews
- Helpful votes

### 💬 Messaging System
- Real-time buyer-seller communication
- Product inquiries
- Order discussions
- Socket.IO integration

### ⚖️ Dispute Resolution
- Dispute creation and tracking
- Admin mediation
- Evidence upload
- Resolution tracking

### 🎫 Promotions & Coupons
- Percentage and fixed amount discounts
- Minimum purchase requirements
- Usage limits
- Date range validity
- Vendor/category/product restrictions

### 💰 Payment Integration
- Stripe integration
- Webhook handling
- Multiple payment methods
- Payment status tracking

### 📊 Analytics & Reporting
- Event tracking
- User behavior analytics
- Vendor performance metrics
- Sales reports

### 🔔 Notification System
- Real-time notifications
- Email notifications
- Order status updates
- Vendor approval notifications

### 👨‍💼 Admin Dashboard
- User management
- Vendor approval workflow
- Product moderation
- Order overview
- Analytics and reports

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Prisma ORM
- **Authentication:** JWT with bcrypt
- **File Upload:** Cloudinary
- **Payment:** Stripe
- **Email:** Nodemailer
- **Real-time:** Socket.IO
- **Security:** Helmet, CORS, Rate Limiting

## Installation

### Prerequisites

- Node.js >= 18.x
- MongoDB Atlas account or local MongoDB
- Cloudinary account (for image uploads)
- Stripe account (for payments)

### Setup Steps

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration:**
   
   Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

   Update the following variables in `.env`:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/wholesale_marketplace?retryWrites=true&w=majority"

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_REFRESH_SECRET=your_refresh_token_secret

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret

   # Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   EMAIL_FROM=noreply@wholesale-marketplace.com

   # Frontend
   FRONTEND_URL=http://localhost:5173
   ```

3. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

4. **Push Database Schema:**
   ```bash
   npm run prisma:push
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user
- `PUT /update-profile` - Update profile
- `PUT /update-password` - Change password
- `POST /forgot-password` - Request password reset
- `PUT /reset-password/:token` - Reset password
- `POST /refresh-token` - Refresh access token
- `GET /verify-email/:token` - Verify email

### Products (`/api/products`)
- `GET /` - Get all products (with filters)
- `GET /search` - Search products
- `GET /featured` - Get featured products
- `GET /new-arrivals` - Get new arrivals
- `GET /best-sellers` - Get best sellers
- `GET /vendor/:vendorId` - Get vendor products
- `GET /:id` - Get single product
- `POST /` - Create product (Seller)
- `PUT /:id` - Update product (Seller)
- `DELETE /:id` - Delete product (Seller)
- `PATCH /:id/stock` - Update stock (Seller)

### Vendors (`/api/vendors`)
- `POST /register` - Register as vendor
- `GET /profile` - Get vendor profile
- `PUT /profile` - Update vendor profile
- `GET /stats` - Get vendor statistics
- `GET /orders` - Get vendor orders
- `PATCH /orders/:orderId/status` - Update order status

### Orders (`/api/orders`)
- `GET /` - Get user orders
- `GET /:id` - Get order details
- `POST /` - Create order
- `PATCH /:id/cancel` - Cancel order

### Cart (`/api/cart`)
- `GET /` - Get cart
- `POST /` - Add to cart
- `PUT /:itemId` - Update cart item
- `DELETE /:itemId` - Remove from cart
- `DELETE /` - Clear cart

### Wishlist (`/api/wishlist`)
- `GET /` - Get wishlist
- `POST /:productId` - Add to wishlist
- `DELETE /:productId` - Remove from wishlist

### Reviews (`/api/reviews`)
- `GET /product/:productId` - Get product reviews
- `POST /` - Create review
- `PUT /:id` - Update review
- `DELETE /:id` - Delete review
- `POST /:id/reply` - Add vendor reply (Seller)

### Messages (`/api/messages`)
- `GET /` - Get conversations
- `GET /:id` - Get conversation messages
- `POST /` - Create conversation
- `POST /:id/messages` - Send message
- `PATCH /messages/:messageId/read` - Mark as read

### Admin (`/api/admin`)
- `GET /stats` - Dashboard statistics
- `GET /users` - Get all users
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `PATCH /vendors/:id/approve` - Approve vendor
- `PATCH /vendors/:id/reject` - Reject vendor

## Database Schema

The Prisma schema includes:

- **User** - User accounts with role-based access
- **Vendor** - Vendor/seller profiles
- **Product** - Product catalog with variants
- **Category** - Hierarchical product categories
- **Brand** - Product brands
- **Order** - Order management
- **OrderItem** - Order line items
- **CartItem** - Shopping cart
- **WishlistItem** - Wishlist
- **Review** - Product reviews
- **Message** - Messaging system
- **Conversation** - Message threads
- **Notification** - User notifications
- **Dispute** - Order disputes
- **Coupon** - Promotional coupons
- **Address** - Shipping addresses
- **AnalyticsEvent** - Event tracking

## Security Features

- JWT token authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet for security headers
- Input validation with express-validator
- MongoDB injection prevention
- XSS protection

## Socket.IO Events

Real-time events:
- `new-message` - New message received
- `notification` - New notification
- `order-update` - Order status changed

## Development

### Run Prisma Studio
```bash
npm run prisma:studio
```

### View Database
Visit `http://localhost:5555` to view and edit database records

### Code Structure
```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   ├── database.js        # Prisma client
│   │   └── cloudinary.js      # Cloudinary config
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Express middleware
│   ├── routes/                # API routes
│   ├── utils/                 # Utility functions
│   └── server.js              # Entry point
├── .env                       # Environment variables
└── package.json
```

## Deployment

### MongoDB Atlas Setup
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `DATABASE_URL` in `.env`

### Environment Variables
Ensure all production environment variables are set:
- Use strong JWT secrets
- Enable Stripe live mode
- Configure production SMTP
- Set production CORS origins

### Start Production Server
```bash
npm start
```

## API Testing

Use tools like:
- Postman
- Thunder Client (VS Code extension)
- cURL

Import the API collection and test all endpoints.

## Support

For issues or questions, please create an issue in the repository.

## License

MIT
