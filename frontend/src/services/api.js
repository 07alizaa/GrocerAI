import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getMainCategories: () => api.get('/categories/main'),
  getById: (id) => api.get(`/categories/${id}`),
  getSubcategories: (id) => api.get(`/categories/${id}/subcategories`),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
  getFeatured: () => api.get('/products/featured'),
  getLowStock: () => api.get('/products/admin/low-stock'),
  search: (query, params = {}) => api.get(`/products/search`, { params: { q: query, ...params } }),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart/add', { product_id: productId, quantity }),
  updateCartItem: (productId, quantity) => api.put(`/cart/update/${productId}`, { quantity }),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  clearCart: () => api.delete('/cart/clear'),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/my-orders'),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
  getAll: (queryString = '') => api.get(`/orders${queryString}`),
  updateStatus: (id, status, notes = '') => api.put(`/orders/${id}/status`, { status, notes }),
  getStats: () => api.get('/orders/admin/stats'),
};

// Admin API
export const adminAPI = {
  // Dashboard
  getStats: () => api.get('/admin/dashboard/stats'),
  getActivity: () => api.get('/admin/dashboard/activity'),
  
  // User Management
  getUsers: (params = {}) => api.get('/admin/users', { params }),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUserName: (userId, name) => api.put(`/admin/users/${userId}/name`, { name }),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  
  // Product Management  
  getProducts: (params = {}) => api.get('/admin/products', { params }),
  createProduct: (productData) => api.post('/admin/products', productData),
  updateProduct: (id, productData) => api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  
  // Category Management
  getCategories: () => api.get('/admin/categories'),
  
  // Reports
  getReports: (params = {}) => api.get('/admin/reports', { params }),
  
  // Test endpoint
  test: () => api.get('/admin/test'),
};

// Profile & Address Management API
export const profileAPI = {
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  getAddresses: () => api.get('/profile/addresses'),
  addAddress: (addressData) => api.post('/profile/addresses', addressData),
  updateAddress: (id, addressData) => api.put(`/profile/addresses/${id}`, addressData),
  deleteAddress: (id) => api.delete(`/profile/addresses/${id}`),
  setDefaultAddress: (id) => api.put(`/profile/addresses/${id}/default`),
};

// Wishlist API (if implemented in backend)
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => api.post('/wishlist', { product_id: productId }),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
  clearWishlist: () => api.delete('/wishlist/clear'),
};

// Reviews API (for future implementation)
export const reviewsAPI = {
  getProductReviews: (productId) => api.get(`/products/${productId}/reviews`),
  createReview: (reviewData) => api.post('/reviews', reviewData),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
  getMyReviews: () => api.get('/reviews/my-reviews'),
};

// Notifications API (for future implementation)
export const notificationsAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
};

// Coupon API (if admin coupon management exists)
export const couponAPI = {
  validateCoupon: (code, orderAmount) => api.post('/coupons/validate', { code, order_amount: orderAmount }),
  getActiveCoupons: () => api.get('/coupons/active'),
  // Admin endpoints
  getAllCoupons: () => api.get('/admin/coupons'),
  createCoupon: (couponData) => api.post('/admin/coupons', couponData),
  updateCoupon: (id, couponData) => api.put(`/admin/coupons/${id}`, couponData),
  deleteCoupon: (id) => api.delete(`/admin/coupons/${id}`),
};

// AI API
export const aiAPI = {
  chat: (message, conversationHistory = []) => 
    api.post('/ai/chat', { message, conversationHistory }),
  healthCheck: () => api.get('/ai/health'),
};

// Admin AI API
export const adminAiAPI = {
  testChat: (message, testType = 'general') => 
    api.post('/admin/ai/chat', { message, testType }),
  getAnalytics: () => api.get('/admin/ai/analytics'),
  clearHistory: () => api.post('/admin/ai/clear-history'),
};

export default api;
