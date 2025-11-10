import express from 'express';
import { getReviews, createReview, updateReview, deleteReview, addVendorReply } from '../controllers/review.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/product/:productId', getReviews);

// Protected routes
router.use(protect);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

// Vendor routes
router.post('/:id/reply', authorize('SELLER'), addVendorReply);

export default router;
