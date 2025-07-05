"use client"
import React, { useState, useEffect } from 'react';
import { Star, Heart, Users, Quote, ArrowRight, MessageCircle, Sparkles, TrendingUp, Award, CheckCircle, Eye } from 'lucide-react';
import Link from 'next/link';

const TestimonialCard = ({ avatar, name, job, quote, index, isActive, onClick }) => {
  const gradients = [
    "from-blue-500 via-blue-600 to-blue-700",
    "from-blue-600 via-blue-700 to-blue-800",
    "from-blue-400 via-blue-500 to-blue-600",
    "from-blue-700 via-blue-800 to-blue-900",
    "from-blue-500 via-blue-600 to-blue-700"
  ];
  
  const bgColors = [
    "bg-gradient-to-br from-blue-50 to-blue-100",
    "bg-gradient-to-br from-blue-50 to-blue-200", 
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-blue-50 to-blue-150",
    "bg-gradient-to-br from-blue-100 to-blue-200"
  ];
  
  const borderColors = [
    "border-blue-200",
    "border-blue-300",
    "border-blue-200",
    "border-blue-300",
    "border-blue-200"
  ];

  const currentGradient = gradients[index % gradients.length];
  const currentBg = bgColors[index % bgColors.length];
  const currentBorder = borderColors[index % borderColors.length];

  return (
    <div 
      className={`${currentBg} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${currentBorder} border group relative overflow-hidden cursor-pointer transform hover:scale-105`}
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Quote Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${currentGradient} rounded-xl mb-4 text-white shadow-lg relative transform group-hover:scale-110 transition-transform duration-300`}>
        <Quote className="w-6 h-6" />
      </div>

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, starIndex) => (
            <div key={starIndex} className="animate-pulse" style={{ animationDelay: `${starIndex * 0.1}s` }}>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
        </div>

        {/* Quote */}
        <blockquote className="mb-6">
          <p className="text-gray-600 leading-relaxed relative z-10">
            {quote}
          </p>
        </blockquote>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-4"></div>

        {/* User Info */}
        <div className="flex items-center">
          <div className="flex-shrink-0 relative w-12 h-12">
            <div className="w-full h-full bg-white rounded-full p-1 shadow-sm">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="ml-3">
            <p className="font-bold text-gray-900 flex items-center text-sm">
              {name}
              <CheckCircle className="w-3 h-3 text-blue-500 ml-1" />
            </p>
            <p className="text-xs text-gray-600">{job}</p>
          </div>
        </div>
      </div>

      {/* Heart Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`w-8 h-8 bg-gradient-to-r ${currentGradient} rounded-full flex items-center justify-center text-white shadow-lg`}>
          <Heart className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      name: "Priya Sharma",
      job: "Supporter of Jonojivan Foundation",
      quote:
        "I've always believed that education is the key to change. Supporting Jonojivan Foundation allows me to contribute towards educating children who need it most. I'm so proud to see how they're helping young lives fulfill their dreams.",
    },
    {
      name: "Ankit Kapoor",
      job: "Donor & Community Leader",
      quote:
        "Donating to Jonojivan Foundation was an easy choice for me. I've seen how education transforms lives, and I'm happy to be part of this cause. It's inspiring to see children who would otherwise be left behind getting the chance to learn.",
    },
    {
      name: "Seema Khan",
      job: "Mother and Supporter",
      quote:
        "As a mother, it's close to my heart to see children getting an education. When I heard about Jonojivan Foundation, I knew I wanted to help. Every child deserves to feel empowered and have access to education.",
    },
    {
      name: "Rajesh Gupta",
      job: "Corporate Sponsor",
      quote:
        "Our company's partnership with Jonojivan Foundation has been incredibly fulfilling. Seeing the direct impact of our contributions on young lives motivates us to do more. Education truly is the foundation of progress.",
    },
    {
      name: "Dr. Meera Patel",
      job: "Education Advocate",
      quote:
        "Working alongside Jonojivan Foundation has shown me the power of community-driven change. Their approach to education is both comprehensive and compassionate, creating lasting transformation.",
    },
  ];

  const stats = [
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-blue-500 to-blue-600" },
    { icon: Users, value: "2,157", label: "Happy Supporters", color: "from-blue-600 to-blue-700" },
    { icon: Heart, value: "98%", label: "Would Recommend", color: "from-blue-700 to-blue-800" },
    { icon: TrendingUp, value: "150%", label: "Growth This Year", color: "from-blue-800 to-blue-900" }
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 transform transition-all duration-1000">
          <p className="text-blue-600 font-medium text-lg mb-4 tracking-wide">
            Community Voices, Real Impact
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Voices of Impact
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Hear from our amazing community of supporters who are making a real difference in the world through education, support, and empowerment.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              index={index}
              name={testimonial.name}
              job={testimonial.job}
              quote={testimonial.quote}
              isActive={activeTestimonial === index}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md border border-blue-200 group hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href={"/Testimonials"}>
          <div className="transform transition-all duration-300 hover:scale-105">
            <button className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto border-2 border-transparent hover:border-blue-300">
              <Eye className="w-5 h-5" />
              <span>VIEW ALL 2,157 REVIEWS</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          </Link>
          
          <p className="text-gray-600 mt-4 text-sm">
            Read more inspiring stories from our community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;