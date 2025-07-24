"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Minus,
} from "lucide-react";

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
    question: "What is JonoJivan Gramin Vikash Foundation - NGO?",
    answer:
      "JonoJivan Gramin Vikash Foundation is a non-profit organization committed to transforming lives through education, skill development, and community empowerment. We focus on creating sustainable change by providing equal opportunities and access to resources for children, women, and underprivileged communities.",
    category: "General",
  },
  {
    question: "How can I donate to JonoJivan Gramin Vikash Foundation?",
    answer:
      "You can easily donate through our website's Donate Now page. Simply select your preferred donation amount and complete the secure online payment using your chosen method.",
    category: "Donation",
  },
  {
    question: "What programs does JonoJivan Gramin Vikash Foundation support?",
    answer:
      "JonoJivan Gramin Vikash Foundation supports a wide range of initiatives, including: Girl Child Education, Women's Skill Development, Quality Tuition Programs, School Infrastructure Projects, and campaigns for Gender Equality and Women Empowerment.",
    category: "Programs",
  },
  {
    question: "How does my donation help?",
    answer:
      "Your donation directly fuels our programs by providing education, vocational training, mentorship, and critical infrastructure to uplift children and women in underserved areas.",
    category: "Impact",
  },
  {
    question: "How much does it cost to sponsor a child?",
    answer:
      "Sponsoring a child through JonoJivan Gramin Vikash Foundation costs ₹26,000 per year, covering school fees, uniforms, books, and all essential resources for one full academic year.",
    category: "Sponsorship",
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
              <p className="text-blue-600 font-medium text-lg mb-4 tracking-wide">
                Recently asked questions
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                People are frequently asking some questions from us
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Proactively procrastinate cross-platform results via extensive
                ideas distinctively underwhelm enterprise. Compellingly
                plagiarize value-added sources with inexpensive schemas.
              </p>
            </div>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/Faqs">
                <button className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3">
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
                      className="w-8 h-8 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md"
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