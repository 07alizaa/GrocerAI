const Product = require('../models/Product');
const { validationResult } = require('express-validator');

const getAllProducts = async (req, res) => {
  try {
    const filters = {
      category_id: req.query.category_id,
      search: req.query.search,
      min_price: req.query.min_price,
      max_price: req.query.max_price,
      is_featured: req.query.is_featured === 'true',
      sort_by: req.query.sort_by,
      limit: parseInt(req.query.limit) || 20,
      offset: parseInt(req.query.offset) || 0
    };

    const products = await Product.findAll(filters);
    const totalCount = await Product.getCount(filters);

    res.json({
      success: true,
      data: products,
      pagination: {
        total: totalCount,
        page: Math.floor(filters.offset / filters.limit) + 1,
        limit: filters.limit,
        totalPages: Math.ceil(totalCount / filters.limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const product = await Product.update(req.params.id, req.body);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.delete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ is_featured: true, limit: 8 });
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.getLowStockProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get low stock products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const products = await Product.findAll({ 
      search: q, 
      limit: parseInt(req.query.limit) || 20,
      offset: parseInt(req.query.offset) || 0
    });

    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getLowStockProducts,
  searchProducts
};
