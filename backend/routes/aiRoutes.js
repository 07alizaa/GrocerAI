const express = require('express');
const router = express.Router();
const { auth: authMiddleware } = require('../middleware/authMiddleware');
const AiChatHistory = require('../models/AiChatHistory');
const { v4: uuidv4 } = require('uuid');

// Simple rate limiting for AI chat requests (since express-rate-limit might have issues)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 50;

const chatRateLimit = (req, res, next) => {
  const clientId = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(clientId)) {
    requestCounts.set(clientId, []);
  }
  
  const requests = requestCounts.get(clientId);
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      error: 'Too many AI chat requests, please try again later.'
    });
  }
  
  recentRequests.push(now);
  requestCounts.set(clientId, recentRequests);
  
  next();
};

// Gemini AI Chat endpoint
router.post('/chat', authMiddleware, chatRateLimit, async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { message, conversationHistory = [], sessionId, chatType = 'general' } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({
        success: false,
        error: 'AI service is currently unavailable'
      });
    }

    // Generate session ID if not provided
    const currentSessionId = sessionId || uuidv4();

    // Save user message to database
    await AiChatHistory.saveChatMessage({
      userId: req.user.id,
      sessionId: currentSessionId,
      messageType: 'user',
      messageText: message,
      chatType: chatType
    });

    // Import Gemini SDK
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Build conversation context for Gemini
    let conversationContext = `You are GrocerAI, a helpful and friendly AI assistant for a grocery shopping platform called GrocerAI. Your role is to help users with:

1. Meal planning and recipe suggestions
2. Grocery shopping advice and product recommendations
3. Nutritional information and dietary guidance
4. Cooking tips and ingredient substitutions
5. Budget-friendly shopping strategies
6. Seasonal produce recommendations
7. Food storage and preservation tips

Please be helpful, concise, and focus on grocery and food-related topics. If users ask about non-food topics, politely redirect them back to grocery and cooking assistance.

Previous conversation:
`;

    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-10).forEach(msg => { // Keep last 10 messages for context
        conversationContext += `${msg.role === 'user' ? 'User' : 'GrocerAI'}: ${msg.content}\n`;
      });
    }

    conversationContext += `User: ${message}\nGrocerAI: `;

    // Generate response using Gemini
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const aiResponse = response.text();

    const responseTime = Date.now() - startTime;

    // Save AI response to database
    await AiChatHistory.saveChatMessage({
      userId: req.user.id,
      sessionId: currentSessionId,
      messageType: 'assistant',
      messageText: aiResponse,
      chatType: chatType,
      responseTimeMs: responseTime
    });

    // Log for debugging (remove in production)
    console.log('AI Chat Request:', {
      user: req.user.id,
      sessionId: currentSessionId,
      chatType: chatType,
      message: message.substring(0, 100) + '...',
      responseLength: aiResponse.length,
      responseTime: responseTime + 'ms'
    });

    res.json({
      success: true,
      data: {
        message: aiResponse,
        sessionId: currentSessionId,
        chatType: chatType,
        responseTime: responseTime,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    
    // Handle specific Gemini API errors
    if (error.message && error.message.includes('API key')) {
      return res.status(500).json({
        success: false,
        error: 'AI service configuration error'
      });
    }

    if (error.message && error.message.includes('quota')) {
      return res.status(429).json({
        success: false,
        error: 'AI service is temporarily busy, please try again shortly'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Sorry, I\'m having trouble processing your request right now. Please try again in a moment.'
    });
  }
});

// Health check endpoint for AI service
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      service: 'GrocerAI Chat Assistant',
      status: 'operational',
      timestamp: new Date().toISOString()
    }
  });
});

// Get user's chat history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { sessionId, limit = 50 } = req.query;
    
    const chatHistory = await AiChatHistory.getUserChatHistory(
      req.user.id, 
      parseInt(limit), 
      sessionId
    );

    res.json({
      success: true,
      data: chatHistory
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat history'
    });
  }
});

// Get user's chat sessions
router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const sessions = await AiChatHistory.getUserChatSessions(
      req.user.id, 
      parseInt(limit)
    );

    res.json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat sessions'
    });
  }
});

// Clear user's chat history
router.delete('/history', authMiddleware, async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    const deletedCount = await AiChatHistory.clearChatHistory(
      req.user.id, 
      sessionId
    );

    res.json({
      success: true,
      data: {
        deletedCount,
        message: sessionId 
          ? `Cleared session ${sessionId}` 
          : 'Cleared all chat history'
      }
    });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear chat history'
    });
  }
});

