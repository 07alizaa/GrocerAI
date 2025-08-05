import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../services/api';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Star, Filter, Grid, List, Search, Package } from 'lucide-react';
import BuyerProductCard from '../components/BuyerProductCard';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'name'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const params = Object.fromEntries(searchParams);
        const [productsRes, categoriesRes] = await Promise.all([
          productsAPI.getAll(params),
          categoriesAPI.getAll()
        ]);
        
        console.log('Products API response:', productsRes.data);
        
        // The backend returns products directly in data, not data.products
        setProducts(productsRes.data.data || productsRes.data.products || []);
        setCategories(categoriesRes.data.categories || categoriesRes.data.data || []);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [searchParams]);

  const handleAddToCart = (product, quantity = 1) => {
    try {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>
            
            {/* Search */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Search Products</h4>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, search: e.target.value }));
                    setSearchParams(prev => {
                      const params = new URLSearchParams(prev);
                      if (e.target.value) {
                        params.set('search', e.target.value);
                      } else {
                        params.delete('search');
                      }
                      return params;
                    });
                  }}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.category === ''}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSearchParams(prev => {
                          const params = new URLSearchParams(prev);
                          params.delete('category');
                          return params;
                        });
                      }
                    }}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">All Categories</span>
                </label>
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.category === category.id.toString()}
                      onChange={(e) => {
                        const newCategory = e.target.checked ? category.id.toString() : '';
                        setSearchParams(prev => {
                          const params = new URLSearchParams(prev);
                          if (newCategory) {
                            params.set('category', newCategory);
                          } else {
                            params.delete('category');
                          }
                          return params;
                        });
                      }}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Min Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={filters.minPrice}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, minPrice: e.target.value }));
                      setSearchParams(prev => {
                        const params = new URLSearchParams(prev);
                        if (e.target.value) {
                          params.set('minPrice', e.target.value);
                        } else {
                          params.delete('minPrice');
                        }
                        return params;
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Max Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={filters.maxPrice}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, maxPrice: e.target.value }));
                      setSearchParams(prev => {
                        const params = new URLSearchParams(prev);
                        if (e.target.value) {
                          params.set('maxPrice', e.target.value);
                        } else {
                          params.delete('maxPrice');
                        }
                        return params;
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) => {
                  setFilters(prev => ({ ...prev, sortBy: e.target.value }));
                  setSearchParams(prev => {
                    const params = new URLSearchParams(prev);
                    params.set('sortBy', e.target.value);
                    return params;
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {products.length} products found
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <BuyerProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={(product) => console.log('Add to wishlist:', product)}
                showQuantitySelector={false}
              />
            ))}
          </div>

          {products.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="mb-4">
                <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">
                  {Object.values(filters).some(f => f) ? 
                    'Try adjusting your filters or search terms.' : 
                    'No products are currently available.'
                  }
                </p>
              </div>
              {Object.values(filters).some(f => f) && (
                <button
                  onClick={() => {
                    setFilters({
                      category: '',
                      search: '',
                      minPrice: '',
                      maxPrice: '',
                      sortBy: 'name'
                    });
                    setSearchParams({});
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
