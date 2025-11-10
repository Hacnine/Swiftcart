import express from 'express';
import { getDisputes, createDispute, updateDispute, resolveDispute } from '../controllers/dispute.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getDisputes);
router.post('/', createDispute);
router.put('/:id', updateDispute);

// Admin only
router.patch('/:id/resolve', authorize('ADMIN'), resolveDispute);

export default router;
