import express from 'express';
import { getCoupons, validateCoupon, createCoupon, updateCoupon, deleteCoupon } from '../controllers/coupon.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/validate', protect, validateCoupon);

// Admin routes
router.use(protect, authorize('ADMIN'));
router.get('/', getCoupons);
router.post('/', createCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;
