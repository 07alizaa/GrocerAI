import { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};

export const useAdminActivity = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.getActivity();
      setActivity(response.data);
    } catch (err) {
      console.error('Error fetching admin activity:', err);
      setError(err.response?.data?.message || 'Failed to fetch recent activity');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return { activity, loading, error, refetch: fetchActivity };
};

export const useAdminUsers = (page = 1, limit = 10) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.getUsers({ page, limit });
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const updateUserName = async (userId, name) => {
    try {
      await adminAPI.updateUserName(userId, name);
      toast.success('User name updated successfully');
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Error updating user name:', err);
      toast.error(err.response?.data?.message || 'Failed to update user name');
      throw err;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await adminAPI.deleteUser(userId);
      toast.success('User deleted successfully');
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error(err.response?.data?.message || 'Failed to delete user');
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { 
    users, 
    pagination, 
    loading, 
    error, 
    refetch: fetchUsers,
    updateUserName,
    deleteUser
  };
};

export const useAdminProducts = (page = 1, limit = 10, search = '') => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminAPI.getProducts({ page, limit, search });
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error fetching admin products:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  const createProduct = async (productData) => {
    try {
      await adminAPI.createProduct(productData);
      toast.success('Product created successfully');
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error('Error creating product:', err);
      toast.error(err.response?.data?.message || 'Failed to create product');
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await adminAPI.updateProduct(id, productData);
      toast.success('Product updated successfully');
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error('Error updating product:', err);
      toast.error(err.response?.data?.message || 'Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await adminAPI.deleteProduct(id);
      toast.success('Product deleted successfully');
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error(err.response?.data?.message || 'Failed to delete product');
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { 
    products, 
    pagination, 
    loading, 
    error, 
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
};
