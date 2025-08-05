import React from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  const totalPrice = getCartTotal();
  const itemCount = getCartCount();

  // Debug log to see cart items structure
  console.log('Cart items:', items);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={item.image_urls?.[0] || '/placeholder-product.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.unit}</p>
                  <p className="text-lg font-semibold text-green-600">${parseFloat(item.price || 0).toFixed(2)}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={async () => {
                      try {
                        await updateQuantity(item.id, item.quantity - 1);
                      } catch (error) {
                        console.error('Error updating quantity:', error);
                        alert('Failed to update quantity. Please try again.');
                      }
                    }}
                    className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  
                  <button
                    onClick={async () => {
                      try {
                        await updateQuantity(item.id, item.quantity + 1);
                      } catch (error) {
                        console.error('Error updating quantity:', error);
                        alert('Failed to update quantity. Please try again.');
                      }
                    }}
                    className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={async () => {
                      try {
                        await removeFromCart(item.id);
                      } catch (error) {
                        console.error('Error removing item:', error);
                        alert('Failed to remove item. Please try again.');
                      }
                    }}
                    className="text-red-600 hover:text-red-700 mt-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total ({itemCount} items):</span>
              <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-md text-center hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md text-center hover:bg-green-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
