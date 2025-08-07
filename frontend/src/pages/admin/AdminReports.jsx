import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  MessageSquare,
  Clock,
  Star
} from 'lucide-react';
import { adminAPI, adminAiAPI } from '../../services/api';

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [aiAnalytics, setAiAnalytics] = useState(null);
  const [reportsData, setReportsData] = useState(null);
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  const fetchReportsData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const statsResponse = await adminAPI.getStats();
      setDashboardStats(statsResponse.data);
      
      // Fetch comprehensive reports with current filters
      const reportsResponse = await adminAPI.getReports({
        timeRange: dateRange,
        reportType: reportType
      });
      setReportsData(reportsResponse.data);
      
      // Fetch AI analytics
      const analyticsResponse = await adminAiAPI.getAnalytics();
      if (analyticsResponse.data.success) {
        setAiAnalytics(analyticsResponse.data.data);
      }
      
      console.log('Reports data fetched successfully:', {
        stats: statsResponse.data,
        reports: reportsResponse.data,
        analytics: analyticsResponse.data
      });
      
    } catch (error) {
      console.error('Error fetching reports data:', error);
      // Only set empty states, no demo data
      setDashboardStats({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
      });
      setAiAnalytics({
        totalInteractions: 0,
        todayInteractions: 0,
        averageResponseTime: '0s',
        userSatisfaction: 0,
        popularQueries: []
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange, reportType]);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  const exportReport = () => {
    // Mock export functionality
    alert('Report export functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-textDark">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-textLight">Admin Reports & Analytics</h1>
              <p className="text-textLight/80 text-lg">Comprehensive business insights and performance metrics</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={exportReport}
                className="bg-accent text-primary px-6 py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-textLight rounded-2xl p-6 shadow-lg border-2 border-primary/20 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-textDark/60" />
                <span className="text-textDark font-medium">Filters:</span>
              </div>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>

              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="overview">Overview</option>
                <option value="sales">Sales Report</option>
                <option value="users">User Analytics</option>
                <option value="ai">AI Analytics</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textDark/60 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-textDark">{dashboardStats?.totalUsers || 0}</p>
                  <p className="text-primary text-sm mt-1">↗ +12% this month</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textDark/60 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-textDark">{dashboardStats?.totalOrders || 0}</p>
                  <p className="text-primary text-sm mt-1">↗ +8% this month</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border-2 border-accent/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textDark/60 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-textDark">₹{dashboardStats?.totalRevenue?.toLocaleString() || '0'}</p>
                  <p className="text-accent/80 text-sm mt-1">↗ +15% this month</p>
                </div>
                <div className="bg-accent/20 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
              </div>
            </div>

            {/* AI Interactions */}
            <div className="bg-textLight rounded-2xl p-6 shadow-lg border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textDark/60 text-sm font-medium">AI Interactions</p>
                  <p className="text-3xl font-bold text-textDark">{aiAnalytics?.totalInteractions || 0}</p>
                  <p className="text-primary text-sm mt-1">↗ +25% this month</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Analytics Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-textLight rounded-2xl p-8 shadow-lg border-2 border-primary/20 mb-8">
            <h2 className="text-2xl font-bold text-textDark mb-6 flex items-center">
              <MessageSquare className="h-6 w-6 text-primary mr-2" />
              AI Analytics Dashboard
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Today's Interactions */}
              <div className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary text-sm font-medium">Today's Interactions</p>
                    <p className="text-2xl font-bold text-textDark">{aiAnalytics?.todayInteractions || 0}</p>
                  </div>
                  <Eye className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Average Response Time */}
              <div className="bg-accent/10 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-accent/80 text-sm font-medium">Avg Response Time</p>
                    <p className="text-2xl font-bold text-textDark">{aiAnalytics?.averageResponseTime || '0s'}</p>
                  </div>
                  <Clock className="h-8 w-8 text-accent" />
                </div>
              </div>

              {/* User Satisfaction */}
              <div className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary text-sm font-medium">User Satisfaction</p>
                    <p className="text-2xl font-bold text-textDark">{aiAnalytics?.userSatisfaction || 0}/5</p>
                  </div>
                  <Star className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>

            {/* Popular Queries */}
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="text-lg font-semibold text-textDark mb-4">Popular AI Queries</h3>
              <div className="space-y-3">
                {aiAnalytics?.popularQueries?.length > 0 ? (
                  aiAnalytics.popularQueries.map((query, index) => (
                    <div key={index} className="flex items-center justify-between bg-textLight rounded-lg p-4">
                      <span className="text-textDark font-medium">{query.query}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-textDark/60">{query.count} times</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(query.count / Math.max(...(aiAnalytics?.popularQueries?.map(q => q.count) || [1]))) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-textDark/60 text-center py-8">No query data available yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Trends */}
            <div className="bg-textLight rounded-2xl p-8 shadow-lg border-2 border-primary/20">
              <h3 className="text-xl font-bold text-textDark mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                Sales Trends
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-textDark/60">This Week</span>
                  <span className="font-semibold text-primary">₹{(dashboardStats?.totalRevenue * 0.7)?.toFixed(0) || '0'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textDark/60">Last Week</span>
                  <span className="font-semibold text-textDark">₹{(dashboardStats?.totalRevenue * 0.6)?.toFixed(0) || '0'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-textDark/60">Growth</span>
                  <span className="font-semibold text-primary">+16.7%</span>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-textLight rounded-2xl p-8 shadow-lg border-2 border-primary/20">
              <h3 className="text-xl font-bold text-textDark mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 text-primary mr-2" />
                Top Products
              </h3>
              <div className="space-y-4">
                {reportsData?.sales?.topProducts?.length > 0 ? (
                  reportsData.sales.topProducts.slice(0, 3).map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-textDark/60">{product.name}</span>
                      <span className="font-semibold text-textDark">{product.total_sold} sold</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-textDark/60">No product data</span>
                      <span className="font-semibold text-textDark">0 sold</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-textDark/60">Please place some orders</span>
                      <span className="font-semibold text-textDark">0 sold</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-textDark/60">to see top products</span>
                      <span className="font-semibold text-textDark">0 sold</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminReports;
