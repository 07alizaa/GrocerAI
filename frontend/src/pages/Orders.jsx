import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Package, Calendar, MapPin, CreditCard, Eye, Clock, Truck, Check, XCircle } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
    
    // Show success message if redirected from checkout
    if (location.state?.orderCreated) {
      toast.success('🎉 Your order has been placed successfully! You can track it below.');
    }
  }, [location.state]);

  const fetchOrders = async () => {
    try {
      console.log('Fetching user orders...');
      const response = await ordersAPI.getMyOrders();
      console.log('Orders API response:', response.data);
      
      if (response.data.success) {
        const ordersList = response.data.data || []; // Backend returns orders in 'data' field
        console.log('Fetched orders:', ordersList);
        console.log('Sample order structure:', ordersList[0]); // Debug: see order structure
        setOrders(ordersList);
      } else {
        console.error('Failed to fetch orders:', response.data.message);
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'out_for_delivery':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Check className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeliveryAddress = (deliveryAddress) => {
    if (!deliveryAddress) return 'Not specified';
    
    // If it's already a string, return it
    if (typeof deliveryAddress === 'string') {
      try {
        // Try to parse as JSON in case it's stored as JSON string
        const parsed = JSON.parse(deliveryAddress);
        return parsed.address || deliveryAddress;
      } catch {
        // If parsing fails, return the string as is
        return deliveryAddress;
      }
    }
    
    // If it's an object, extract the address
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

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { value: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { value: 'out_for_delivery', label: 'Out for Delivery', count: orders.filter(o => o.status === 'out_for_delivery').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FBF6] to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-48 mb-6"></div>
            <div className="grid gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FBF6] to-white flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md mx-4">
          <Package className="h-16 w-16 text-[#0A400C] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0A400C] mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <Link
            to="/products"
            className="bg-[#0A400C] text-white px-6 py-3 rounded-xl hover:bg-[#0A400C]/90 transition-colors inline-flex items-center gap-2 font-semibold"
          >
            <Package className="h-4 w-4" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FBF6] to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A400C] mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your grocery orders</p>
        </div>

        {/* Success Banner for new orders */}
        {location.state?.orderCreated && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-5 w-5 text-[#0A400C]" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-[#0A400C]">
                  Order Placed Successfully!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Your order has been received and is being processed. You can track its progress below.
                  {location.state?.newOrderId && (
                    <span className="font-medium"> Order ID: #{location.state.newOrderId}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                  filter === option.value
                    ? 'bg-[#0A400C] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-[#B0DB9C] hover:text-[#0A400C] border border-gray-200'
                }`}
              >
                {option.label} {option.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filter === option.value ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {filter === 'all' ? 'No orders yet' : `No ${filter.replace('_', ' ')} orders`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' ? 'Start shopping to see your orders here' : `You don't have any ${filter.replace('_', ' ')} orders`}
            </p>
            <Link
              to="/products"
              className="bg-[#0A400C] text-white border-2 border-[#0A400C] px-6 py-3 rounded-lg hover:bg-white hover:text-[#0A400C] transition-all duration-200 shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border-2 border-gray-200 hover:border-[#B0DB9C] hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b-2 border-gray-200 bg-gradient-to-r from-[#F8FBF6] to-white">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-[#0A400C]">Order #{order.id}</h3>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(order.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          <span className="font-semibold">₹{parseFloat(order.final_amount || order.total_amount || 0).toFixed(2)}</span>
                        </div>
                        {order.delivery_address && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{getDeliveryAddress(order.delivery_address)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/orders/${order.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#B0DB9C] text-[#0A400C] border-2 border-[#B0DB9C] rounded-lg hover:bg-[#0A400C] hover:text-white hover:border-[#0A400C] transition-all duration-200 font-medium shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Order Info Grid */}
                <div className="p-6 bg-gray-50/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <CreditCard className="h-5 w-5 text-[#0A400C] mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#0A400C]">Payment Method</p>
                        <p className="text-sm text-gray-600 mt-1">{getPaymentMethodLabel(order.payment_method)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <Clock className="h-5 w-5 text-[#0A400C] mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#0A400C]">Delivery Slot</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.delivery_date} - {order.delivery_time_slot}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <Package className="h-5 w-5 text-[#0A400C] mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#0A400C]">Items</p>
                        <p className="text-sm text-gray-600 mt-1">{order.order_items?.length || 0} item(s)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
