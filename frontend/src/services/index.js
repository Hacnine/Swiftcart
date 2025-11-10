import api from './api';

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
  updatePassword: (data) => api.put('/auth/update-password', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
};

// Product Services
export const productService = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  searchProducts: (query) => api.get('/products/search', { params: { q: query } }),
  getFeatured: () => api.get('/products/featured'),
  getNewArrivals: () => api.get('/products/new-arrivals'),
  getBestSellers: () => api.get('/products/best-sellers'),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Cart Services
export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart', data),
  updateCartItem: (itemId, data) => api.put(`/cart/${itemId}`, data),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

// Wishlist Services
export const wishlistService = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post(`/wishlist/${productId}`),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
};

// Order Services
export const orderService = {
  createOrder: (data) => api.post('/orders', data),
  getOrders: (params) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id, reason) => api.patch(`/orders/${id}/cancel`, { reason }),
};

// Vendor Services
export const vendorService = {
  registerVendor: (data) => api.post('/vendors/register', data),
  getProfile: () => api.get('/vendors/profile'),
  updateProfile: (data) => api.put('/vendors/profile', data),
  getStats: () => api.get('/vendors/stats'),
  getOrders: (params) => api.get('/vendors/orders', { params }),
  updateOrderStatus: (orderId, data) => api.patch(`/vendors/orders/${orderId}/status`, data),
};

// Review Services
export const reviewService = {
  getReviews: (productId, params) => api.get(`/reviews/product/${productId}`, { params }),
  createReview: (data) => api.post('/reviews', data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
  addVendorReply: (id, reply) => api.post(`/reviews/${id}/reply`, { vendorReply: reply }),
};

// Category Services
export const categoryService = {
  getCategories: () => api.get('/categories'),
  getCategoryTree: () => api.get('/categories/tree'),
  getCategory: (id) => api.get(`/categories/${id}`),
};

// Brand Services
export const brandService = {
  getBrands: () => api.get('/brands'),
  getBrand: (id) => api.get(`/brands/${id}`),
};

// Message Services
export const messageService = {
  getConversations: () => api.get('/messages'),
  getConversation: (id) => api.get(`/messages/${id}`),
  createConversation: (data) => api.post('/messages', data),
  sendMessage: (conversationId, data) => api.post(`/messages/${conversationId}/messages`, data),
  markAsRead: (messageId) => api.patch(`/messages/messages/${messageId}/read`),
};

// Notification Services
export const notificationService = {
  getNotifications: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
};

// Upload Services
export const uploadService = {
  uploadSingle: (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return api.post('/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadMultiple: (files, folder) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('folder', folder);
    return api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Address Services
export const addressService = {
  getAddresses: () => api.get('/users/addresses'),
  createAddress: (data) => api.post('/users/addresses', data),
  updateAddress: (id, data) => api.put(`/users/addresses/${id}`, data),
  deleteAddress: (id) => api.delete(`/users/addresses/${id}`),
  setDefaultAddress: (id) => api.patch(`/users/addresses/${id}/default`),
};

// Admin Services
export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  approveVendor: (id) => api.patch(`/admin/vendors/${id}/approve`),
  rejectVendor: (id, reason) => api.patch(`/admin/vendors/${id}/reject`, { reason }),
};

// Payment Services
export const paymentService = {
  createPaymentIntent: (data) => api.post('/payment/create-intent', data),
  getPaymentMethods: () => api.get('/payment/methods'),
};

// Coupon Services
export const couponService = {
  validateCoupon: (data) => api.post('/coupons/validate', data),
};

export default api;
