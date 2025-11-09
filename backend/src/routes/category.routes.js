import express from 'express';
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory, getCategoryTree } from '../controllers/category.controller.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/tree', getCategoryTree);
router.get('/:id', getCategory);

// Protected routes - Admin only
router.post('/', protect, authorize('ADMIN'), createCategory);
router.put('/:id', protect, authorize('ADMIN'), updateCategory);
router.delete('/:id', protect, authorize('ADMIN'), deleteCategory);

export default router;
