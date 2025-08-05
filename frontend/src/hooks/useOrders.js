import { useState, useEffect, useCallback } from 'react';
import { ordersAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
};

export const useOrder = (id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getById(id);
      setOrder(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError(err.response?.data?.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return { order, loading, error, refetch: fetchOrder };
};

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.create(orderData);
      toast.success('Order placed successfully!');
      return response.data;
    } catch (err) {
      console.error('Error creating order:', err);
      const errorMessage = err.response?.data?.message || 'Failed to place order';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createOrder, loading, error };
};

export const useCancelOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelOrder = useCallback(async (orderId, reason) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.cancel(orderId, reason);
      toast.success('Order cancelled successfully');
      return response.data;
    } catch (err) {
      console.error('Error cancelling order:', err);
      const errorMessage = err.response?.data?.message || 'Failed to cancel order';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { cancelOrder, loading, error };
};

export const useAdminOrders = (queryParams = '') => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getAll(queryParams);
      setOrders(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching admin orders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await ordersAPI.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching order stats:', err);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status, notes = '') => {
    try {
      await ordersAPI.updateStatus(orderId, status, notes);
      toast.success('Order status updated successfully');
      fetchOrders(); // Refresh orders list
      fetchStats(); // Refresh stats
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error(err.response?.data?.message || 'Failed to update order status');
      throw err;
    }
  }, [fetchOrders, fetchStats]);

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [fetchOrders, fetchStats]);

  return { 
    orders, 
    stats, 
    loading, 
    error, 
    refetch: fetchOrders,
    updateOrderStatus
  };
};
