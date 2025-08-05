const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findByUser(req.user.userId);
    const cartTotal = await Cart.getCartTotal(req.user.userId);
    
    res.json({ 
      success: true, 
      data: {
        items: cartItems,
        total: cartTotal
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    
    if (!product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID and valid quantity are required' 
      });
    }

    // Check if product exists and is available
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock_quantity < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock available' 
      });
    }

    if (quantity > product.max_order_quantity) {
      return res.status(400).json({ 
        success: false, 
        message: `Maximum order quantity is ${product.max_order_quantity}` 
      });
    }

    const cartItem = await Cart.addItem(req.user.userId, product_id, quantity);
    
    res.json({ 
      success: true, 
      message: 'Product added to cart successfully',
      data: cartItem 
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid quantity is required' 
      });
    }

    // Check product availability
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock_quantity < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient stock available' 
      });
    }

    if (quantity > product.max_order_quantity) {
      return res.status(400).json({ 
        success: false, 
        message: `Maximum order quantity is ${product.max_order_quantity}` 
      });
    }

    const cartItem = await Cart.updateQuantity(req.user.userId, product_id, quantity);
    
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.json({ 
      success: true, 
      message: 'Cart updated successfully',
      data: cartItem 
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    
    const cartItem = await Cart.removeItem(req.user.userId, product_id);
    
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.json({ 
      success: true, 
      message: 'Product removed from cart successfully' 
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.clearCart(req.user.userId);
    
    res.json({ 
      success: true, 
      message: 'Cart cleared successfully' 
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
