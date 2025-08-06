import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AIMealSuggestions from '../components/AIMealSuggestions';
import FeaturesSection from '../components/FeaturesSection';
import CategoriesGrid from '../components/CategoriesGrid';
import ProductsShowcase from '../components/ProductsShowcase';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import AISuggestionBox from '../components/AISuggestionBox';

const DailyGrocerLanding = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main>
        <HeroSection />
        <AIMealSuggestions />
        <FeaturesSection />
        <CategoriesGrid />
        <ProductsShowcase />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      
      {/* AI Suggestion Box for landing page */}
      <AISuggestionBox showOnDashboard={false} />
    </div>
  );
};

export default DailyGrocerLanding;
