import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext.jsx';
import { useAuth } from '../hooks/useAuth';

const CartDebug = () => {
  const { user, isAuthenticated } = useAuth();
  const cartContext = useContext(CartContext);
  const { items, loading, addToCart, clearCart, getCartTotal, getCartCount } = cartContext || {};

  const testProduct = {
    id: 1,
    name: "Test Product",
    price: 10.99,
    discounted_price: 9.99
  };

  const handleAddTestItem = () => {
    if (addToCart) {
      addToCart(testProduct, 1);
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 border border-gray-300 rounded shadow-lg z-50 max-w-xs">
      <h3 className="font-bold text-sm mb-2">Cart Debug</h3>
      
      <div className="text-xs space-y-1 mb-3">
        <p><strong>Auth:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user?.email || 'None'}</p>
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>Items:</strong> {items?.length || 0}</p>
        <p><strong>Total:</strong> ₹{getCartTotal ? getCartTotal().toFixed(2) : '0.00'}</p>
        <p><strong>Count:</strong> {getCartCount ? getCartCount() : 0}</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleAddTestItem}
          className="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Add Test Item
        </button>
        
        <button
          onClick={clearCart}
          className="w-full bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          Clear Cart
        </button>
      </div>

      {items && items.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <p className="text-xs font-semibold mb-1">Cart Items:</p>
          {items.map((item, index) => (
            <div key={index} className="text-xs">
              {item.name} x{item.quantity}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-gray-200 text-xs">
        <p><strong>LocalStorage Cart:</strong></p>
        <p>{localStorage.getItem('cart') ? 
          JSON.parse(localStorage.getItem('cart')).length + ' items' : 
          'Empty'
        }</p>
      </div>
    </div>
  );
};

export default CartDebug;
