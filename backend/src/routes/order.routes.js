import express from 'express';
import { getOrders, getOrder, createOrder, cancelOrder, getUserOrders } from '../controllers/order.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getUserOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.patch('/:id/cancel', cancelOrder);

// Admin routes
router.get('/all', authorize('ADMIN'), getOrders);

export default router;
