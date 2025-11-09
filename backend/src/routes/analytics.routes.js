import express from 'express';
import { trackEvent, getAnalytics } from '../controllers/analytics.controller.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public route (with optional auth)
router.post('/track', optionalAuth, trackEvent);

// Admin only
router.get('/', protect, authorize('ADMIN'), getAnalytics);

export default router;
