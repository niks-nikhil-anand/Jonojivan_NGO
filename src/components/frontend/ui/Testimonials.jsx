"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, Users, Quote, ArrowRight, MessageCircle } from 'lucide-react';
import logo from "../../../../public/logo/Smile.png";

const TestimonialCard = ({ avatar, name, job, quote, index }) => {
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500"
  ];
  
  const bgColors = [
    "bg-pink-50",
    "bg-purple-50", 
    "bg-blue-50"
  ];
  
  const borderColors = [
    "border-pink-200",
    "border-purple-200",
    "border-blue-200"
  ];

  const currentGradient = gradients[index % gradients.length];
  const currentBg = bgColors[index % bgColors.length];
  const currentBorder = borderColors[index % borderColors.length];

  return (
    <motion.div 
      className={`${currentBg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${currentBorder} border-2 group relative overflow-hidden`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Quote Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${currentGradient} rounded-2xl mb-6 text-white shadow-lg`}>
        <Quote className="w-6 h-6" />
      </div>

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center mb-6">
          {[...Array(5)].map((_, starIndex) => (
            <Star
              key={starIndex}
              className="w-5 h-5 text-yellow-400 fill-current"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mb-8">
          <p className="text-lg leading-relaxed text-gray-700 font-medium">
            "{quote}"
          </p>
        </blockquote>

        {/* User Info */}
        <div className="flex items-center">
          <div className="flex-shrink-0 relative w-12 h-12">
            <Image
              className="rounded-full object-cover border-2 border-white shadow-md"
              src={logo}
              alt={name}
              fill
            />
          </div>
          <div className="ml-4">
            <p className="text-lg font-bold text-gray-900">{name}</p>
            <p className="text-sm text-gray-600 font-medium">{job}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      job: "Supporter of Bring Smile",
      quote: "I've always believed that education is the key to change. Supporting Bring Smile allows me to contribute towards educating girls who need it most. I'm so proud to see how they're helping young girls fulfill their dreams."
    },
    {
      name: "Ankit Kapoor", 
      job: "Donor",
      quote: "Donating to Bring Smile was an easy choice for me. I've seen how education transforms lives, and I'm happy to be part of this cause. It's inspiring to see girls who would otherwise be left behind, getting the chance to learn."
    },
    {
      name: "Seema Khan",
      job: "Mother and Supporter", 
      quote: "As a mother, it's close to my heart to see girls getting an education. When I heard about Bring Smile, I knew I wanted to help. Every girl deserves to feel empowered and have access to education."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          
          <div className="mb-6">
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200 mb-4">
              <Users className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-lg font-semibold text-gray-700">
                2,157 people have shared their experience
              </span>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Voices of Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our amazing community of supporters who are making a real difference in the world
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              index={index}
              name={testimonial.name}
              job={testimonial.job}
              quote={testimonial.quote}
              avatar={logo}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">2,157</h3>
            <p className="text-gray-600">Happy Supporters</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
            <p className="text-gray-600">Would Recommend</p>
          </div>
        </motion.div>

        {/* View All Reviews Button */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/Testimonials">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 mx-auto group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>View All 2,157 Reviews</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
          
          <p className="text-gray-600 mt-4 text-sm">
            Read more inspiring stories from our community
          </p>
        </motion.div>

      
      </div>
    </div>
  );
};

export default Testimonials;