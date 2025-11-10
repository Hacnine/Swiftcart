import express from 'express';
import {
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  getVendorStats,
  getVendorOrders,
  updateOrderStatus,
} from '../controllers/vendor.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Vendor registration (for buyers who want to become sellers)
router.post('/register', protect, authorize('BUYER', 'SELLER'), registerVendor);

// Protected routes - Seller only
router.use(protect, authorize('SELLER'));

router.get('/profile', getVendorProfile);
router.put('/profile', updateVendorProfile);
router.get('/stats', getVendorStats);
router.get('/orders', getVendorOrders);
router.patch('/orders/:orderId/status', updateOrderStatus);

export default router;
