import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Clock, Truck, Star, TrendingUp, User, Heart, Gift, Percent, Zap, MessageCircle, Sparkles, ChefHat, Leaf, Shield, Package, ArrowRight, Award, Users, CheckCircle, Quote, Bell } from 'lucide-react';

const BuyerHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-white to-primary/5">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, ${getComputedStyle(document.documentElement).getPropertyValue('--color-accent') || '#FFD54F'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="text-textLight">
              <div className="inline-flex items-center bg-accent/20 text-accent px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Welcome to Your Premium Dashboard
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your{' '}
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  Premium
                </span>
                <br />Shopping Experience
              </h1>
              
              <p className="text-xl text-textLight/90 mb-8 leading-relaxed max-w-lg">
                Discover fresh, premium groceries with AI-powered recommendations, 
                lightning-fast delivery, and personalized service tailored just for you.
              </p>

              {/* Premium Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-accent mb-1">5K+</div>
                  <div className="text-sm text-textLight/80">Premium Products</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-accent mb-1">30min</div>
                  <div className="text-sm text-textLight/80">Express Delivery</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-accent mb-1">99.9%</div>
                  <div className="text-sm text-textLight/80">Satisfaction</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="group bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="h-6 w-6" />
                  Start Shopping
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/orders"
                  className="group bg-white/10 hover:bg-white/20 text-textLight border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-3"
                >
                  <Clock className="h-6 w-6" />
                  My Orders
                </Link>
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&crop=center"
                    alt="Premium groceries"
                    className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating Premium Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-accent to-accent/80 text-primary p-4 rounded-2xl shadow-xl">
                    <Award className="h-6 w-6 mb-1" />
                    <div className="text-xs font-bold">Premium</div>
                  </div>
                  
                  {/* Floating Feature Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-textDark">Express Delivery</div>
                        <div className="text-sm text-gray-600">30min guarantee</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-accent/20 to-white/10 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Quick Actions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white shadow-sm border border-gray-200 text-gray-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Zap className="h-4 w-4 mr-2 text-blue-600" />
              Quick Access
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Access all your essential features with just one click. Streamlined for your convenience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/cart"
              className="group bg-white hover:bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <ShoppingCart className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shopping Cart</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">View and manage items in your cart</p>
              <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-medium">Access Cart</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>

            <Link
              to="/orders"
              className="group bg-white hover:bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-green-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-green-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                <Package className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order History</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Track and manage your orders</p>
              <div className="flex items-center text-green-600 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-medium">View Orders</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>

            <Link
              to="/profile"
              className="group bg-white hover:bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-purple-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <User className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">My Profile</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Update personal information</p>
              <div className="flex items-center text-purple-600 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-medium">Edit Profile</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>

            <Link
              to="/ai-chat"
              className="group bg-white hover:bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-orange-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
                <MessageCircle className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Get smart recommendations</p>
              <div className="flex items-center text-orange-600 group-hover:translate-x-1 transition-transform">
                <span className="text-sm font-medium">Start Chat</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-accent/10 text-accent px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="h-4 w-4 mr-2" />
              Premium Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              Why Choose GrocerAI Premium?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Experience the ultimate grocery shopping with AI-powered features, premium quality, and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">AI Meal Planning</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Get personalized meal suggestions based on your preferences, dietary needs, and available ingredients.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">Express Delivery</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Lightning-fast delivery in 30 minutes or less. Fresh groceries delivered to your doorstep.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Schedule Now</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">Organic & Fresh</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Premium organic produce sourced directly from local farms. Quality guaranteed.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Browse Organic</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">Quality Guarantee</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                100% satisfaction guaranteed. Not happy with your order? We'll make it right.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Our Promise</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">Premium Support</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                24/7 dedicated customer support from our expert team. Always here to help.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Contact Us</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Join thousands of happy customers sharing recipes, tips, and experiences.
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-medium">Join Now</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Special Offers */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-white" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center bg-accent text-primary px-6 py-3 rounded-full font-bold text-lg mb-6 animate-pulse">
              <Gift className="h-5 w-5 mr-2" />
              LIMITED TIME OFFER
            </div>
            <h2 className="text-4xl font-bold text-textLight mb-4">
              Up to 50% OFF Premium Produce
            </h2>
            <p className="text-textLight/90 text-xl mb-8 max-w-2xl mx-auto">
              Fresh, organic fruits and vegetables at unbeatable prices. Limited stock available!
            </p>
            <Link
              to="/products?category=organic"
              className="bg-accent text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-accent/90 hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3 shadow-xl"
            >
              <TrendingUp className="h-6 w-6" />
              <span>Shop Premium Deals</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Categories */}
      <section className="py-20 bg-gradient-to-br from-secondary to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Premium Categories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our carefully curated selection of premium products across all categories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link to="/products?category=fruits" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center border border-gray-100">
              <div className="text-4xl mb-4">🍎</div>
              <h3 className="font-bold text-textDark group-hover:text-primary transition-colors">Fresh Fruits</h3>
              <p className="text-gray-500 text-sm mt-1">Premium selection</p>
            </Link>
            <Link to="/products?category=vegetables" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center border border-gray-100">
              <div className="text-4xl mb-4">🥬</div>
              <h3 className="font-bold text-textDark group-hover:text-primary transition-colors">Vegetables</h3>
              <p className="text-gray-500 text-sm mt-1">Organic & fresh</p>
            </Link>
            <Link to="/products?category=dairy" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center border border-gray-100">
              <div className="text-4xl mb-4">🥛</div>
              <h3 className="font-bold text-textDark group-hover:text-primary transition-colors">Dairy</h3>
              <p className="text-gray-500 text-sm mt-1">Farm fresh</p>
            </Link>
            <Link to="/products?category=meat" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center border border-gray-100">
              <div className="text-4xl mb-4">🥩</div>
              <h3 className="font-bold text-textDark group-hover:text-primary transition-colors">Premium Meat</h3>
              <p className="text-gray-500 text-sm mt-1">Quality cuts</p>
            </Link>
            <Link to="/products?category=bakery" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center border border-gray-100">
              <div className="text-4xl mb-4">🍞</div>
              <h3 className="font-bold text-textDark group-hover:text-primary transition-colors">Bakery</h3>
              <p className="text-gray-500 text-sm mt-1">Freshly baked</p>
            </Link>
            <Link to="/products?category=snacks" className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center border border-gray-100">
              <div className="text-4xl mb-4">🍿</div>
              <h3 className="font-bold text-textDark group-hover:text-primary transition-colors">Snacks</h3>
              <p className="text-gray-500 text-sm mt-1">Healthy options</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Star className="h-4 w-4 mr-2" />
              Chef's Choice Collection
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Featured Premium Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked by our culinary experts. Fresh, premium quality ingredients that transform ordinary meals into extraordinary experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Organic Hass Avocados", 
                price: 4.99, 
                originalPrice: 6.99, 
                image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop&crop=center",
                badge: "Organic",
                badgeColor: "bg-green-500",
                category: "Fresh Produce"
              },
              { 
                name: "Premium Strawberries", 
                price: 3.99, 
                originalPrice: null, 
                image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop&crop=center",
                badge: "Premium",
                badgeColor: "bg-accent",
                category: "Seasonal Fruits"
              },
              { 
                name: "Artisan Sourdough Bread", 
                price: 2.79, 
                originalPrice: 3.29, 
                image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&crop=center",
                badge: "Fresh Baked",
                badgeColor: "bg-orange-500",
                category: "Bakery"
              },
              { 
                name: "Greek Yogurt Supreme", 
                price: 5.49, 
                originalPrice: null, 
                image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=300&fit=crop&crop=center",
                badge: "Protein Rich",
                badgeColor: "bg-blue-500",
                category: "Dairy"
              }
            ].map((product, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-primary/20 relative"
              >
                {/* Product Image Container */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Premium Badge */}
                  <div className={`absolute top-4 left-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm`}>
                    {product.badge}
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-200 hover:scale-110">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                    <button className="bg-primary text-white rounded-full p-2 shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-200 hover:scale-110">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded-md text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3.5 w-3.5 ${i < 4 ? 'text-accent fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        4.8 (124)
                      </span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Savings Badge */}
                    {product.originalPrice && (
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:shadow-lg hover:shadow-primary/25 transform hover:scale-[1.02]">
                    <ShoppingCart className="h-4 w-4 group-hover/btn:animate-bounce" />
                    <span>Add to Cart</span>
                  </button>
                  
                  {/* Quick Buy */}
                  <button className="w-full text-primary hover:text-primary/80 font-medium text-sm py-2 transition-colors duration-200 border border-primary/20 rounded-xl hover:bg-primary/5">
                    Buy Now • Express Checkout
                  </button>
                </div>

                {/* Premium Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-secondary/50 to-primary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-2xl font-bold text-primary mb-4">Discover More Premium Products</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Explore our complete collection of handpicked, premium groceries curated by culinary experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/products"
                  className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transform hover:scale-105"
                >
                  <span>View All Products</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/categories"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  <span>Browse Categories</span>
                  <Package className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="py-20 bg-gradient-to-br from-secondary to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-accent/10 text-accent px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-textDark mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their grocery shopping experience with GrocerAI's premium service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Working Mom",
                rating: 5,
                text: "GrocerAI's meal planning has transformed our family dinners! The AI suggests perfect recipes based on what we have, and my kids actually eat their vegetables now.",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Mike Chen",
                role: "Professional Chef",
                rating: 5,
                text: "The AI recommendations are incredibly smart. It understands seasonal ingredients and suggests combinations I wouldn't have thought of. Game-changing for menu planning.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Emma Davis",
                role: "Nutrition Coach",
                rating: 5,
                text: "I love how the AI tracks my dietary preferences and nutritional goals. It's like having a personal dietitian that learns from every purchase.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Robert Miller",
                role: "Retiree",
                rating: 5,
                text: "The predictive shopping feature is amazing! GrocerAI knows when I'm running low on essentials and reminds me to reorder. So convenient at my age.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Lisa Wang",
                role: "Tech Executive",
                rating: 5,
                text: "Finally, an AI that actually understands food! The smart shopping lists save me hours every week, and the meal suggestions are always spot-on.",
                avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Tom Anderson",
                role: "Family Father",
                rating: 5,
                text: "The family meal planning feature is incredible. GrocerAI considers everyone's preferences and dietary restrictions. Our dinner stress is gone!",
                avatar: "https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="flex items-center mb-6">
                  <Quote className="h-8 w-8 text-primary/20 mr-3" />
                  <div className="flex text-accent">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-primary/10"
                  />
                  <div>
                    <h4 className="font-bold text-textDark">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">4.9/5</div>
                  <div className="text-gray-600 text-sm">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">10K+</div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg">
                Join our community of satisfied customers and transform your grocery shopping experience today!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#B0DB9C] to-[#ECFAE5] rounded-3xl p-8 md:p-16 relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop&crop=center')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-20 right-20 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-10 left-20 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0A400C]">
                      Stay Fresh with Our Newsletter
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Get the latest updates on fresh arrivals, exclusive deals, and seasonal specials. 
                      Plus, enjoy 10% off your first order when you subscribe!
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Percent className="h-6 w-6 text-[#0A400C]" />
                      <span className="text-gray-700">Exclusive discounts and early access to sales</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Bell className="h-6 w-6 text-[#0A400C]" />
                      <span className="text-gray-700">New product announcements and seasonal tips</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Gift className="h-6 w-6 text-[#0A400C]" />
                      <span className="text-gray-700">Special birthday treats and loyalty rewards</span>
                    </div>
                  </div>
                </div>

                {/* Right Content - Newsletter Form */}
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="bg-[#ECFAE5] rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <MessageCircle className="h-10 w-10 text-[#B0DB9C]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0A400C] mb-2">
                      Subscribe Now
                    </h3>
                    <p className="text-gray-600">
                      Join 10,000+ subscribers and get 10% off your first order!
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0DB9C] focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Subscribe & Save 10%
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By subscribing, you agree to our Privacy Policy and Terms of Service. 
                    Unsubscribe anytime.
                  </p>

                  {/* Special Offer Badge */}
                  <div className="text-center mt-6">
                    <span className="inline-flex items-center bg-[#B0DB9C] text-[#0A400C] px-4 py-2 rounded-full text-sm font-medium">
                      <Gift className="h-4 w-4 mr-2" />
                      Limited Time: 10% OFF First Order
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Chat Button */}
      <Link 
        to="/ai-chat"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-primary/90 text-textLight p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-40 group"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-accent animate-pulse" />
        </div>
        <div className="absolute -top-12 right-0 bg-textDark text-textLight px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with GrocerAI
        </div>
      </Link>
    </div>
  );
};

export default BuyerHome;
