import { useState, useEffect, useCallback } from 'react';
import { productsAPI, categoriesAPI } from '../services/api';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getAll(filters);
      setProducts(response.data.data || response.data);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, pagination, refetch: fetchProducts };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getFeatured();
      setProducts(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching featured products:', err);
      setError(err.response?.data?.message || 'Failed to fetch featured products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return { products, loading, error, refetch: fetchFeaturedProducts };
};

export const useProductSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = useCallback(async (query, filters = {}) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.search(query, filters);
      setResults(response.data.data || response.data);
    } catch (err) {
      console.error('Error searching products:', err);
      setError(err.response?.data?.message || 'Failed to search products');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, searchProducts, clearSearch };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getById(id);
      setProduct(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.response?.data?.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
};

export const useMainCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMainCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoriesAPI.getMainCategories();
      setCategories(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching main categories:', err);
      setError(err.response?.data?.message || 'Failed to fetch main categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMainCategories();
  }, [fetchMainCategories]);

  return { categories, loading, error, refetch: fetchMainCategories };
};

export const useLowStockProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLowStockProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getLowStock();
      setProducts(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching low stock products:', err);
      setError(err.response?.data?.message || 'Failed to fetch low stock products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLowStockProducts();
  }, [fetchLowStockProducts]);

  return { products, loading, error, refetch: fetchLowStockProducts };
};
