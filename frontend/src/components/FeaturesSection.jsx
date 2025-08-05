import React from 'react';
import { Brain, Target, Clock, TrendingUp, Shield, Sparkles } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description: "Smart algorithms analyze your preferences and dietary needs to suggest the perfect products and meals."
    },
    {
      icon: Target,
      title: "Personalized Meal Planning",
      description: "Custom meal plans based on your lifestyle, budget, and nutritional goals, powered by advanced AI."
    },
    {
      icon: Clock,
      title: "Smart Shopping Lists",
      description: "Automatically generated shopping lists that optimize your store visits and reduce food waste."
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Anticipate your needs before you run out. AI predicts when you'll need to restock essentials."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "AI-powered quality checks ensure every product meets our high standards for freshness and safety."
    },
    {
      icon: Sparkles,
      title: "Continuous Learning",
      description: "Our AI gets smarter with every interaction, constantly improving your shopping experience."
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-textDark mb-6">
            The Future of{' '}
            <span className="text-primary">Grocery Shopping</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of grocery shopping with AI technology that learns your preferences and makes shopping effortless.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-secondary rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="mb-6">
                  <div className="bg-primary rounded-2xl p-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="h-8 w-8 text-textLight" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-textDark mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-textLight hover:bg-primary/90 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Experience AI Shopping
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-textLight px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
