const pool = require('../config/db');

class AiChatHistory {
  // Save a new chat message
  static async saveChatMessage({
    userId,
    sessionId,
    messageType,
    messageText,
    chatType = 'general',
    metadata = null,
    responseTimeMs = null
  }) {
    try {
      const query = `
        INSERT INTO ai_chat_history 
        (user_id, session_id, message_type, message_text, chat_type, metadata, response_time_ms)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      
      const values = [
        userId,
        sessionId,
        messageType,
        messageText,
        chatType,
        metadata ? JSON.stringify(metadata) : null,
        responseTimeMs
      ];
      
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error saving chat message:', error);
      throw error;
    }
  }

  // Get chat history for a user
  static async getUserChatHistory(userId, limit = 50, sessionId = null) {
    try {
      let query = `
        SELECT * FROM ai_chat_history 
        WHERE user_id = $1
      `;
      const values = [userId];

      if (sessionId) {
        query += ` AND session_id = $2`;
        values.push(sessionId);
      }

      query += ` ORDER BY created_at DESC LIMIT $${values.length + 1}`;
      values.push(limit);

      const result = await pool.query(query, values);
      
      // Parse metadata JSON for each row
      return result.rows.map(row => ({
        ...row,
        metadata: row.metadata ? JSON.parse(row.metadata) : null
      }));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }

  // Get recent chat sessions for a user
  static async getUserChatSessions(userId, limit = 10) {
    try {
      const query = `
        SELECT 
          session_id,
          chat_type,
          COUNT(*) as message_count,
          MAX(created_at) as last_message_at,
          MIN(created_at) as first_message_at
        FROM ai_chat_history 
        WHERE user_id = $1 AND session_id IS NOT NULL
        GROUP BY session_id, chat_type
        ORDER BY last_message_at DESC 
        LIMIT $2
      `;
      
      const result = await pool.query(query, [userId, limit]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      throw error;
    }
  }

  // Clear chat history for a user (or specific session)
  static async clearChatHistory(userId, sessionId = null) {
    try {
      let query = `DELETE FROM ai_chat_history WHERE user_id = $1`;
      const values = [userId];

      if (sessionId) {
        query += ` AND session_id = $2`;
        values.push(sessionId);
      }

      const result = await pool.query(query, values);
      return result.rowCount;
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }
  }

  // Get analytics data for admin
  static async getAnalytics(startDate = null, endDate = null) {
    try {
      let dateFilter = '';
      const values = [];

      if (startDate && endDate) {
        dateFilter = 'WHERE created_at >= $1 AND created_at <= $2';
        values.push(startDate, endDate);
      } else if (startDate) {
        dateFilter = 'WHERE created_at >= $1';
        values.push(startDate);
      }

      const query = `
        SELECT 
          COUNT(*) as total_interactions,
          COUNT(DISTINCT user_id) as unique_users,
          AVG(response_time_ms) as avg_response_time,
          COUNT(DISTINCT session_id) as total_sessions,
          chat_type,
          COUNT(*) as type_count
        FROM ai_chat_history 
        ${dateFilter}
        GROUP BY chat_type
        ORDER BY type_count DESC
      `;

      const result = await pool.query(query, values);
      
      // Get popular queries
      const popularQueriesQuery = `
        SELECT 
          LEFT(message_text, 100) as query_preview,
          COUNT(*) as frequency
        FROM ai_chat_history 
        WHERE message_type = 'user' ${dateFilter ? dateFilter.replace('WHERE', 'AND') : ''}
        GROUP BY LEFT(message_text, 100)
        ORDER BY frequency DESC
        LIMIT 10
      `;

      const popularResult = await pool.query(popularQueriesQuery, values);

      return {
        overview: result.rows,
        popularQueries: popularResult.rows
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  // Update daily analytics
  static async updateDailyAnalytics(date = new Date()) {
    try {
      const dateStr = date.toISOString().split('T')[0];
      
      // Get today's stats
      const statsQuery = `
        SELECT 
          COUNT(*) as total_interactions,
          COUNT(DISTINCT user_id) as unique_users,
          AVG(response_time_ms) as avg_response_time
        FROM ai_chat_history 
        WHERE DATE(created_at) = $1
      `;
      
      const statsResult = await pool.query(statsQuery, [dateStr]);
      const stats = statsResult.rows[0];

      // Get popular queries for today
      const queriesQuery = `
        SELECT 
          LEFT(message_text, 50) as query,
          COUNT(*) as count
        FROM ai_chat_history 
        WHERE DATE(created_at) = $1 AND message_type = 'user'
        GROUP BY LEFT(message_text, 50)
        ORDER BY count DESC
        LIMIT 5
      `;
      
      const queriesResult = await pool.query(queriesQuery, [dateStr]);

      // Get chat types breakdown
      const typesQuery = `
        SELECT 
          chat_type,
          COUNT(*) as count
        FROM ai_chat_history 
        WHERE DATE(created_at) = $1
        GROUP BY chat_type
      `;
      
      const typesResult = await pool.query(typesQuery, [dateStr]);

      // Upsert into analytics table
      const upsertQuery = `
        INSERT INTO ai_analytics 
        (date, total_interactions, unique_users, avg_response_time_ms, popular_queries, chat_types_breakdown)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (date) 
        DO UPDATE SET 
          total_interactions = EXCLUDED.total_interactions,
          unique_users = EXCLUDED.unique_users,
          avg_response_time_ms = EXCLUDED.avg_response_time_ms,
          popular_queries = EXCLUDED.popular_queries,
          chat_types_breakdown = EXCLUDED.chat_types_breakdown,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;

      const result = await pool.query(upsertQuery, [
        dateStr,
        stats.total_interactions || 0,
        stats.unique_users || 0,
        stats.avg_response_time || null,
        JSON.stringify(queriesResult.rows),
        JSON.stringify(typesResult.rows)
      ]);

      return result.rows[0];
    } catch (error) {
      console.error('Error updating daily analytics:', error);
      throw error;
    }
  }
}

module.exports = AiChatHistory;
