const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/authMiddleware');

// Customer routes
router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);
router.post('/:id/cancel', auth, orderController.cancelOrder);

// Admin routes
router.get('/', auth, adminAuth, orderController.getAllOrders);
router.put('/:id/status', auth, adminAuth, orderController.updateOrderStatus);
router.get('/admin/stats', auth, adminAuth, orderController.getOrderStats);

module.exports = router;
