import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext.jsx';
import { useAuth } from '../hooks/useAuth';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';
import { MapPin, CreditCard, Calendar, Clock, FileText } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const cartContext = useContext(CartContext);
  const { items: cartItems, getCartTotal, clearCart } = cartContext || {};
  const [loading, setLoading] = useState(false);

  // Debug logging
  console.log('CartContext in Checkout:', cartContext);
  console.log('Cart items:', cartItems);
  console.log('User authenticated:', isAuthenticated);
  console.log('User:', user);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const [formData, setFormData] = useState({
    delivery_address: '',
    payment_method: 'cash_on_delivery',
    delivery_date: '',
    delivery_time_slot: '9:00 AM - 12:00 PM',
    notes: ''
  });

  const paymentMethods = [
    { value: 'cash_on_delivery', label: 'Cash on Delivery' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'upi', label: 'UPI Payment' }
  ];

  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!formData.delivery_address.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }

    if (!formData.delivery_date) {
      toast.error('Please select a delivery date');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        delivery_address: formData.delivery_address.trim(),
        payment_method: formData.payment_method,
        delivery_date: formData.delivery_date,
        delivery_time_slot: formData.delivery_time_slot,
        notes: formData.notes.trim()
      };

      console.log('Creating order with data:', orderData);
      const response = await ordersAPI.create(orderData);
      
      console.log('Order creation response:', response.data);
      
      if (response.data.success) {
        toast.success('Order placed successfully!');
        clearCart();
        // Navigate to my orders page
        navigate('/orders', { 
          state: { orderCreated: true, newOrderId: response.data.order.id } 
        });
      } else {
        toast.error(response.data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deliveryFee = 50;
  const subtotal = getCartTotal ? getCartTotal() : 0;
  const total = subtotal + deliveryFee;

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  // If cart context is not available yet or loading, show loading
  if (!cartContext || cartContext.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before checkout</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Forms */}
              <div className="space-y-6">
                {/* Delivery Address */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    Delivery Address *
                  </label>
                  <textarea
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Method *
                  </label>
                  <select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {paymentMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    name="delivery_date"
                    value={formData.delivery_date}
                    onChange={handleInputChange}
                    min={today}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Delivery Time Slot
                  </label>
                  <select
                    name="delivery_time_slot"
                    value={formData.delivery_time_slot}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FileText className="h-4 w-4 mr-2" />
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any special instructions for delivery"
                  />
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  
                  {/* Cart Items */}
                  <div className="space-y-3 mb-4">
                    {cartItems && cartItems.length > 0 ? cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">No items in cart</p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-base font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Back to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
