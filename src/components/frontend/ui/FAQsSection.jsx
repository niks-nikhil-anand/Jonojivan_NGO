"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus, HelpCircle, ArrowRight, MessageCircleQuestion, Users, Heart } from "lucide-react";

const FAQsSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ open/close state
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data array
  const faqData = [
    {
      question: "What is Bring Smile?",
      answer:
        "Bring Smile is a non-profit organization dedicated to improving the lives of children, women, and communities through education, skill development, and empowerment. We focus on creating lasting change by providing access to education and equal opportunities for all.",
      category: "General"
    },
    {
      question: "How can I donate to Bring Smile?",
      answer:
        "You can easily donate through our website's Donate Now page. Simply choose your donation amount and proceed with a secure online payment using your preferred method.",
      category: "Donation"
    },
    {
      question: "What programs does Bring Smile support?",
      answer:
        "Bring Smile supports various programs, including: Girl Child Education, Skill Development for Women, Tuition Classes for Quality Education, School Building Projects, and Women Empowerment & Gender Equality initiatives.",
      category: "Programs"
    },
    {
      question: "How does my donation help?",
      answer:
        "Your donation directly supports our programs, providing education, skill development, mentorship, and the creation of infrastructure, ultimately improving the lives of children and women in underserved communities.",
      category: "Impact"
    },
    {
      question: "How much does it cost to sponsor a child?",
      answer:
        "Sponsoring a child costs ₹26,000 per year, which covers their school fees, books, uniforms, and other essential resources for a full year of education.",
      category: "Sponsorship"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
            <MessageCircleQuestion className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about contributing or supporting our mission? Explore the answers to our most commonly asked questions below.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={faqVariants}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group overflow-hidden"
            >
              {/* FAQ Question Button */}
              <button
                className="w-full p-8 text-left flex items-center justify-between group-hover:bg-gradient-to-r group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {faq.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    {openFAQ === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </motion.div>
                </div>
              </button>

              {/* FAQ Answer */}
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <div className="pl-12">
                        <div className="h-px bg-gradient-to-r from-indigo-200 to-purple-200 mb-6"></div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4">
              <MessageCircleQuestion className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600 text-sm">FAQs Available</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600 text-sm">Support Available</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
            <p className="text-gray-600 text-sm">Questions Answered</p>
          </div>
        </motion.div>

        {/* View All FAQs Button */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/Faqs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 mx-auto group"
            >
              <MessageCircleQuestion className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>View All FAQs</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
          
          <p className="text-gray-600 mt-4 text-sm">
            Find answers to more questions about our mission and impact
          </p>
        </motion.div>

       
      </div>
    </div>
  );
};

export default FAQsSection;