const pool = require('../config/db');

class Cart {
  static async findByUser(userId) {
    const result = await pool.query(`
      SELECT c.*, p.name, p.price, p.discounted_price, p.image_urls, p.stock_quantity, p.unit, p.max_order_quantity,
             p.id as product_id
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1 AND p.is_active = true
      ORDER BY c.created_at DESC
    `, [userId]);
    
    // Map the results to ensure we have both id and product_id for consistency
    return result.rows.map(row => ({
      ...row,
      id: row.product_id, // Ensure id field is the product ID for frontend compatibility
    }));
  }

  static async addItem(userId, productId, quantity) {
    const result = await pool.query(`
      INSERT INTO cart (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, product_id)
      DO UPDATE SET quantity = cart.quantity + $3, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `, [userId, productId, quantity]);
    return result.rows[0];
  }

  static async updateQuantity(userId, productId, quantity) {
    const result = await pool.query(
      'UPDATE cart SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [quantity, userId, productId]
    );
    return result.rows[0];
  }

  static async removeItem(userId, productId) {
    const result = await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId]
    );
    return result.rows[0];
  }

  static async clearCart(userId) {
    const result = await pool.query('DELETE FROM cart WHERE user_id = $1', [userId]);
    return result.rowCount;
  }

  static async getCartTotal(userId) {
    const result = await pool.query(`
      SELECT 
        SUM(c.quantity * COALESCE(p.discounted_price, p.price)) as total_amount,
        COUNT(c.id) as item_count,
        SUM(c.quantity) as total_quantity
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1 AND p.is_active = true
    `, [userId]);
    return result.rows[0];
  }
}

module.exports = Cart;
