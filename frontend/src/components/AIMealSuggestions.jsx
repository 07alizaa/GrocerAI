import React, { useState } from 'react';
import { ChefHat, Sparkles, Plus, X, ArrowRight, Clock, TrendingUp, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIMealSuggestions = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(['']);

  const addIngredient = () => {
    if (ingredients.length < 6) {
      setIngredients([...ingredients, '']);
    }
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const generateMealSuggestion = () => {
    const validIngredients = ingredients.filter(ing => ing.trim());
    if (validIngredients.length === 0) return;

    // Redirect to AI chat page with ingredients context
    const ingredientsText = validIngredients.join(', ');
    navigate(`/ai-chat?ingredients=${encodeURIComponent(ingredientsText)}`);
  };

  return (
    <section className="py-16 bg-secondary -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-900/10 text-emerald-900 px-6 py-2 rounded-lg text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Technology
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Intelligent Meal Planning
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your ingredients into personalized meal plans with our advanced AI system.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-3">
                  <span className="bg-emerald-900/10 text-emerald-900 rounded-full w-6 h-6 flex items-center justify-center font-medium text-sm">1</span>
                  What ingredients do you have?
                </h3>
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        placeholder={`Ingredient ${index + 1} (e.g., chicken, tomatoes, basil)`}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900/30 transition-all duration-200 text-base"
                      />
                      {ingredients.length > 1 && (
                        <button
                          onClick={() => removeIngredient(index)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {ingredients.length < 6 && (
                    <button
                      onClick={addIngredient}
                      className="flex items-center gap-2 text-emerald-900 hover:text-emerald-800 font-medium transition-all duration-200 p-2 hover:bg-emerald-900/5 rounded-lg text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add another ingredient
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={generateMealSuggestion}
                disabled={ingredients.every(ing => !ing.trim())}
                className="w-full bg-primary text-white hover:bg-primary/90  px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
              >
                <ChefHat className="w-5 h-5" />
                Generate Meal Suggestion
              </button>
            </div>

            {/* AI Chat Interface */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 h-fit">
              {/* Chat Header */}
              <div className="bg-primary text-white p-4 rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Chef Assistant</h3>
                    <p className="text-xs text-white/80">Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[400px] flex flex-col justify-center">
                {/* Welcome Message */}
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-sm text-gray-700">
                      Hi! I'm your AI chef. Add some ingredients and I'll create a personalized recipe just for you! 👨‍🍳
                    </p>
                  </div>
                </div>

                {/* Waiting State */}
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ChefHat className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Add ingredients and click "Generate" to get started!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMealSuggestions;