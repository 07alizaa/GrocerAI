import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  BarChart3,
  Grid,
  FileText,
  Settings,
  Plus,
  Shield,
  Activity,
  Bell,
  Monitor,
  Eye,
  Truck,
  Clock,
  Leaf,
  Star,
  ChevronRight,
  Bot,
  Send,
  Loader2,
  MessageCircle,
  BarChart,
  Trash2,
  TestTube,
  Brain
} from 'lucide-react';
import { adminAiAPI } from '../services/api';
import toast from 'react-hot-toast';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    lowStockItems: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // AI Testing States
  const [aiTestMessage, setAiTestMessage] = useState('');
  const [aiTestType, setAiTestType] = useState('general');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalytics, setAiAnalytics] = useState(null);
  const [showAiPanel, setShowAiPanel] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchAiAnalytics();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch dashboard statistics
      const statsResponse = await fetch('http://localhost:3001/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch recent activity
      const activityResponse = await fetch('http://localhost:3001/api/admin/dashboard/activity', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set demo data for now
      setStats({
        totalUsers: 1250,
        totalProducts: 450,
        pendingOrders: 23,
        todayRevenue: 12450,
        monthlyRevenue: 145000,
        lowStockItems: 8
      });
      setRecentActivity([
        { id: 1, type: 'user', message: 'New user registered', time: '2 mins ago' },
        { id: 2, type: 'order', message: 'Order #1234 completed', time: '5 mins ago' },
        { id: 3, type: 'product', message: 'Product added to inventory', time: '10 mins ago' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiAnalytics = async () => {
    try {
      const response = await adminAiAPI.getAnalytics();
      if (response.data.success) {
        setAiAnalytics(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching AI analytics:', error);
      // Set mock analytics
      setAiAnalytics({
        totalInteractions: 1250,
        todayInteractions: 45,
        averageResponseTime: '2.3s',
        popularQueries: [
          { query: 'meal planning', count: 180 },
          { query: 'recipe suggestions', count: 145 },
          { query: 'nutritional info', count: 120 },
          { query: 'shopping tips', count: 95 }
        ],
        userSatisfaction: 4.2,
        errorRate: '2.1%'
      });
    }
  };

  const testAiResponse = async () => {
    if (!aiTestMessage.trim()) {
      toast.error('Please enter a test message');
      return;
    }

    setAiLoading(true);
    setAiResponse('');

    try {
      const response = await adminAiAPI.testChat(aiTestMessage, aiTestType);
      if (response.data.success) {
        setAiResponse(response.data.data.message);
        toast.success('AI test completed successfully');
      } else {
        toast.error(response.data.error || 'AI test failed');
      }
    } catch (error) {
      console.error('AI test error:', error);
      toast.error('Failed to test AI response');
    } finally {
      setAiLoading(false);
    }
  };

  const clearAiHistory = async () => {
    try {
      const response = await adminAiAPI.clearHistory();
      if (response.data.success) {
        toast.success('AI chat history cleared successfully');
        fetchAiAnalytics(); // Refresh analytics
      } else {
        toast.error('Failed to clear AI history');
      }
    } catch (error) {
      console.error('Clear AI history error:', error);
      toast.error('Failed to clear AI history');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textDark font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Admin Header - 60% Primary */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-accent p-3 rounded-full">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-textLight">
                    Admin Dashboard
                  </h1>
                  <p className="text-accent text-lg">
                    DailyGrocer Management Hub
                  </p>
                </div>
              </div>
              
              <p className="text-textLight/80 text-lg mb-6">
                Monitor your grocery delivery platform with real-time insights and comprehensive management tools.
              </p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-accent text-primary px-4 py-2 rounded-full">
                  <Activity className="h-4 w-4" />
                  <span className="font-semibold">System Online</span>
                </div>
                <span className="text-accent/80">Last updated: just now</span>
              </div>
            </div>
            
            {/* Admin Dashboard Illustration */}
            <div className="relative">
              <div className="bg-accent/20 rounded-3xl p-6 shadow-2xl border border-accent/30">
                <div className="bg-textLight rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary rounded-xl p-4 text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-bold text-textDark">{stats.totalUsers}</p>
                      <p className="text-xs text-gray-600">Users</p>
                    </div>
                    <div className="bg-[#ECFAE5] rounded-xl p-4 text-center">
                      <Package className="h-8 w-8 text-[#0A400C] mx-auto mb-2" />
                      <p className="text-sm font-bold text-[#0A400C]">{stats.totalProducts}</p>
                      <p className="text-xs text-gray-600">Products</p>
                    </div>
                    <div className="bg-[#ECFAE5] rounded-xl p-4 text-center">
                      <ShoppingCart className="h-8 w-8 text-[#0A400C] mx-auto mb-2" />
                      <p className="text-sm font-bold text-[#0A400C]">{stats.pendingOrders}</p>
                      <p className="text-xs text-gray-600">Pending</p>
                    </div>
                    <div className="bg-[#ECFAE5] rounded-xl p-4 text-center">
                      <DollarSign className="h-8 w-8 text-[#0A400C] mx-auto mb-2" />
                      <p className="text-sm font-bold text-[#0A400C]">${stats.todayRevenue}</p>
                      <p className="text-xs text-gray-600">Today</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                <Bell className="h-6 w-6 text-[#B0DB9C]" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                <BarChart3 className="h-6 w-6 text-[#B0DB9C]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics - Following 60/30/10 Rule */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users - White cards (30%) with primary accents */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary p-3 rounded-xl">
                  <Users className="h-6 w-6 text-textLight" />
                </div>
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-textDark mb-1">{stats.totalUsers.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm mb-2">Total Users</p>
              <div className="flex items-center text-primary text-sm">
                <span className="bg-accent/20 text-primary px-2 py-1 rounded-full">+12% this month</span>
              </div>
            </div>

            {/* Total Products */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary p-3 rounded-xl">
                  <Package className="h-6 w-6 text-textLight" />
                </div>
                <Leaf className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-textDark mb-1">{stats.totalProducts}</h3>
              <p className="text-gray-600 text-sm mb-2">Products</p>
              <div className="flex items-center text-primary text-sm">
                <span className="bg-accent/20 text-primary px-2 py-1 rounded-full">+5% this week</span>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <ShoppingCart className="h-6 w-6 text-textLight" />
                </div>
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-textDark mb-1">{stats.pendingOrders}</h3>
              <p className="text-gray-600 text-sm mb-2">Pending Orders</p>
              <div className="flex items-center text-orange-600 text-sm">
                <span className="bg-orange-100 px-2 py-1 rounded-full">Needs attention</span>
              </div>
            </div>

            {/* Today's Revenue */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-accent p-3 rounded-xl">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <Star className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-textDark mb-1">${stats.todayRevenue.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm mb-2">Today's Revenue</p>
              <div className="flex items-center text-accent text-sm">
                <span className="bg-accent/20 text-primary px-2 py-1 rounded-full">+8% from yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - DailyGrocer Style */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A400C] mb-4">Quick Actions</h2>
            <p className="text-gray-600 text-lg">Manage your platform efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/admin/users"
              className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-[#B0DB9C] hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-[#B0DB9C] to-[#ECFAE5] p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-[#0A400C]" />
              </div>
              <h3 className="text-lg font-bold text-[#0A400C] mb-2">Manage Users</h3>
              <p className="text-gray-600 mb-4">View, edit, and manage user accounts</p>
              <div className="flex items-center text-[#B0DB9C] group-hover:text-[#0A400C] transition-colors">
                <span className="font-semibold">Manage</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/admin/products"
              className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-[#B0DB9C] hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A400C] mb-2">Manage Products</h3>
              <p className="text-gray-600 mb-4">Add, edit, and organize products</p>
              <div className="flex items-center text-[#B0DB9C] group-hover:text-[#0A400C] transition-colors">
                <span className="font-semibold">Manage</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/admin/categories"
              className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <Grid className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-2">Manage Categories</h3>
              <p className="text-gray-600 mb-4">Organize and structure product categories</p>
              <div className="flex items-center text-green-600 group-hover:text-green-900 transition-colors">
                <span className="font-semibold">Organize</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/admin/reports"
              className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-2">View Reports</h3>
              <p className="text-gray-600 mb-4">Analytics and business insights</p>
              <div className="flex items-center text-green-600 group-hover:text-green-900 transition-colors">
                <span className="font-semibold">Analyze</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/admin/orders"
              className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-[#B0DB9C] hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A400C] mb-2">Process Orders</h3>
              <p className="text-gray-600 mb-4">View and process customer orders</p>
              <div className="flex items-center text-[#B0DB9C] group-hover:text-[#0A400C] transition-colors">
                <span className="font-semibold">Process</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* System Status & Recent Activity */}
      <section className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* System Status */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B0DB9C]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#0A400C]">System Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-semibold">All Systems Operational</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#ECFAE5] rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-5 w-5 text-[#0A400C]" />
                    <span className="font-medium text-[#0A400C]">Website Performance</span>
                  </div>
                  <span className="text-green-600 font-semibold">Excellent</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#ECFAE5] rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-[#0A400C]" />
                    <span className="font-medium text-[#0A400C]">Delivery System</span>
                  </div>
                  <span className="text-green-600 font-semibold">Online</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[#ECFAE5] rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-[#0A400C]" />
                    <span className="font-medium text-[#0A400C]">Response Time</span>
                  </div>
                  <span className="text-green-600 font-semibold">&lt; 100ms</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-textDark">Recent Activity</h3>
                <Link to="/admin/activity" className="text-primary hover:text-accent font-semibold">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivity.length > 0 ? recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-secondary rounded-xl">
                    <div className="bg-primary p-2 rounded-lg">
                      {activity.type === 'user' && <Users className="h-4 w-4 text-textLight" />}
                      {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-textLight" />}
                      {activity.type === 'product' && <Package className="h-4 w-4 text-textLight" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-textDark">{activity.message}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Testing Panel - Following 60/30/10 Color Rule */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg">
                    <Bot className="h-6 w-6 text-textLight" />
                  </div>
                  <h3 className="text-xl font-bold text-textDark">AI Testing Panel</h3>
                </div>
                <button
                  onClick={() => setShowAiPanel(!showAiPanel)}
                  className="text-primary hover:text-accent font-semibold flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg transition-colors"
                >
                  <TestTube className="h-4 w-4" />
                  {showAiPanel ? 'Hide' : 'Show'} Testing
                </button>
              </div>

              {/* AI Analytics Summary - 30% Secondary backgrounds */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-secondary p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-textDark">{aiAnalytics?.totalInteractions || 0}</div>
                  <div className="text-sm text-gray-600">Total Interactions</div>
                </div>
                <div className="bg-secondary p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-textDark">{aiAnalytics?.todayInteractions || 0}</div>
                  <div className="text-sm text-gray-600">Today's Queries</div>
                </div>
                <div className="bg-secondary p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-textDark">{aiAnalytics?.averageResponseTime || '0s'}</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
                <div className="bg-accent/20 p-4 rounded-xl border border-accent/30">
                  <div className="text-2xl font-bold text-primary">{aiAnalytics?.userSatisfaction || 0}/5</div>
                  <div className="text-sm text-primary">Satisfaction</div>
                </div>
              </div>

              {showAiPanel && (
                <div className="space-y-6">
                  {/* Test Controls - Secondary background */}
                  <div className="border border-gray-200 rounded-xl p-4 bg-secondary">
                    <h4 className="font-semibold text-textDark mb-4">Test AI Response</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                        <select
                          value={aiTestType}
                          onChange={(e) => setAiTestType(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-textLight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="general">General Query</option>
                          <option value="meal_planning">Meal Planning</option>
                          <option value="grocery_suggestions">Grocery Suggestions</option>
                          <option value="nutrition">Nutrition Advice</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Test Message</label>
                        <textarea
                          value={aiTestMessage}
                          onChange={(e) => setAiTestMessage(e.target.value)}
                          placeholder="Enter your test query here..."
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 bg-textLight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={testAiResponse}
                          disabled={aiLoading || !aiTestMessage.trim()}
                          className="flex items-center gap-2 bg-primary text-textLight px-4 py-2 rounded-lg hover:bg-accent hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {aiLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                          Test AI
                        </button>
                        
                        <button
                          onClick={clearAiHistory}
                          className="flex items-center gap-2 bg-red-500 text-textLight px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          Clear History
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Response Display */}
                  {(aiResponse || aiLoading) && (
                    <div className="border border-gray-200 rounded-xl p-4 bg-textLight">
                      <h4 className="font-semibold text-textDark mb-3">AI Response</h4>
                      {aiLoading ? (
                        <div className="flex items-center gap-3 text-gray-600">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Processing your test query...
                        </div>
                      ) : (
                        <div className="bg-secondary rounded-lg p-4 border border-gray-200">
                          <p className="text-textDark whitespace-pre-wrap">{aiResponse}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Popular Queries */}
                  {aiAnalytics?.popularQueries && (
                    <div className="border border-gray-200 rounded-xl p-4 bg-textLight">
                      <h4 className="font-semibold text-textDark mb-3">Popular Queries</h4>
                      <div className="space-y-2">
                        {aiAnalytics.popularQueries.map((query, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg border border-gray-200">
                            <span className="text-textDark">{query.query}</span>
                            <span className="text-sm bg-accent/20 text-primary px-2 py-1 rounded-full">{query.count} times</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Footer */}
      <section className="py-8 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-3 shadow-lg">
                <Truck className="h-8 w-8 text-green-500 mx-auto" />
              </div>
              <p className="text-green-900 font-bold text-lg">{stats.pendingOrders}</p>
              <p className="text-gray-600 text-sm">Active Deliveries</p>
            </div>
            
            <div>
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-3 shadow-lg">
                <Clock className="h-8 w-8 text-green-500 mx-auto" />
              </div>
              <p className="text-green-900 font-bold text-lg">15 min</p>
              <p className="text-gray-600 text-sm">Avg Response</p>
            </div>
            
            <div>
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-3 shadow-lg">
                <Leaf className="h-8 w-8 text-green-500 mx-auto" />
              </div>
              <p className="text-green-900 font-bold text-lg">99.8%</p>
              <p className="text-gray-600 text-sm">Fresh Quality</p>
            </div>
            
            <div>
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-3 shadow-lg">
                <Star className="h-8 w-8 text-green-500 mx-auto" />
              </div>
              <p className="text-green-900 font-bold text-lg">4.9/5</p>
              <p className="text-gray-600 text-sm">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
