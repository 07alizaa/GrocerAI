import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ChefHat, Sparkles, X, MessageCircle, LogIn, Bot, Star, Zap } from 'lucide-react';

const AISuggestionBox = ({ showOnDashboard = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we've already shown the suggestion box this session
    const sessionKey = 'aiSuggestionShown';
    const hasShown = sessionStorage.getItem(sessionKey);
    
    if (hasShown) {
      setHasShownThisSession(true);
      return;
    }

    // Show immediately after loading
    const timer = setTimeout(() => {
      if (!loading) {
        setIsVisible(true);
        sessionStorage.setItem(sessionKey, 'true');
        setHasShownThisSession(true);
      }
    }, 500); // Show after just 0.5 seconds

    return () => clearTimeout(timer);
  }, [loading, showOnDashboard]);

  const handleChatClick = () => {
    if (user) {
      navigate('/buyer/chat');
    } else {
      setShowModal(true);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleLoginClick = () => {
    setShowModal(false);
    navigate('/login');
  };

  // Don't render if already shown this session or still loading
  if (hasShownThisSession && !isVisible) return null;
  if (loading) return null;

  return (
    <>
      {/* AI Suggestion Box */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              x: 100,
              y: 100 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              x: 100 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.6 
            }}
            className={`fixed z-50 max-w-sm ${
              showOnDashboard 
                ? 'bottom-24 right-6' // Higher position to avoid chat bubble conflict
                : 'bottom-6 right-6'   // Normal position for landing page
            }`}
          >
            <div className="relative">
              {/* Simple border background */}
              <div className="absolute inset-0 bg-gray-100 rounded-2xl border border-gray-300"></div>
              
              {/* Main card */}
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative bg-white rounded-2xl p-6">
                  {/* Close button */}
                  <button
                    onClick={handleDismiss}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Header with animated icon */}
                  <div className="flex items-center mb-4">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3 
                      }}
                      className="mr-3"
                    >
                      <div className="p-2 bg-primary rounded-xl">
                        <Bot className="h-6 w-6 text-textLight" />
                      </div>
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-primary text-lg">GrocerAI Assistant</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 text-primary mr-1" />
                        <span>AI-Powered</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <p className="text-primary font-medium mb-2">
                      Need help planning meals? 🍲
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Get personalized meal suggestions, recipe ideas, and smart shopping lists powered by AI!
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <ChefHat className="h-4 w-4 text-primary mr-2" />
                      <span>Custom meal recommendations</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-primary mr-2" />
                      <span>Smart ingredient suggestions</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Zap className="h-4 w-4 text-primary mr-2" />
                      <span>Instant recipe ideas</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleChatClick}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0, 69, 38, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-textLight font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <MessageCircle className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                    <span>Try GrocerAI Now</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      ✨
                    </motion.div>
                  </motion.button>

                  {/* Disclaimer */}
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {user ? "Start chatting instantly!" : "Login required for AI features"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {/* Icon */}
                <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <LogIn className="h-8 w-8 text-textLight" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Login Required
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Please log in to access GrocerAI's personalized meal suggestions and smart shopping features.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleLoginClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 bg-primary text-textLight rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Login
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISuggestionBox;
