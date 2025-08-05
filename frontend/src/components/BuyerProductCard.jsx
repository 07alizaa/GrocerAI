import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuyerProductCard = ({ product, onAddToCart, onAddToWishlist, showQuantitySelector = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const primaryImage = product.image_urls?.[0] || '/api/placeholder/300/300';
  const price = parseFloat(product.price || 0);
  const discountedPrice = parseFloat(product.discounted_price || 0);
  const hasDiscount = discountedPrice > 0 && discountedPrice < price;
  const finalPrice = hasDiscount ? discountedPrice : price;
  const discountPercentage = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0;

  const handleAddToCart = () => {
    setIsLoading(true);
    try {
      onAddToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product.max_order_quantity || 10)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity <= (product.min_stock_level || 5) && product.stock_quantity > 0;

  return (
    <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-secondary overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/api/placeholder/300/300';
            }}
          />
        </Link>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-textLight text-xs px-3 py-1 rounded-full font-bold shadow-lg">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Stock Status */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="bg-red-500 text-textLight px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
        
        {/* Featured Badge */}
        {product.is_featured && !isOutOfStock && (
          <div className="absolute top-3 right-3 bg-accent text-primary text-xs px-3 py-1 rounded-full font-bold shadow-lg">
            Featured
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={() => onAddToWishlist && onAddToWishlist(product)}
          className="absolute bottom-3 right-3 p-3 bg-textLight rounded-full shadow-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
        >
          <Heart className="h-5 w-5 text-primary hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}
        
        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-textDark mb-3 line-clamp-2 hover:text-primary transition-colors text-lg">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-accent fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2 font-medium">
            ({product.review_count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-primary">
            ₹{finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ₹{price.toFixed(2)}
            </span>
          )}
          <span className="text-sm text-gray-600 font-medium">
            / {product.unit}
          </span>
        </div>

        {/* Stock Indicator */}
        {isLowStock && !isOutOfStock && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-4">
            <p className="text-xs text-orange-700 font-semibold text-center">
              🔥 Only {product.stock_quantity} left in stock!
            </p>
          </div>
        )}

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center space-x-3">
          {showQuantitySelector && !isOutOfStock && (
            <div className="flex items-center border-2 border-primary rounded-xl bg-secondary">
              <button
                onClick={decrementQuantity}
                className="p-2 hover:bg-primary hover:text-textLight transition-colors rounded-l-xl"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 text-sm font-bold text-primary bg-textLight">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-2 hover:bg-primary hover:text-textLight transition-colors rounded-r-xl"
                disabled={quantity >= (product.max_order_quantity || 10)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isLoading}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-colors flex items-center justify-center space-x-2 shadow-md ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-primary text-textLight hover:bg-accent hover:text-primary shadow-lg hover:shadow-xl'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isLoading ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs bg-secondary text-primary px-3 py-1 rounded-full font-medium border border-primary/20">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerProductCard;
