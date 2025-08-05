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
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop&crop=center",
      color: "from-red-100 to-red-200"
    },
    {
      id: 2,
      name: "Vegetables",
      description: "Organic & farm fresh veggies",
      items: "80+ items",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center",
      color: "from-green-100 to-green-200"
    },
    {
      id: 3,
      name: "Dairy Products",
      description: "Fresh milk, cheese & yogurt",
      items: "30+ items",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop&crop=center",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 4,
      name: "Meat & Seafood",
      description: "Premium quality meat & fish",
      items: "40+ items",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop&crop=center",
      color: "from-orange-100 to-orange-200"
    },
    {
      id: 5,
      name: "Bakery",
      description: "Fresh bread & pastries",
      items: "25+ items",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center",
      color: "from-yellow-100 to-yellow-200"
    },
    {
      id: 6,
      name: "Pantry Staples",
      description: "Rice, pulses & cooking essentials",
      items: "100+ items",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center",
      color: "from-amber-100 to-amber-200"
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
                   "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop&crop=center",
            color: fallbackCategories[index % fallbackCategories.length]?.color || "from-gray-100 to-gray-200"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="categories" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse through our wide range of categories to find exactly what you need. 
            From fresh produce to pantry essentials, we've got you covered.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer border-2 border-gray-100 hover:border-green-200"
            >
              {/* Category Image */}
              <div className={`bg-gradient-to-br ${category.color} h-32 relative overflow-hidden`}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-green-900 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-sm text-gray-500 bg-green-50 px-2 py-1 rounded-full">
                    {category.items}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <button className="flex items-center text-green-600 hover:text-green-900 font-medium transition-all duration-300 group-hover:translate-x-2">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-12">
          <button className="border-2 border-green-600 text-green-900 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
