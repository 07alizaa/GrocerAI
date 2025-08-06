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
    <section id="products" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Featured Products
          </h2>
          <p className="text-lg text-textDark/70 max-w-3xl mx-auto leading-relaxed">
            Discover our top-rated products loved by thousands of customers. 
            Fresh, quality, and delivered with care.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100 animate-stagger-in hover-lift"
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              {/* Product Image & Badge */}
              <div className="relative bg-secondary h-40 sm:h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-textLight px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  {product.badge}
                </div>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-accent text-textDark px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
                    {product.discount}
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 border border-gray-200">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-textDark/60 hover:text-red-500 transition-colors duration-300" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3 group-hover:text-textDark transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-300 ${i < Math.floor(product.rating) ? 'text-accent fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-textDark/60 ml-2 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base sm:text-lg text-textDark/40 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-primary text-textLight hover:bg-primary/90 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl hover:scale-105">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-textLight px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
