import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { cartAPI } from '../services/api';

// Create the CartContext
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const loadCartFromBackend = useCallback(async () => {
    try {
      console.log('Loading cart from backend...');
      setLoading(true);
      const response = await cartAPI.getCart();
      console.log('Get cart response:', response.data);
      
      if (response.data.success) {
        console.log('Cart loaded successfully:', response.data.data.items);
        setItems(response.data.data.items || []);
      } else {
        console.error('Failed to load cart:', response.data.message);
        throw new Error(response.data.message || 'Failed to load cart');
      }
    } catch (error) {
      console.error('Error loading cart from backend:', error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        console.log('Falling back to localStorage cart');
        setItems(JSON.parse(savedCart));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cart from backend when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromBackend();
    } else {
      // Load from localStorage for non-authenticated users
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    }
  }, [isAuthenticated, user, loadCartFromBackend]);

  // Save cart to localStorage for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    console.log('Adding to cart:', product, 'quantity:', quantity, 'isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      // Add to backend
      try {
        console.log('Adding to backend cart...');
        const response = await cartAPI.addToCart(product.id, quantity);
        
        if (response.data.success) {
          console.log('Successfully added to backend cart');
          // Reload cart from backend
          await loadCartFromBackend();
        } else {
          console.error('Backend add to cart failed:', response.data);
          throw new Error(response.data.message || 'Failed to add to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    } else {
      console.log('Adding to localStorage cart...');
      // Add to localStorage for non-authenticated users
      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          const updatedItems = prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          console.log('Updated localStorage cart items:', updatedItems);
          return updatedItems;
        } else {
          const newItems = [...prevItems, { ...product, quantity }];
          console.log('New localStorage cart items:', newItems);
          return newItems;
        }
      });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    console.log('Updating quantity:', productId, quantity, 'isAuthenticated:', isAuthenticated);
    
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      try {
        console.log('Making API call to update cart item...');
        const response = await cartAPI.updateCartItem(productId, quantity);
        console.log('Update cart response:', response.data);
        
        if (response.data.success) {
          console.log('Successfully updated, reloading cart...');
          await loadCartFromBackend();
        } else {
          console.error('Update failed:', response.data.message);
          throw new Error(response.data.message || 'Failed to update cart');
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
      }
    } else {
      console.log('Updating localStorage cart...');
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = async (productId) => {
    console.log('Removing from cart:', productId, 'isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated) {
      try {
        console.log('Making API call to remove cart item...');
        const response = await cartAPI.removeFromCart(productId);
        console.log('Remove cart response:', response.data);
        
        if (response.data.success) {
          console.log('Successfully removed, reloading cart...');
          await loadCartFromBackend();
        } else {
          console.error('Remove failed:', response.data.message);
          throw new Error(response.data.message || 'Failed to remove from cart');
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
      }
    } else {
      console.log('Removing from localStorage cart...');
      setItems(prevItems => prevItems.filter(item => item.id !== productId));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        const response = await cartAPI.clearCart();
        if (response.data.success) {
          setItems([]);
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
    } else {
      setItems([]);
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.discounted_price || item.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    const count = items.reduce((count, item) => count + item.quantity, 0);
    console.log('Cart count:', count, 'items:', items);
    return count;
  };

  // Run sync when user becomes authenticated
  useEffect(() => {
    const syncCart = async () => {
      const localCart = localStorage.getItem('cart');
      console.log('Sync check - isAuthenticated:', isAuthenticated, 'user:', user, 'localCart:', localCart);
      
      if (localCart && isAuthenticated && user) {
        try {
          const localItems = JSON.parse(localCart);
          console.log('Local cart items to sync:', localItems);
          
          if (localItems.length > 0) {
            console.log('Syncing local cart with backend:', localItems);
            
            // Add each item to backend cart
            for (const item of localItems) {
              try {
                console.log(`Syncing item: ${item.name} (ID: ${item.id}) x${item.quantity}`);
                const response = await cartAPI.addToCart(item.id, item.quantity);
                console.log(`Sync response for ${item.name}:`, response.data);
              } catch (error) {
                console.error(`Error syncing item ${item.name}:`, error);
              }
            }
            
            // Clear localStorage cart after sync
            console.log('Clearing localStorage cart after sync');
            localStorage.removeItem('cart');
            
            // Reload cart from backend to get updated data
            console.log('Reloading cart from backend after sync');
            await loadCartFromBackend();
          }
        } catch (error) {
          console.error('Error syncing local cart with backend:', error);
        }
      }
    };

    if (isAuthenticated && user) {
      syncCart();
    }
  }, [isAuthenticated, user, loadCartFromBackend]);

  const value = {
    items,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    loadCartFromBackend
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
