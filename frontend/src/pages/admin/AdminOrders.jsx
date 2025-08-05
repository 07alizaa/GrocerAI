import React, { useState, useEffect, useCallback } from 'react';
import { ordersAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { 
  Package, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Eye, 
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  TrendingUp,
  Filter,
  Search,
  Download
} from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    delivered: 0,
    cancelled: 0
  });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.dateFrom) queryParams.append('date_from', filters.dateFrom);
      if (filters.dateTo) queryParams.append('date_to', filters.dateTo);
      queryParams.append('limit', '50');
      
      const response = await ordersAPI.getAll(`?${queryParams.toString()}`);
      console.log('Admin orders response:', response.data);
      
      if (response.data.success) {
        let ordersList = response.data.data || [];
        
        // Apply client-side search filter if needed
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          ordersList = ordersList.filter(order => 
            order.id.toString().includes(searchTerm) ||
            order.order_number?.toLowerCase().includes(searchTerm) ||
            order.customer_email?.toLowerCase().includes(searchTerm) ||
            order.customer_name?.toLowerCase().includes(searchTerm)
          );
        }
        
        setOrders(ordersList);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchOrderStats = async () => {
    try {
      const response = await ordersAPI.getStats();
      console.log('Order stats response:', response.data);
      if (response.data.success) {
        const statsData = response.data.data;
        // Map backend field names to frontend expected names
        setStats({
          total: statsData.total_orders || 0,
          pending: statsData.pending_orders || 0,
          confirmed: statsData.confirmed_orders || 0,
          delivered: statsData.delivered_orders || 0,
          cancelled: statsData.cancelled_orders || 0
        });
      }
    } catch (error) {
      console.error('Error fetching order stats:', error);
      // Set default stats if API fails
      setStats({
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length
      });
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchOrderStats();
  }, [fetchOrders]); // Remove fetchOrderStats from dependency to avoid infinite loop

  // Separate effect for search debouncing
  useEffect(() => {
    if (filters.search === '') {
      fetchOrders();
      return;
    }
    
    const timeoutId = setTimeout(() => {
      fetchOrders();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.search, fetchOrders]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdating(prev => ({ ...prev, [orderId]: true }));
      
      const response = await ordersAPI.updateStatus(orderId, newStatus);
      
      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders(); // Refresh the orders list
        fetchOrderStats(); // Refresh stats
      } else {
        toast.error(response.data.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-accent/20 text-primary border border-accent/30';
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'processing':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'packed':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'shipped':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'delivered':
        return 'bg-green-50 text-primary border border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-secondary text-textDark border border-gray-200';
    }
  };

  const getDeliveryAddress = (deliveryAddress) => {
    if (!deliveryAddress) return 'Not specified';
    
    if (typeof deliveryAddress === 'string') {
      try {
        const parsed = JSON.parse(deliveryAddress);
        return parsed.address || deliveryAddress;
      } catch {
        return deliveryAddress;
      }
    }
    
    if (typeof deliveryAddress === 'object' && deliveryAddress.address) {
      return deliveryAddress.address;
    }
    
    return 'Not specified';
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'cash_on_delivery':
        return 'Cash on Delivery';
      case 'credit_card':
        return 'Credit Card';
      case 'debit_card':
        return 'Debit Card';
      case 'upi':
        return 'UPI Payment';
      default:
        return method;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'packed', label: 'Packed' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textDark">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-textDark">Order Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all customer orders efficiently</p>
        </div>

        {/* Stats Dashboard - Using 60/30/10 Color Rule */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-textDark">{(stats && stats.total) || orders.length || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary">
                <Package className="h-6 w-6 text-textLight" />
              </div>
            </div>
          </div>
          
          <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-textDark">{(stats && stats.pending) || orders.filter(o => o.status === 'pending').length || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-accent">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-textDark">{(stats && stats.confirmed) || orders.filter(o => o.status === 'confirmed').length || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500">
                <TrendingUp className="h-6 w-6 text-textLight" />
              </div>
            </div>
          </div>
          
          <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-textDark">{(stats && stats.delivered) || orders.filter(o => o.status === 'delivered').length || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary">
                <Package className="h-6 w-6 text-textLight" />
              </div>
            </div>
          </div>
          
          <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-textDark">{(stats && stats.cancelled) || orders.filter(o => o.status === 'cancelled').length || 0}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-500">
                <FileText className="h-6 w-6 text-textLight" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                <Filter className="h-4 w-4 inline mr-1 text-primary" />
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Statuses</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                <Search className="h-4 w-4 inline mr-1 text-primary" />
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Order ID, customer name, email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Date From
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">
                Date To
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <Package className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-textDark mb-2">No Orders Found</h3>
              <p className="text-gray-600">No orders match your current filters.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-textLight rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                {/* Order Header */}
                <div className="bg-primary p-6 text-textLight">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        Order #{order.order_number || order.id}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-green-100">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.created_at)}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {order.customer_name || 'N/A'}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {order.customer_email || 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        disabled={updating[order.id]}
                        className="px-3 py-2 border border-gray-300 rounded-xl text-sm bg-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-textDark"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-start space-x-3 p-4 bg-secondary rounded-xl">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-textDark">Delivery Address</p>
                        <p className="text-sm text-gray-600 mt-1">{getDeliveryAddress(order.delivery_address)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-secondary rounded-xl">
                      <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-textDark">Payment Method</p>
                        <p className="text-sm text-gray-600 mt-1">{getPaymentMethodLabel(order.payment_method)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-secondary rounded-xl">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-textDark">Delivery Slot</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.delivery_date} - {order.delivery_time_slot}
                        </p>
                      </div>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-textDark mb-2">Special Instructions</p>
                      <p className="text-sm text-gray-600 bg-accent/10 p-3 rounded-xl border border-accent/20">{order.notes}</p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {order.items?.length || 0} item(s) • Order Total
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ₹{parseFloat(order.final_amount || order.total_amount || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
