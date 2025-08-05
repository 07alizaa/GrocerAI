import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductsShowcase = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 2.99,
      originalPrice: 3.99,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop&crop=center",
      badge: "Organic",
      discount: "25% OFF"
    },
    {
      id: 2,
      name: "Fresh Spinach",
      price: 1.99,
      originalPrice: 2.49,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop&crop=center",
      badge: "Farm Fresh",
      discount: "20% OFF"
    },
    {
      id: 3,
      name: "Whole Milk",
      price: 3.49,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center",
      badge: "Fresh",
      discount: null
    },
    {
      id: 4,
      name: "Organic Carrots",
      price: 1.79,
      originalPrice: 2.29,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=300&fit=crop&crop=center",
      badge: "Organic",
      discount: "22% OFF"
    },
    {
      id: 5,
      name: "Fresh Strawberries",
      price: 4.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop&crop=center",
      badge: "Premium",
      discount: null
    },
    {
      id: 6,
      name: "Whole Grain Bread",
      price: 2.79,
      originalPrice: 3.29,
      rating: 4.6,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop&crop=center",
      badge: "Fresh Baked",
      discount: "15% OFF"
    }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A400C] mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our top-rated products loved by thousands of customers. 
            Fresh, quality, and delivered with care.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Product Image & Badge */}
              <div className="relative bg-[#ECFAE5] h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#B0DB9C] text-[#0A400C] px-3 py-1 rounded-full text-sm font-medium">
                  {product.badge}
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.discount}
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0A400C] mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-[#0A400C]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-12">
          <button className="border-2 border-[#B0DB9C] text-[#0A400C] hover:bg-[#B0DB9C] hover:text-[#0A400C] px-8 py-3 rounded-lg font-semibold transition-all duration-200">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
