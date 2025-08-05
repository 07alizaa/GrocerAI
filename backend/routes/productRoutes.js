const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const { auth, adminAuth } = require('../middleware/authMiddleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/search', productController.searchProducts);
router.get('/admin/low-stock', auth, adminAuth, productController.getLowStockProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', 
  auth, 
  adminAuth,
  [
    body('name').trim().isLength({ min: 1 }).withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('unit').trim().isLength({ min: 1 }).withMessage('Unit is required'),
    body('stock_quantity').isInt({ min: 0 }).withMessage('Valid stock quantity is required'),
    body('category_id').isInt({ min: 1 }).withMessage('Valid category ID is required')
  ],
  productController.createProduct
);

router.put('/:id', 
  auth, 
  adminAuth,
  [
    body('name').trim().isLength({ min: 1 }).withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('unit').trim().isLength({ min: 1 }).withMessage('Unit is required'),
    body('stock_quantity').isInt({ min: 0 }).withMessage('Valid stock quantity is required'),
    body('category_id').isInt({ min: 1 }).withMessage('Valid category ID is required')
  ],
  productController.updateProduct
);

router.delete('/:id', auth, adminAuth, productController.deleteProduct);

module.exports = router;
