import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Working Mom",
      rating: 5,
      text: "GrocerAI's meal planning has transformed our family dinners! The AI suggests perfect recipes based on what we have, and my kids actually eat their vegetables now.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Professional Chef",
      rating: 5,
      text: "The AI recommendations are incredibly smart. It understands seasonal ingredients and suggests combinations I wouldn't have thought of. Game-changing for menu planning.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Nutrition Coach",
      rating: 5,
      text: "I love how the AI tracks my dietary preferences and nutritional goals. It's like having a personal dietitian that learns from every purchase.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Robert Miller",
      role: "Retiree",
      rating: 5,
      text: "The predictive shopping feature is amazing! GrocerAI knows when I'm running low on essentials and reminds me to reorder. So convenient at my age.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Tech Executive",
      rating: 5,
      text: "Finally, an AI that actually understands food! The smart shopping lists save me hours every week, and the meal suggestions are always spot-on.",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Tom Anderson",
      role: "Family Father",
      rating: 5,
      text: "GrocerAI has revolutionized our family shopping. The budget tracking and waste reduction features have saved us over $200 monthly. The kids love the recipe suggestions too!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Customer Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-textDark mb-6">
            AI That Actually{' '}
            <span className="text-primary">Works for You</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how GrocerAI's intelligent features are transforming the way families shop, cook, and save money.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="bg-primary rounded-full p-3 shadow-lg">
                  <Quote className="h-6 w-6 text-textLight" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-textDark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">25K+</div>
            <div className="text-gray-600">AI-Powered Shoppers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500K+</div>
            <div className="text-gray-600">Smart Recommendations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30%</div>
            <div className="text-gray-600">Average Time Saved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
