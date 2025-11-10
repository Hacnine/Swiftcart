import express from 'express';
import { getBrands, getBrand, createBrand, updateBrand, deleteBrand } from '../controllers/brand.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getBrands);
router.get('/:id', getBrand);

// Protected routes - Admin only
router.post('/', protect, authorize('ADMIN'), createBrand);
router.put('/:id', protect, authorize('ADMIN'), updateBrand);
router.delete('/:id', protect, authorize('ADMIN'), deleteBrand);

export default router;
