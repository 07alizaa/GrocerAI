const Order = require('../models/Order');
const Cart = require('../models/Cart');
const pool = require('../config/db');

const createOrder = async (req, res) => {
  try {
    const { 
      delivery_address, 
      payment_method, 
      coupon_code, 
      delivery_date, 
      delivery_time_slot, 
      notes 
    } = req.body;

    if (!delivery_address || !payment_method) {
      return res.status(400).json({ 
        success: false, 
        message: 'Delivery address and payment method are required' 
      });
    }

    // Get cart items
    const cartItems = await Cart.findByUser(req.user.userId);
    
    if (cartItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    // Calculate order totals
    let total_amount = 0;
    let discount_amount = 0;
    let delivery_fee = 50; // Fixed delivery fee
    let tax_amount = 0;
    let coupon_id = null;

    const items = cartItems.map(item => {
      const price = item.discounted_price || item.price;
      const itemTotal = price * item.quantity;
      total_amount += itemTotal;
      
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: price,
        total_price: itemTotal
      };
    });

    // Apply coupon if provided
    if (coupon_code) {
      const couponResult = await pool.query(
        'SELECT * FROM coupons WHERE code = $1 AND is_active = true AND valid_until > NOW()',
        [coupon_code]
      );

      if (couponResult.rows.length > 0) {
        const coupon = couponResult.rows[0];
        
        if (total_amount >= coupon.min_order_amount) {
          if (coupon.discount_type === 'percentage') {
            discount_amount = (total_amount * coupon.discount_value) / 100;
            if (coupon.max_discount_amount && discount_amount > coupon.max_discount_amount) {
              discount_amount = coupon.max_discount_amount;
            }
          } else {
            discount_amount = coupon.discount_value;
          }
          coupon_id = coupon.id;
        }
      }
    }

    // Calculate tax (assume 5% GST)
    tax_amount = (total_amount - discount_amount) * 0.05;
    
    const final_amount = total_amount - discount_amount + delivery_fee + tax_amount;

    const orderData = {
      user_id: req.user.userId,
      items,
      total_amount,
      discount_amount,
      delivery_fee,
      tax_amount,
      final_amount,
      coupon_id,
      payment_method,
      delivery_address: JSON.stringify({ address: delivery_address }), // Convert to JSON
      delivery_date,
      delivery_time_slot,
      notes
    };

    const order = await Order.create(orderData);
    
    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully',
      order: order 
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (req.user.role !== 'admin' && order.user_id !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const orders = await Order.findByUser(req.user.userId, limit, offset);
    
    res.json({ 
      success: true, 
      data: orders,
      pagination: {
        page,
        limit,
        total: orders.length
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      date_from: req.query.date_from,
      date_to: req.query.date_to,
      limit: parseInt(req.query.limit) || 50,
      offset: parseInt(req.query.offset) || 0
    };

    const orders = await Order.findAll(filters);
    
    res.json({ 
      success: true, 
      data: orders 
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status is required' 
      });
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }

    const order = await Order.updateStatus(req.params.id, status, req.user.userId, notes);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ 
      success: true, 
      message: 'Order status updated successfully',
      data: order 
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cancellation reason is required' 
      });
    }

    const result = await Order.cancel(req.params.id, reason, req.user.userId);
    
    res.json({ 
      success: true, 
      message: result.message 
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    if (error.message === 'Order not found' || error.message === 'Order cannot be cancelled at this stage') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.getOrderStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
};
