import React from 'react';
import { Users, Target, Award, Heart, Sparkles, ShoppingCart, Leaf, Clock } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "10+ years in AI and grocery retail innovation"
    },
    {
      name: "David Chen",
      role: "CTO & AI Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Former Google AI researcher with expertise in ML"
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Supply chain expert ensuring fresh quality"
    }
  ];

  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability",
      description: "Committed to eco-friendly practices and reducing food waste through smart AI recommendations."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Quality First",
      description: "Every product is carefully selected to ensure the highest quality for our customers."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Innovation",
      description: "Leveraging cutting-edge AI technology to revolutionize the grocery shopping experience."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building stronger communities by connecting families with fresh, healthy food options."
    }
  ];

  const achievements = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1M+", label: "Orders Delivered" },
    { number: "500+", label: "Partner Stores" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="relative bg-primary py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-textLight/10 border border-textLight/20 text-textLight px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                Our Mission
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-textLight leading-[0.9] tracking-tight">
                Revolutionizing 
                <span className="text-accent block">
                  Grocery Shopping
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-textLight/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We're on a mission to make grocery shopping smarter, faster, and more sustainable through the power of artificial intelligence.
              </p>
            </div>

            {/* Right Content - Image */}
            <div className="relative animate-fade-in-up mt-8 lg:mt-0" style={{ animationDelay: '300ms' }}>
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&crop=center" 
                  alt="Fresh groceries and modern shopping"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-accent text-textDark px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl animate-float">
                <div className="text-xl sm:text-2xl font-black">
                  <AnimatedCounter end="5" suffix="+ Years" duration={2000} delay={1000} />
                </div>
                <div className="text-xs sm:text-sm font-bold">Innovation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-textLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
              Our Story
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-textDark/80 leading-relaxed">
              <p>
                Founded in 2019, GrocerAI was born from a simple observation: grocery shopping hadn't evolved with technology. While we could order anything online, the grocery experience remained fragmented, time-consuming, and often wasteful.
              </p>
              <p>
                Our founders, passionate about both technology and sustainable living, envisioned a world where AI could predict your needs, suggest healthier alternatives, and reduce food waste—all while saving you time and money.
              </p>
              <p>
                Today, we're proud to serve over 50,000 families across the country, helping them discover new recipes, maintain healthier diets, and reduce their environmental footprint through smarter shopping decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
              Our Values
            </h2>
            <p className="text-base sm:text-lg text-textDark/70 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-textLight rounded-2xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-stagger-in border border-gray-100"
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl text-primary mb-4 sm:mb-6">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-textDark/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 bg-textLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-textDark/70 max-w-3xl mx-auto">
              The passionate individuals behind GrocerAI's innovation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-secondary rounded-2xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-stagger-in"
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <div className="relative inline-block mb-4 sm:mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-accent rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-textDark" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-accent font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  {member.role}
                </p>
                <p className="text-textDark/70 text-xs sm:text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-textLight mb-4 sm:mb-6">
              Our Impact
            </h2>
            <p className="text-base sm:text-lg text-textLight/80 max-w-3xl mx-auto">
              Numbers that showcase our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center animate-stagger-in"
                style={{ animationDelay: `${1000 + index * 150}ms` }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-accent mb-2 animate-pulse-glow">
                  <AnimatedCounter 
                    end={achievement.number} 
                    duration={2500} 
                    delay={1000 + index * 200} 
                  />
                </div>
                <div className="text-sm sm:text-base text-textLight/80 font-semibold">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              Ready to Join Our Journey?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-textDark/70 leading-relaxed max-w-3xl mx-auto">
              Experience the future of grocery shopping with AI-powered recommendations, 
              fresh quality products, and sustainable practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 sm:pt-4">
              <button className="bg-primary text-textLight hover:bg-primary/90 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center">
                <ShoppingCart className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Start Shopping
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-textLight px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
