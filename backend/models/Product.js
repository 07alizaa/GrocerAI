const pool = require('../config/db');

class Product {
  static async findAll(filters = {}) {
    let query = `
      SELECT p.*, c.name as category_name,
             COALESCE(AVG(pr.rating), 0) as average_rating,
             COUNT(pr.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = true
      WHERE p.is_active = true
    `;
    
    const params = [];
    let paramIndex = 1;

    if (filters.category_id) {
      query += ` AND p.category_id = $${paramIndex}`;
      params.push(filters.category_id);
      paramIndex++;
    }

    if (filters.search) {
      query += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    if (filters.min_price) {
      query += ` AND p.price >= $${paramIndex}`;
      params.push(filters.min_price);
      paramIndex++;
    }

    if (filters.max_price) {
      query += ` AND p.price <= $${paramIndex}`;
      params.push(filters.max_price);
      paramIndex++;
    }

    if (filters.is_featured) {
      query += ` AND p.is_featured = true`;
    }

    query += ' GROUP BY p.id, c.name';

    if (filters.sort_by) {
      switch (filters.sort_by) {
        case 'price_asc':
          query += ' ORDER BY p.price ASC';
          break;
        case 'price_desc':
          query += ' ORDER BY p.price DESC';
          break;
        case 'rating':
          query += ' ORDER BY average_rating DESC';
          break;
        case 'newest':
          query += ' ORDER BY p.created_at DESC';
          break;
        default:
          query += ' ORDER BY p.name ASC';
      }
    } else {
      query += ' ORDER BY p.created_at DESC';
    }

    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name,
             COALESCE(AVG(pr.rating), 0) as average_rating,
             COUNT(pr.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = true
      WHERE p.id = $1
      GROUP BY p.id, c.name
    `, [id]);
    return result.rows[0];
  }

  static async create(productData) {
    const {
      name, description, price, discounted_price, sku, category_id, brand,
      unit, stock_quantity, min_stock_level, max_order_quantity, image_urls,
      nutrition_info, tags, is_featured, weight, dimensions
    } = productData;

    const result = await pool.query(`
      INSERT INTO products (
        name, description, price, discounted_price, sku, category_id, brand,
        unit, stock_quantity, min_stock_level, max_order_quantity, image_urls,
        nutrition_info, tags, is_featured, weight, dimensions
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *
    `, [
      name, description, price, discounted_price, sku, category_id, brand,
      unit, stock_quantity, min_stock_level, max_order_quantity, image_urls,
      nutrition_info, tags, is_featured, weight, dimensions
    ]);
    return result.rows[0];
  }

  static async update(id, productData) {
    const {
      name, description, price, discounted_price, category_id, brand,
      unit, stock_quantity, min_stock_level, max_order_quantity, image_urls,
      nutrition_info, tags, is_active, is_featured, weight, dimensions
    } = productData;

    const result = await pool.query(`
      UPDATE products SET
        name = $1, description = $2, price = $3, discounted_price = $4,
        category_id = $5, brand = $6, unit = $7, stock_quantity = $8,
        min_stock_level = $9, max_order_quantity = $10, image_urls = $11,
        nutrition_info = $12, tags = $13, is_active = $14, is_featured = $15,
        weight = $16, dimensions = $17, updated_at = CURRENT_TIMESTAMP
      WHERE id = $18
      RETURNING *
    `, [
      name, description, price, discounted_price, category_id, brand,
      unit, stock_quantity, min_stock_level, max_order_quantity, image_urls,
      nutrition_info, tags, is_active, is_featured, weight, dimensions, id
    ]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('UPDATE products SET is_active = false WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async updateStock(id, quantity) {
    const result = await pool.query(
      'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return result.rows[0];
  }

  static async getLowStockProducts() {
    const result = await pool.query(
      'SELECT * FROM products WHERE stock_quantity <= min_stock_level AND is_active = true'
    );
    return result.rows;
  }

  static async getCount(filters = {}) {
    let query = 'SELECT COUNT(*) FROM products WHERE is_active = true';
    const params = [];
    let paramIndex = 1;

    if (filters.category_id) {
      query += ` AND category_id = $${paramIndex}`;
      params.push(filters.category_id);
      paramIndex++;
    }

    if (filters.search) {
      query += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].count);
  }
}

module.exports = Product;
