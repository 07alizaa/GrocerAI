import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { categoriesAPI } from '../services/api';

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback static categories with images
  const fallbackCategories = useMemo(() => [
    {
      id: 1,
      name: "Fresh Fruits",
      description: "Seasonal fruits picked fresh",
      items: "50+ items",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Vegetables",
      description: "Organic & farm fresh veggies",
      items: "80+ items",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Dairy Products",
      description: "Fresh milk, cheese & yogurt",
      items: "30+ items",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Meat & Seafood",
      description: "Premium quality meat & fish",
      items: "40+ items",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "Bakery",
      description: "Fresh bread & pastries",
      items: "25+ items",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 6,
      name: "Pantry Staples",
      description: "Rice, pulses & cooking essentials",
      items: "100+ items",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center"
    }
  ], []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Attempting to fetch categories from API...');
        const response = await categoriesAPI.getAll();
        console.log('Categories API response:', response.data);
        
        if (response.data.success && response.data.data && response.data.data.length > 0) {
          // Map API categories to display format
          const apiCategories = response.data.data.map((category, index) => ({
            ...category,
            items: "Coming soon",
            image: fallbackCategories[index % fallbackCategories.length]?.image || 
                   "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center"
          }));
          console.log('Using API categories:', apiCategories);
          setCategories(apiCategories);
        } else {
          console.log('API response invalid or empty, using fallback categories');
          setCategories(fallbackCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        console.log('Using fallback categories due to error');
        // Always use fallback categories if API fails
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure proper rendering
    setTimeout(() => {
      fetchCategories();
    }, 100);
  }, [fallbackCategories]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl h-72 sm:h-80"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="categories" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-white border border-gray-200 text-primary px-6 py-3 rounded-full text-sm font-bold shadow-lg mb-6 animate-fade-in-up">
            <span className="animate-bounce">🛒</span>
            <span className="ml-2">Shop by Categories</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight animate-fade-in-up" style={{animationDelay: '200ms'}}>
            Find What You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '400ms'}}>
            Browse through our carefully curated categories to discover fresh, quality products 
            for every meal and occasion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group cursor-pointer border-2 border-gray-100 hover:border-primary transform-gpu animate-stagger-in hover-lift"
              style={{
                animationDelay: `${600 + index * 150}ms`
              }}
            >
              {/* Category Image */}
              <div className="bg-primary/5 h-40 sm:h-48 relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-300"></div>
                
                {/* Floating badge with animation */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 transform group-hover:scale-110 transition-transform duration-300">
                  <span className="bg-white text-primary px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {category.items}
                  </span>
                </div>

                {/* Animated overlay on hover */}
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>

              {/* Category Content */}
              <div className="p-8 relative">
                {/* Animated background element */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500 ease-out"></div>
                
                <h3 className="text-2xl font-black text-primary mb-3 group-hover:text-primary transition-colors duration-300 transform group-hover:translate-x-1">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {category.description}
                </p>
                
                {/* Enhanced button with multiple animations */}
                <div className="relative overflow-hidden">
                  <button className="flex items-center text-primary hover:text-primary font-bold transition-all duration-300 group-hover:translate-x-2 bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl relative z-10 group-hover:shadow-lg">
                    <span className="relative z-10">Shop Now</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    
                    {/* Animated background sweep */}
                    <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-5"></div>
                  </button>
                </div>

                {/* Subtle floating elements */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-8px] transition-all duration-500 delay-100"></div>
                <div className="absolute -bottom-1 -right-6 w-4 h-4 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[-12px] transition-all duration-700 delay-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-16">
          <button className="bg-primary text-textLight hover:bg-primary/90 hover:scale-105 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-primary/25 group relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            {/* Animated background */}
            <div className="absolute inset-0 bg-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
