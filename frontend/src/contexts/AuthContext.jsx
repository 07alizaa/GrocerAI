import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    console.log('🔍 Starting auth check...');
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token) {
        console.log('❌ No token found, setting loading to false');
        setLoading(false);
        return;
      }

      // If we have stored user data, set it immediately to prevent loading state
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log('� Loaded user from storage:', userData.email);
        } catch {
          console.log('⚠️ Invalid stored user data, will fetch from server');
        }
      }

      console.log('🔑 Token found, validating with backend...');
      
      const response = await fetch('http://localhost:3001/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Auth response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Auth validated, user:', data.user?.email);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        console.log('❌ Auth validation failed, removing tokens');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.error('💥 Auth check failed:', error.message);
      // Only remove token if it's a real auth error, not a network error
      if (error.message.includes('Failed to fetch')) {
        console.log('🌐 Network error - keeping existing user data if available');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } finally {
      console.log('🏁 Auth check complete, setting loading to false');
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // After successful registration, login the user
        const loginResult = await login(userData.email, userData.password);
        return loginResult;
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Debug function to check token
  const debugAuth = () => {
    const token = localStorage.getItem('token');
    console.log('Current token in localStorage:', token ? `${token.substring(0, 20)}...` : 'No token');
    console.log('Current user:', user);
    console.log('IsAuthenticated:', !!user);
    console.log('IsAdmin:', user?.role === 'admin');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    debugAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
