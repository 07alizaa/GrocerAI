const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { auth, adminAuth } = require('../middleware/authMiddleware');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/main', categoryController.getMainCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/subcategories', categoryController.getSubcategories);

// Admin routes
router.post('/', 
  auth, 
  adminAuth,
  [
    body('name').trim().isLength({ min: 1 }).withMessage('Category name is required')
  ],
  categoryController.createCategory
);

router.put('/:id', 
  auth, 
  adminAuth,
  [
    body('name').trim().isLength({ min: 1 }).withMessage('Category name is required')
  ],
  categoryController.updateCategory
);

router.delete('/:id', auth, adminAuth, categoryController.deleteCategory);

module.exports = router;
