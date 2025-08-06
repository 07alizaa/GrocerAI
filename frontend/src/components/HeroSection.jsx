import React from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gray-100 border border-gray-300 text-primary px-6 py-3 rounded-full text-sm font-bold shadow-lg">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              Powered by Advanced AI
            </div>
            
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-textLight leading-[0.9] tracking-tight">
                Smart Grocery Shopping with{' '}
                <span className="text-accent">
                  GrocerAI
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-textLight/90 font-medium leading-relaxed max-w-2xl">
                Transform your grocery experience with AI-powered meal planning, smart recommendations, and personalized shopping lists.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group bg-accent text-textDark hover:bg-accent/90 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-primary/25 hover:scale-105">
                Start Smart Shopping
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-textLight/30 text-textLight hover:bg-textLight/10 hover:border-textLight/60 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center">
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-textLight/20">
              <div className="text-center">
                <div className="text-3xl font-black text-textLight">25K+</div>
                <div className="text-sm text-textLight/70 font-medium">Smart Shoppers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-textLight">40%</div>
                <div className="text-sm text-textLight/70 font-medium">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-textLight">98%</div>
                <div className="text-sm text-textLight/70 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Premium Image */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Main Image Container with Premium Styling */}
              <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-primary/10 backdrop-blur-sm border border-textLight/20 p-6">
                <div className="w-full h-full bg-textLight rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&crop=center&auto=format&q=80" 
                    alt="Premium fresh groceries and AI-powered shopping experience" 
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Floating AI Badge */}
              <div className="absolute -top-6 -right-6 bg-accent text-textDark px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-sm animate-bounce">
                <Sparkles className="w-5 h-5" />
                AI Powered
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -top-8 -left-6 w-16 h-16 bg-textLight/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -right-4 w-12 h-12 bg-primary/40 rounded-full blur-lg animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full -mb-1">
        <svg 
          className="w-full h-24 text-secondary" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,101.3C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
