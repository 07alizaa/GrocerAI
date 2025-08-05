const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Order {
  static async create(orderData) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const {
        user_id, items, total_amount, discount_amount, delivery_fee, tax_amount,
        final_amount, coupon_id, payment_method, delivery_address, delivery_date, 
        delivery_time_slot, notes
      } = orderData;

      // Generate order number
      const order_number = 'DG' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();

      // Create order
      const orderResult = await client.query(`
        INSERT INTO orders (
          user_id, order_number, total_amount, discount_amount, delivery_fee,
          tax_amount, final_amount, coupon_id, payment_method, delivery_address, 
          delivery_date, delivery_time_slot, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `, [
        user_id, order_number, total_amount, discount_amount, delivery_fee,
        tax_amount, final_amount, coupon_id, payment_method, delivery_address, 
        delivery_date, delivery_time_slot, notes
      ]);

      const order = orderResult.rows[0];

      // Create order items and update product stock
      for (const item of items) {
        await client.query(`
          INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
          VALUES ($1, $2, $3, $4, $5)
        `, [order.id, item.product_id, item.quantity, item.unit_price, item.total_price]);

        // Update product stock
        await client.query(
          'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }

      // Clear user's cart
      await client.query('DELETE FROM cart WHERE user_id = $1', [user_id]);

      // Update coupon usage if applicable
      if (coupon_id) {
        await client.query(
          'UPDATE coupons SET used_count = used_count + 1 WHERE id = $1',
          [coupon_id]
        );
      }

      // Add status history
      await client.query(
        'INSERT INTO order_status_history (order_id, status, notes) VALUES ($1, $2, $3)',
        [order.id, 'pending', 'Order placed successfully']
      );

      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'product_name', p.name,
                 'product_image', p.image_urls[1],
                 'quantity', oi.quantity,
                 'unit_price', oi.unit_price,
                 'total_price', oi.total_price,
                 'unit', p.unit
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1
      GROUP BY o.id
    `, [id]);
    return result.rows[0];
  }

  static async findByUser(userId, limit = 10, offset = 0) {
    const result = await pool.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'product_name', p.name,
                 'product_image', p.image_urls[1],
                 'quantity', oi.quantity,
                 'unit_price', oi.unit_price
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);
    return result.rows;
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT o.*, u.name as customer_name, u.email as customer_email,
             json_agg(
               json_build_object(
                 'product_name', p.name,
                 'quantity', oi.quantity,
                 'unit_price', oi.unit_price
               )
             ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramIndex = 1;

    if (filters.status) {
      query += ` AND o.status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters.date_from) {
      query += ` AND o.created_at >= $${paramIndex}`;
      params.push(filters.date_from);
      paramIndex++;
    }

    if (filters.date_to) {
      query += ` AND o.created_at <= $${paramIndex}`;
      params.push(filters.date_to);
      paramIndex++;
    }

    query += ' GROUP BY o.id, u.name, u.email ORDER BY o.created_at DESC';

    const limit = filters.limit || 50;
    const offset = filters.offset || 0;
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async updateStatus(orderId, status, updatedBy, notes = '') {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const result = await client.query(
        'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [status, orderId]
      );

      await client.query(
        'INSERT INTO order_status_history (order_id, status, updated_by, notes) VALUES ($1, $2, $3, $4)',
        [orderId, status, updatedBy, notes]
      );

      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async cancel(orderId, reason, userId) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Check if order can be cancelled
      const orderResult = await client.query(
        'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
        [orderId, userId]
      );

      if (orderResult.rows.length === 0) {
        throw new Error('Order not found');
      }

      const order = orderResult.rows[0];
      if (!['pending', 'confirmed', 'processing'].includes(order.status)) {
        throw new Error('Order cannot be cancelled at this stage');
      }

      // Update order status
      await client.query(
        'UPDATE orders SET status = $1, cancelled_reason = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        ['cancelled', reason, orderId]
      );

      // Restore product stock
      const orderItems = await client.query(
        'SELECT product_id, quantity FROM order_items WHERE order_id = $1',
        [orderId]
      );

      for (const item of orderItems.rows) {
        await client.query(
          'UPDATE products SET stock_quantity = stock_quantity + $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );
      }

      // Add status history
      await client.query(
        'INSERT INTO order_status_history (order_id, status, updated_by, notes) VALUES ($1, $2, $3, $4)',
        [orderId, 'cancelled', userId, reason]
      );

      await client.query('COMMIT');
      return { success: true, message: 'Order cancelled successfully' };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getOrderStats() {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
        COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_orders,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders,
        SUM(final_amount) as total_revenue,
        AVG(final_amount) as average_order_value
      FROM orders
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    `);
    return result.rows[0];
  }
}

module.exports = Order;
