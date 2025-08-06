import React, { useState, useEffect } from 'react';
import { ShoppingCart, Sparkles, Loader, AlertCircle, RefreshCw } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const RecommendedProducts = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  const { addToCart } = useCart();
  const { user } = useAuth();

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching AI recommendations...');
      
      const token = localStorage.getItem('token');
      console.log('🔑 Token exists:', !!token);
      
      const response = await fetch('http://localhost:3001/api/ai/recommendations', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 API response status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      
      if (data.success && data.data.recommendations) {
        setRecommendations(data.data.recommendations);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const handleAddToCart = async (productName) => {
    try {
      setAddingToCart(prev => ({ ...prev, [productName]: true }));
      
      // Find product by name to get ID (you might need to fetch from products API)
      const token = localStorage.getItem('token');
      const searchResponse = await fetch(`http://localhost:3001/api/products/search?name=${encodeURIComponent(productName)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        if (searchData.success && searchData.data.length > 0) {
          const product = searchData.data[0];
          await addToCart(product, 1);
        } else {
          throw new Error('Product not found');
        }
      } else {
        throw new Error('Failed to find product');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      // You could show a toast notification here
    } finally {
      setAddingToCart(prev => ({ ...prev, [productName]: false }));
    }
  };

  const LoadingSkeleton = () => (
    <div className="bg-secondary rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          🤖 Recommended for You
        </h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-64 bg-white rounded-xl p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-3"></div>
            <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-secondary rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            🤖 Recommended for You
          </h2>
        </div>
        
        <div className="text-center py-8">
          <p className="text-textDark/70 mb-4">Unable to load recommendations</p>
          <button
            onClick={fetchRecommendations}
            className="inline-flex items-center gap-2 bg-primary text-textLight px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary/90"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-secondary rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            🤖 Recommended for You
          </h2>
        </div>
        
        <div className="text-center py-8">
          <p className="text-textDark/70">Start shopping to get personalized recommendations!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            🤖 Recommended for You
          </h2>
        </div>
        
        <button
          onClick={fetchRecommendations}
          className="text-primary hover:text-primary/80 transition-colors duration-300"
          title="Refresh recommendations"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="mb-4">
              <h3 className="font-bold text-primary text-lg mb-2 line-clamp-2">
                {recommendation.name}
              </h3>
              <p className="text-textDark/70 text-sm leading-relaxed line-clamp-3">
                {recommendation.reason}
              </p>
            </div>
            
            <button
              onClick={() => handleAddToCart(recommendation.name)}
              disabled={addingToCart[recommendation.name]}
              className="w-full bg-primary text-textLight hover:bg-primary/90 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {addingToCart[recommendation.name] ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              <span>
                {addingToCart[recommendation.name] ? 'Adding...' : 'Add to Cart'}
              </span>
            </button>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RecommendedProducts;
