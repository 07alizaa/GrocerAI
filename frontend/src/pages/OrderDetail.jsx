import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  Package, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Clock, 
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await ordersAPI.getById(id);
        console.log('Order detail response:', response.data); // Debug log
        if (response.data.success) {
          const orderData = response.data.data;
          console.log('Order data:', orderData); // Debug log
          console.log('Order items:', orderData.items); // Debug log
          setOrder(orderData); // Backend returns order in 'data' field
        } else {
          toast.error('Failed to fetch order details');
          navigate('/orders');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Failed to fetch order details');
        navigate('/orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
    
    // Show success message if coming from checkout
    if (location.state?.orderCreated) {
      toast.success('Order placed successfully!');
    }
  }, [id, location.state, navigate]);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
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
    
    // If it's a string that looks like JSON, try to parse it
    if (typeof deliveryAddress === 'string') {
      try {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/orders')}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Orders
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-600 mt-1">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            
            <div className={`mt-4 sm:mt-0 inline-flex items-center px-4 py-2 rounded-lg border ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="ml-2 font-medium">
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>
              
              <div className="p-6">
                {order.items && order.items.length > 0 ? (
                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          {item.product_image ? (
                            <img 
                              src={item.product_image} 
                              alt={item.product_name}
                              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {item.product_name || `Product #${item.product_id}`}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="inline-flex items-center">
                              <span>Qty: {item.quantity}</span>
                              {item.unit && <span className="ml-1">({item.unit})</span>}
                              <span className="mx-2">×</span>
                              <span>₹{parseFloat(item.unit_price || 0).toFixed(2)}</span>
                            </span>
                          </p>
                        </div>
                        
                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{parseFloat(item.total_price || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No items found for this order.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{parseFloat(order.total_amount || 0).toFixed(2)}</span>
                </div>
                
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-₹{parseFloat(order.discount_amount).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">₹{parseFloat(order.delivery_fee || 0).toFixed(2)}</span>
                </div>
                
                {order.tax_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">₹{parseFloat(order.tax_amount).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{parseFloat(order.final_amount || order.total_amount || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Delivery Details</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                    <p className="text-sm text-gray-600 mt-1">{getDeliveryAddress(order.delivery_address)}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delivery Date</p>
                    <p className="text-sm text-gray-600 mt-1">{order.delivery_date}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Time Slot</p>
                    <p className="text-sm text-gray-600 mt-1">{order.delivery_time_slot}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment Method</p>
                    <p className="text-sm text-gray-600 mt-1">{getPaymentMethodLabel(order.payment_method)}</p>
                  </div>
                </div>
                
                {order.notes && (
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Special Instructions</p>
                      <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
