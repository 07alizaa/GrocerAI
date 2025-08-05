import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, ArrowLeft, MessageCircle, Zap, ChefHat, Lightbulb } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { aiAPI } from '../services/api';
import toast from 'react-hot-toast';

const AIChat = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      content: "🍃 Welcome to GrocerAI! I'm your intelligent shopping companion. I can help you with meal planning, recipe suggestions, nutritional advice, grocery shopping tips, and so much more. What would you like to explore today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for ingredients parameter and auto-start conversation
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const ingredients = urlParams.get('ingredients');
    
    if (ingredients) {
      const ingredientsMessage = `I have these ingredients: ${ingredients}. Can you suggest some meal ideas using these?`;
      setInputMessage(ingredientsMessage);
      
      // Auto-send the message after a short delay
      setTimeout(async () => {
        const userMessage = {
          id: Date.now(),
          role: 'user',
          content: ingredientsMessage,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        
        setIsLoading(true);
        try {
          const response = await aiAPI.chat(
            ingredientsMessage,
            messages.slice(-8)
          );

          if (response.data.success) {
            const aiMessage = {
              id: Date.now() + 1,
              role: 'ai',
              content: response.data.data.message,
              timestamp: response.data.data.timestamp
            };
            setMessages(prev => [...prev, aiMessage]);
          }
        } catch (error) {
          console.error('Chat error:', error);
          toast.error("I'm having trouble responding right now. Please try again in a moment.");
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    }
  }, [location.search, messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiAPI.chat(
        userMessage.content,
        messages.slice(-8) // Send last 8 messages for context
      );

      if (response.data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          role: 'ai',
          content: response.data.data.message,
          timestamp: response.data.data.timestamp
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(response.data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Handle specific error cases
      let errorMessage = "I'm sorry, I'm having trouble responding right now. Please try again in a moment.";
      
      if (error.response?.status === 429) {
        errorMessage = "I'm getting a lot of questions right now. Please wait a moment before asking again.";
      } else if (error.response?.status === 401) {
        errorMessage = "Please log in to chat with me.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast.error(errorMessage);
      
      const aiErrorMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: errorMessage,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Link 
                to="/buyer-home" 
                className="text-green-600 hover:text-green-800 transition-colors p-2 hover:bg-green-100 rounded-xl"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">GrocerAI Assistant</h1>
                  <p className="text-green-600">Your intelligent shopping companion</p>
                </div>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-full border-2 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Online & Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          
          {/* Sidebar - Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-green-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-500" />
                Quick Start
              </h3>
              <div className="space-y-3">
                {[
                  { icon: ChefHat, text: "Plan today's meals", color: "bg-green-50 text-green-700 hover:bg-green-100 border-green-300" },
                  { icon: Sparkles, text: "Get recipe ideas", color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-300" },
                  { icon: MessageCircle, text: "Nutrition advice", color: "bg-lime-50 text-lime-700 hover:bg-lime-100 border-lime-300" },
                  { icon: Zap, text: "Shopping tips", color: "bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-300" }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(item.text)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border-2 ${item.color}`}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg border-2 border-green-500">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-200" />
                AI Capabilities
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Personalized meal planning",
                  "Smart recipe suggestions", 
                  "Nutritional guidance",
                  "Budget optimization",
                  "Seasonal recommendations"
                ].map((capability, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span className="text-green-50">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chat Container */}
          <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-green-50/50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'ai' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-green-300">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white border-2 border-green-500'
                        : 'bg-white border-2 border-green-200 text-gray-900'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-3 ${
                      message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-gray-500">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-green-300">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white border-2 border-green-200 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                      <span className="text-gray-600">GrocerAI is thinking...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-green-50 border-t-2 border-green-200">
              {/* Quick Suggestions */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {[
                  "What's for dinner tonight?",
                  "Healthy breakfast ideas",
                  "Budget meal planning",
                  "Seasonal vegetables"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(suggestion)}
                    className="text-sm bg-white text-green-700 px-4 py-2 rounded-full hover:bg-green-100 transition-all duration-200 border-2 border-green-200 hover:border-green-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    disabled={isLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-4">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about groceries, recipes, nutrition, or meal planning..."
                  className="flex-1 border-2 border-green-200 rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm bg-white"
                  rows="3"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-2 border-green-500"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
