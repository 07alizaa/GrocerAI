const pool = require('../config/db');

class User {
  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async create(userData) {
    const { name, email, password, role = 'customer', phone } = userData;
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, phone, created_at',
      [name, email, password, role, phone]
    );
    return result.rows[0];
  }

  static async update(id, userData) {
    const { name, email, phone } = userData;
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, phone = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, email, phone, id]
    );
    return result.rows[0];
  }

  static async getAllCustomers() {
    const result = await pool.query('SELECT id, name, email, phone, is_active, created_at FROM users WHERE role = $1', ['customer']);
    return result.rows;
  }
}

module.exports = User;
