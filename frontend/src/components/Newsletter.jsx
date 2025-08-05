import React, { useState } from 'react';
import { Mail, Gift, Percent, Bell } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    // You can add your newsletter API call here
  };

  return (
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
                    <Mail className="h-10 w-10 text-[#B0DB9C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A400C] mb-2">
                    Subscribe Now
                  </h3>
                  <p className="text-gray-600">
                    Join 10,000+ subscribers and get 10% off your first order!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default Newsletter;
