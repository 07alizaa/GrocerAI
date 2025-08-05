import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-textLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Grocer<span className="text-accent">AI</span>
              </h3>
              <p className="text-textLight/80 leading-relaxed">
                The future of grocery shopping powered by artificial intelligence. 
                Smart recommendations, personalized meal planning, and effortless shopping.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-textLight/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-textLight/80">support@grocerai.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-textLight/80">123 AI Plaza, Tech City, TC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-textLight/80 hover:text-accent transition-colors">Home</a></li>
              <li><a href="#features" className="text-textLight/80 hover:text-accent transition-colors">AI Features</a></li>
              <li><a href="#products" className="text-textLight/80 hover:text-accent transition-colors">Products</a></li>
              <li><a href="#categories" className="text-textLight/80 hover:text-accent transition-colors">Categories</a></li>
              <li><a href="#contact" className="text-textLight/80 hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#blog" className="text-textLight/80 hover:text-accent transition-colors">AI Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#help" className="text-textLight/80 hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#shipping" className="text-textLight/80 hover:text-accent transition-colors">Smart Delivery</a></li>
              <li><a href="#returns" className="text-textLight/80 hover:text-accent transition-colors">Returns & Refunds</a></li>
              <li><a href="#faq" className="text-textLight/80 hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#track" className="text-textLight/80 hover:text-accent transition-colors">AI Order Tracking</a></li>
              <li><a href="#support" className="text-textLight/80 hover:text-accent transition-colors">24/7 AI Support</a></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-accent">Stay Connected</h4>
            
            {/* Social Media */}
            <div className="space-y-4">
              <p className="text-textLight/80">Follow us for AI shopping tips and updates</p>
              <div className="flex space-x-4">
                <a href="#" className="bg-accent text-textDark p-2 rounded-full hover:bg-textLight transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-accent text-textDark p-2 rounded-full hover:bg-textLight transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-accent text-textDark p-2 rounded-full hover:bg-textLight transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-accent text-textDark p-2 rounded-full hover:bg-textLight transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* App Download */}
            <div className="space-y-3">
              <p className="text-textLight/80">Download our AI shopping app</p>
              <div className="space-y-2">
                <a href="#" className="flex items-center space-x-3 bg-accent text-textDark px-4 py-2 rounded-lg font-medium hover:bg-textLight transition-colors text-sm">
                  <span className="text-lg">📱</span>
                  <span>Download for iOS</span>
                </a>
                <a href="#" className="flex items-center space-x-3 bg-accent text-textDark px-4 py-2 rounded-lg font-medium hover:bg-textLight transition-colors text-sm">
                  <span className="text-lg">🤖</span>
                  <span>Download for Android</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-textLight/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-textLight/80 text-sm">
              © 2025 GrocerAI. All rights reserved. Powered by artificial intelligence.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-textLight/80 hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-textLight/80 hover:text-accent transition-colors">Terms of Service</a>
              <a href="#ai-ethics" className="text-textLight/80 hover:text-accent transition-colors">AI Ethics</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
