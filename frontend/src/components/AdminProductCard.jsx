import React from 'react';
import { Edit3, Trash2, Eye, Package } from 'lucide-react';

const AdminProductCard = ({ product, onEdit, onDelete, onView }) => {
  const primaryImage = product.image_urls?.[0] || '/api/placeholder/300/300';
  const hasMultipleImages = product.image_urls?.length > 1;
  const hasDiscount = product.discounted_price && parseFloat(product.discounted_price) < parseFloat(product.price);

  const getStockColor = (stock, minLevel = 5) => {
    if (stock <= 0) return 'bg-red-100 text-red-800';
    if (stock <= minLevel) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusBadge = () => {
    if (!product.is_active) {
      return 'bg-red-100 text-red-800 border border-red-200';
    }
    return 'bg-green-100 text-primary border border-green-200';
  };

  return (
    <div className="bg-textLight rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-secondary overflow-hidden">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/api/placeholder/300/300';
          }}
        />
        
        {/* Multiple Images Indicator */}
        {hasMultipleImages && (
          <div className="absolute top-3 left-3 bg-black bg-opacity-80 text-textLight text-xs px-3 py-1 rounded-full font-bold">
            +{product.image_urls.length - 1} more
          </div>
        )}
        
        {/* Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-3 right-3 bg-accent text-primary text-xs px-3 py-1 rounded-full font-bold shadow-lg">
            Featured
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getStatusBadge()}`}>
            {product.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
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
        <h3 className="font-bold text-textDark mb-3 line-clamp-2 text-lg">
          {product.name}
        </h3>

        {/* SKU */}
        {product.sku && (
          <p className="text-xs text-gray-600 mb-2 font-medium">
            SKU: {product.sku}
          </p>
        )}

        {/* Category */}
        <p className="text-sm text-primary mb-3 font-semibold bg-secondary px-2 py-1 rounded-lg inline-block">
          {product.category_name || 'No Category'}
        </p>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          {hasDiscount ? (
            <>
              <span className="text-xl font-bold text-primary">
                ₹{parseFloat(product.discounted_price || 0).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{parseFloat(product.price || 0).toFixed(2)}
              </span>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-semibold">
                Sale
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-primary">
              ₹{parseFloat(product.price || 0).toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock & Unit */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-2 rounded-xl text-sm font-bold ${getStockColor(product.stock_quantity, product.min_stock_level)}`}>
            {product.stock_quantity || 0} {product.unit || 'units'}
          </span>
          
          {product.stock_quantity <= (product.min_stock_level || 5) && product.stock_quantity > 0 && (
            <span className="text-xs text-orange-700 font-bold bg-orange-100 px-2 py-1 rounded-full">
              Low Stock!
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium border border-primary/20">
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-xs text-gray-600 font-medium">
                +{product.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Weight */}
        {product.weight && (
          <p className="text-sm text-gray-600 mb-4 bg-secondary px-3 py-2 rounded-lg">
            Weight: <span className="font-semibold">{product.weight} {product.weight_unit || 'kg'}</span>
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => onView(product)}
            className="flex-1 py-3 px-3 bg-blue-500 text-textLight rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </button>
          
          <button
            onClick={() => onEdit(product)}
            className="flex-1 py-3 px-3 bg-primary text-textLight rounded-xl text-sm font-bold hover:bg-accent hover:text-primary transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit</span>
          </button>
          
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 py-3 px-3 bg-red-500 text-textLight rounded-xl text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
