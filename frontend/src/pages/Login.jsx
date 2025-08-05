import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  console.log('Login component authContext:', authContext);
  
  if (!authContext) {
    console.error('AuthContext is undefined in Login component');
    return <div>Error: AuthContext not available</div>;
  }
  
  const { login } = authContext;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        console.log('✅ Login successful! User role:', result.user?.role);
        
        // Redirect based on user role from login result
        if (result.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/buyer/home');
        }
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1200&fit=crop&crop=center')`
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A400C]/80 to-[#B0DB9C]/60"></div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white h-full">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6">
                Welcome Back to
                <span className="text-[#B0DB9C] block">DailyGrocer</span>
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Fresh groceries delivered to your door. Quality guaranteed, convenience delivered.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#B0DB9C] rounded-full"></div>
                  <span>Fresh produce from local farms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#B0DB9C] rounded-full"></div>
                  <span>30-minute express delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#B0DB9C] rounded-full"></div>
                  <span>100% satisfaction guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#ECFAE5] min-h-[calc(100vh-64px-100px)]">
        <div className="max-w-md w-full">
          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0A400C] mb-2">Sign In</h2>
              <p className="text-gray-600">Welcome back! Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0A400C] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0DB9C] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#0A400C] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0DB9C] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#B0DB9C] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#B0DB9C] focus:ring-[#B0DB9C]"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-[#B0DB9C] hover:text-[#0A400C] transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#B0DB9C] text-[#0A400C] hover:bg-[#0A400C] hover:text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#B0DB9C] hover:text-[#0A400C] font-semibold transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
