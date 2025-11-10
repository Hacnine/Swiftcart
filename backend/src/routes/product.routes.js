import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByVendor,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  searchProducts,
  updateProductStock,
  addProductVariant,
  updateProductVariant,
  deleteProductVariant,
} from '../controllers/product.controller.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/best-sellers', getBestSellers);
router.get('/vendor/:vendorId', getProductsByVendor);
router.get('/:id', optionalAuth, getProduct);

// Protected routes - Seller only
router.post('/', protect, authorize('SELLER'), createProduct);
router.put('/:id', protect, authorize('SELLER'), updateProduct);
router.delete('/:id', protect, authorize('SELLER'), deleteProduct);
router.patch('/:id/stock', protect, authorize('SELLER'), updateProductStock);

// Variants
router.post('/:id/variants', protect, authorize('SELLER'), addProductVariant);
router.put('/:id/variants/:variantId', protect, authorize('SELLER'), updateProductVariant);
router.delete('/:id/variants/:variantId', protect, authorize('SELLER'), deleteProductVariant);

export default router;
