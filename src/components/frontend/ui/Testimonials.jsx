"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Users, Quote, ArrowRight, MessageCircle, Sparkles, TrendingUp, Award, CheckCircle, Eye } from 'lucide-react';
import Link from 'next/link';

const TestimonialCard = ({ avatar, name, job, quote, index, isActive, onClick }) => {
  const gradients = [
    "from-green-500 via-emerald-500 to-green-600",
    "from-emerald-500 via-green-500 to-teal-500",
    "from-green-600 via-emerald-600 to-green-500",
    "from-teal-500 via-emerald-500 to-green-500",
    "from-emerald-600 via-green-600 to-emerald-500"
  ];
  
  const bgColors = [
    "bg-gradient-to-br from-green-50 to-emerald-100",
    "bg-gradient-to-br from-emerald-50 to-green-100", 
    "bg-gradient-to-br from-green-50 to-teal-100",
    "bg-gradient-to-br from-teal-50 to-emerald-100",
    "bg-gradient-to-br from-emerald-50 to-green-100"
  ];
  
  const borderColors = [
    "border-green-200",
    "border-emerald-200",
    "border-green-200",
    "border-teal-200",
    "border-emerald-200"
  ];

  const currentGradient = gradients[index % gradients.length];
  const currentBg = bgColors[index % bgColors.length];
  const currentBorder = borderColors[index % borderColors.length];

  return (
    <motion.div 
      className={`${currentBg} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${currentBorder} border group relative overflow-hidden cursor-pointer`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Quote Icon */}
      <motion.div 
        className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${currentGradient} rounded-xl mb-4 text-white shadow-lg relative`}
        whileHover={{ scale: 1.05 }}
      >
        <Quote className="w-6 h-6" />
      </motion.div>

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, starIndex) => (
            <motion.div
              key={starIndex}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: index * 0.1 + starIndex * 0.05,
                type: "spring",
                bounce: 0.4
              }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </motion.div>
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
              <CheckCircle className="w-3 h-3 text-green-500 ml-1" />
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
    </motion.div>
  );
};

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

 const testimonials = [
  {
    name: "Priya Sharma",
    job: "Supporter of Plan to Empower - NGO",
    quote:
      "I've always believed that education is the key to change. Supporting Plan to Empower allows me to contribute towards educating girls who need it most. I'm so proud to see how they're helping young girls fulfill their dreams.",
  },
  {
    name: "Ankit Kapoor",
    job: "Donor & Community Leader",
    quote:
      "Donating to Plan to Empower was an easy choice for me. I've seen how education transforms lives, and I'm happy to be part of this cause. It's inspiring to see girls who would otherwise be left behind getting the chance to learn.",
  },
  {
    name: "Seema Khan",
    job: "Mother and Supporter",
    quote:
      "As a mother, it's close to my heart to see girls getting an education. When I heard about Plan to Empower, I knew I wanted to help. Every girl deserves to feel empowered and have access to education.",
  },
  {
    name: "Rajesh Gupta",
    job: "Corporate Sponsor",
    quote:
      "Our company's partnership with Plan to Empower has been incredibly fulfilling. Seeing the direct impact of our contributions on young lives motivates us to do more. Education truly is the foundation of progress.",
  },
  {
    name: "Dr. Meera Patel",
    job: "Education Advocate",
    quote:
      "Working alongside Plan to Empower has shown me the power of community-driven change. Their approach to girls' education is both comprehensive and compassionate, creating lasting transformation.",
  },
];


  const stats = [
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-green-500 to-emerald-500" },
    { icon: Users, value: "2,157", label: "Happy Supporters", color: "from-emerald-500 to-green-500" },
    { icon: Heart, value: "98%", label: "Would Recommend", color: "from-green-600 to-emerald-600" },
    { icon: TrendingUp, value: "150%", label: "Growth This Year", color: "from-emerald-600 to-green-600" }
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - matching programs section style */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-600 font-medium text-lg mb-4 tracking-wide">
            Community Voices, Real Impact
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Voices of Impact
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Hear from our amazing community of supporters who are making a real difference in the world through education, support, and empowerment.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visibleStats ? 1 : 0, y: visibleStats ? 0 : 30 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-md border border-green-200 group hover:shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
            >
              <motion.div 
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-4 shadow-lg`}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action - matching programs section style */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={"/Testimonials"}>
            <button className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-green-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto border-2 border-transparent hover:border-emerald-300">
              <Eye className="w-5 h-5" />
              <span>VIEW ALL 2,157 REVIEWS</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            </Link>
          </motion.div>
          
          <p className="text-gray-600 mt-4 text-sm">
            Read more inspiring stories from our community
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;