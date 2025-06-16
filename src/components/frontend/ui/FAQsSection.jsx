"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus, HelpCircle, ArrowRight, MessageCircleQuestion, Users, Heart } from "lucide-react";

const FAQsSection = () => {
  // Set first FAQ as open by default to match the image
  const [openFAQ, setOpenFAQ] = useState(0);

  // Toggle FAQ open/close state
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data array - updated to match the image content
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

  return (
    <div className=" bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Content Section */}
          <motion.div 
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="mb-8">
              <p className="text-emerald-600 font-medium text-lg mb-4 tracking-wide">
                Recently asked questions
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                People are frequently asking some questions from us
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Proactively procrastinate cross-platform results via extensive ideas distinctively underwhelm enterprise. Compellingly plagiarize value-added sources with inexpensive schemas.
              </p>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/help">
                <button className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 hover:from-green-700 hover:via-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3">
                  <span>LEARN HOW TO GET HELP</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right FAQ Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* FAQ Question Button */}
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md"
                    >
                      {openFAQ === index ? (
                        <Minus className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-white" />
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
                      <div className="px-6 pb-6">
                        <div className="h-px bg-gray-200 mb-4"></div>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQsSection;