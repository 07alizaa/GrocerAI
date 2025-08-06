import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut, Settings, Users, Package, BarChart3, ChevronDown } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { CartContext } from '../contexts/CartContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const { user, isAuthenticated, isAdmin, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false); // Also close mobile menu if open
    // Use window.location to ensure a complete page refresh and proper navigation
    window.location.href = '/';
  };

  const cartCount = getCartCount();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/buyer/home") : "/"} className="text-3xl font-black text-primary hover:scale-105 transition-transform duration-300 tracking-tight">
              Grocer<span className="text-accent">AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  // Admin Navigation
                  <>
                    <Link to="/admin/dashboard" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Dashboard
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/admin/users" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Users
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/admin/products" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Products
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/admin/categories" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Categories
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/admin/orders" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Orders
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/admin/reports" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Reports
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                  </>
                ) : (
                  // Buyer Navigation
                  <>
                    <Link to="/buyer/home" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Home
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/products" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Products
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/categories" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      Categories
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                    <Link to="/orders" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                      My Orders
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                    </Link>
                  </>
                )}
              </>
            ) : (
              // Guest Navigation
              <>
                <Link to="/" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                  Home
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                </Link>
                <a href="/#products" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                  Products
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                </a>
                <a href="/#categories" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                  Categories
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                </a>
                <Link to="/about" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                  About
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                </Link>
                <a href="/#contact" className="relative text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 group">
                  Contact
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                </a>
              </>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && !isAdmin && (
              // Cart button for buyers only
              <Link to="/cart" className="relative p-3 text-primary hover:text-primary hover:bg-gray-50 rounded-xl transition-all duration-300 group">
                <ShoppingCart className="h-7 w-7" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-textDark text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              // User Menu Dropdown
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-3 text-primary hover:text-primary px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-gray-50 group"
                >
                  <div className="p-1 bg-primary rounded-full">
                    <User className="h-5 w-5 text-textLight" />
                  </div>
                  <span>{user?.name || 'User'}</span>
                  <ChevronDown className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin/profile"
                          className="flex items-center px-4 py-3 text-sm text-textDark hover:bg-gray-50 rounded-lg mx-2"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3 text-primary" />
                          Admin Settings
                        </Link>
                        <Link
                          to="/admin/users"
                          className="flex items-center px-4 py-3 text-sm text-textDark hover:bg-gray-50 rounded-lg mx-2"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Users className="h-4 w-4 mr-3 text-primary" />
                          Manage Users
                        </Link>
                        <Link
                          to="/admin/products"
                          className="flex items-center px-4 py-3 text-sm text-textDark hover:bg-gray-50 rounded-lg mx-2"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Package className="h-4 w-4 mr-3 text-primary" />
                          Manage Products
                        </Link>
                        <Link
                          to="/admin/reports"
                          className="flex items-center px-4 py-3 text-sm text-textDark hover:bg-gray-50 rounded-lg mx-2"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <BarChart3 className="h-4 w-4 mr-3 text-primary" />
                          Analytics
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-sm text-textDark hover:bg-gray-50 rounded-lg mx-2"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <User className="h-4 w-4 mr-3 text-primary" />
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-3 text-sm text-textDark hover:bg-gray-50 rounded-lg mx-2"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Package className="h-4 w-4 mr-3 text-primary" />
                          My Orders
                        </Link>
                        <Link
                          to="/cart"
                          className="flex items-center px-4 py-3 text-sm text-textDark hover:bg-gray-50 rounded-lg mx-2"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-3 text-primary" />
                          Cart ({cartCount})
                        </Link>
                      </>
                    )}
                    <hr className="my-2 mx-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg mx-2 font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login/Register buttons for guests
              <>
                <Link 
                  to="/login"
                  className="flex items-center space-x-2 text-primary hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register"
                  className="bg-accent text-textDark hover:bg-accent/90 hover:scale-105 px-6 py-3 rounded-xl text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-primary hover:text-primary p-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    // Admin Mobile Navigation
                    <>
                      <Link to="/admin/dashboard" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Dashboard
                      </Link>
                      <Link to="/admin/users" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Users
                      </Link>
                      <Link to="/admin/products" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Products
                      </Link>
                      <Link to="/admin/categories" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Categories
                      </Link>
                      <Link to="/admin/orders" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Orders
                      </Link>
                      <Link to="/admin/reports" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Reports
                      </Link>
                    </>
                  ) : (
                    // Buyer Mobile Navigation
                    <>
                      <Link to="/buyer/home" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Home
                      </Link>
                      <Link to="/products" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Products
                      </Link>
                      <Link to="/categories" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Categories
                      </Link>
                      <Link to="/orders" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        My Orders
                      </Link>
                      <Link to="/cart" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                        Cart ({cartCount})
                      </Link>
                    </>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-textDark">
                        {user?.name} {isAdmin && <span className="text-accent">(Admin)</span>}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                // Guest Mobile Navigation
                <>
                  <Link to="/" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                    Home
                  </Link>
                  <a href="/#products" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                    Products
                  </a>
                  <a href="/#categories" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                    Categories
                  </a>
                  <Link to="/about" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                    About
                  </Link>
                  <a href="/#contact" className="block text-primary hover:text-accent px-3 py-2 rounded-md text-base font-medium">
                    Contact
                  </a>
                  <div className="flex flex-col space-y-2 px-3 pt-4">
                    <Link to="/login" className="block text-primary hover:text-accent py-2 text-center">
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      className="bg-accent text-textDark hover:bg-accent/90 hover:scale-105 py-2 rounded-md font-medium transition-all duration-200 text-center block"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
