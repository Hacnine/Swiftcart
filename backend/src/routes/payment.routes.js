import express from 'express';
import { createPaymentIntent, handleWebhook, getPaymentMethods } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Webhook (no auth required)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.use(protect);
router.post('/create-intent', createPaymentIntent);
router.get('/methods', getPaymentMethods);

export default router;