// AI Product Recommendations endpoint
router.get('/recommendations', authMiddleware, async (req, res) => {
  const startTime = Date.now();
  
  try {
    const pool = require('../config/db');
    
    // Get user's recent purchase history
    const purchaseHistoryQuery = `
      SELECT DISTINCT p.name, p.description, c.name as category_name, oi.quantity
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = $1 AND o.status = 'delivered'
      ORDER BY o.created_at DESC
      LIMIT 20
    `;
    
    const purchaseHistory = await pool.query(purchaseHistoryQuery, [req.user.id]);
    
    // Get current cart items
    const cartQuery = `
      SELECT p.name, p.description, c.name as category_name, cart.quantity
      FROM cart
      JOIN products p ON cart.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE cart.user_id = $1
    `;
    
    const cartItems = await pool.query(cartQuery, [req.user.id]);
    
    // Get available products for recommendations (excluding already purchased/in cart)
    const excludeProductsQuery = `
      SELECT DISTINCT p.id FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id
      LEFT JOIN cart c ON p.id = c.product_id
      WHERE (o.user_id = $1 AND o.status = 'delivered') OR c.user_id = $1
    `;
    
    const excludeProducts = await pool.query(excludeProductsQuery, [req.user.id]);
    const excludedIds = excludeProducts.rows.map(row => row.id);
    
    const availableProductsQuery = `
      SELECT p.name, p.description, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true 
      ${excludedIds.length > 0 ? `AND p.id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(',')})` : ''}
      ORDER BY p.created_at DESC
      LIMIT 50
    `;
    
    const availableProducts = await pool.query(
      availableProductsQuery, 
      [req.user.id, ...excludedIds]
    );

    // Prepare AI prompt
    const purchaseHistoryText = purchaseHistory.rows.length > 0 
      ? purchaseHistory.rows.map(item => `${item.name} (${item.category_name}, qty: ${item.quantity})`).join(', ')
      : 'No purchase history';
      
    const cartItemsText = cartItems.rows.length > 0
      ? cartItems.rows.map(item => `${item.name} (${item.category_name}, qty: ${item.quantity})`).join(', ')
      : 'Empty cart';
      
    const availableProductsText = availableProducts.rows.slice(0, 30).map(p => `${p.name} (${p.category_name})`).join(', ');

    const prompt = `You are an AI shopping assistant for GrocerAI. Based on the user's shopping data, recommend 3-4 products they might want to buy.

User's Recent Purchase History: ${purchaseHistoryText}

Current Cart Items: ${cartItemsText}

Available Products to Choose From: ${availableProductsText}

Please recommend 3-4 products from the available list that would complement their shopping pattern. Consider:
- Items that pair well with their recent purchases
- Products that complete meals or recipes
- Seasonal or complementary items
- Different categories for variety

Respond ONLY with a JSON array in this exact format (no other text):
[
  {"name": "Product Name", "reason": "Brief reason why this product fits their shopping pattern"},
  {"name": "Product Name", "reason": "Brief reason why this product fits their shopping pattern"}
]

Make sure product names exactly match those from the available products list.`;

    let recommendations = [];
    
    try {
      // Import Gemini SDK
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      // Generate recommendations using Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text();
      
      // Parse AI response
      try {
        const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        recommendations = JSON.parse(cleanResponse);
        
        // Validate recommendations format
        if (!Array.isArray(recommendations) || recommendations.length === 0) {
          throw new Error('Invalid recommendations format');
        }
        
        // Ensure each recommendation has required fields
        recommendations = recommendations.filter(rec => rec.name && rec.reason).slice(0, 4);
        
      } catch (parseError) {
        console.error('Error parsing AI recommendations:', parseError);
        throw new Error('Failed to parse AI response');
      }
      
    } catch (aiError) {
      console.error('Gemini AI Error:', aiError);
      
      // Fallback to rule-based recommendations
      const fallbackQuery = `
        SELECT p.name, c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_active = true 
        ${excludedIds.length > 0 ? `AND p.id NOT IN (${excludedIds.map((_, i) => `$${i + 2}`).join(',')})` : ''}
        ORDER BY RANDOM()
        LIMIT 4
      `;
      
      const fallbackProducts = await pool.query(
        fallbackQuery, 
        [req.user.id, ...excludedIds]
      );
      
      recommendations = fallbackProducts.rows.map(product => ({
        name: product.name,
        reason: `Popular ${product.category_name} item you might enjoy`
      }));
    }

    const responseTime = Date.now() - startTime;

    // Save recommendations to database
    const saveQuery = `
      INSERT INTO ai_recommendations (user_id, recommendations)
      VALUES ($1, $2)
      RETURNING id, created_at
    `;
    
    const savedRec = await pool.query(saveQuery, [
      req.user.id,
      JSON.stringify(recommendations)
    ]);

    res.json({
      success: true,
      data: {
        recommendations,
        responseTime,
        savedAt: savedRec.rows[0].created_at,
        recommendationId: savedRec.rows[0].id
      }
    });

  } catch (error) {
    console.error('AI Recommendations Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate recommendations'
    });
  }
});

module.exports = router;
