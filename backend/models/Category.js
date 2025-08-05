const pool = require('../config/db');

class Category {
  static async findAll() {
    const result = await pool.query(`
      SELECT c.*, 
             COUNT(p.id) as product_count,
             pc.name as parent_name
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
      LEFT JOIN categories pc ON c.parent_id = pc.id
      WHERE c.is_active = true
      GROUP BY c.id, pc.name
      ORDER BY c.sort_order, c.name
    `);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(`
      SELECT c.*, 
             COUNT(p.id) as product_count,
             pc.name as parent_name
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
      LEFT JOIN categories pc ON c.parent_id = pc.id
      WHERE c.id = $1 AND c.is_active = true
      GROUP BY c.id, pc.name
    `, [id]);
    return result.rows[0];
  }

  static async findByParent(parentId) {
    const result = await pool.query(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
      WHERE c.parent_id = $1 AND c.is_active = true
      GROUP BY c.id
      ORDER BY c.sort_order, c.name
    `, [parentId]);
    return result.rows;
  }

  static async getMainCategories() {
    const result = await pool.query(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true
      WHERE c.parent_id IS NULL AND c.is_active = true
      GROUP BY c.id
      ORDER BY c.sort_order, c.name
    `);
    return result.rows;
  }

  static async create(categoryData) {
    const { name, description, image_url, parent_id, sort_order } = categoryData;
    const result = await pool.query(
      'INSERT INTO categories (name, description, image_url, parent_id, sort_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, image_url, parent_id, sort_order || 0]
    );
    return result.rows[0];
  }

  static async update(id, categoryData) {
    const { name, description, image_url, parent_id, sort_order, is_active } = categoryData;
    const result = await pool.query(
      'UPDATE categories SET name = $1, description = $2, image_url = $3, parent_id = $4, sort_order = $5, is_active = $6 WHERE id = $7 RETURNING *',
      [name, description, image_url, parent_id, sort_order, is_active, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('UPDATE categories SET is_active = false WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Category;
