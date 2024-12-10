"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { motion } from "framer-motion";

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
    },
    {
      question: "How can I donate to Bring Smile?",
      answer:
        "You can easily donate through our website’s Donate Now page. Simply choose your donation amount and proceed with a secure online payment using your preferred method.",
    },
    {
      question: "What programs does Bring Smile support?",
      answer:
        "Bring Smile supports various programs, including:\n• Girl Child Education\n• Skill Development for Women\n• Tuition Classes for Quality Education\n• School Building Projects\n• Women Empowerment & Gender Equality",
    },
    {
      question: "How does my donation help?",
      answer:
        "Your donation directly supports our programs, providing education, skill development, mentorship, and the creation of infrastructure, ultimately improving the lives of children and women in underserved communities.",
    },
    {
      question: "How much does it cost to sponsor a child?",
      answer:
        "Sponsoring a child costs ₹26,000 per year, which covers their school fees, books, uniforms, and other essential resources for a full year of education.",
    },
  ];

  return (
    <div className="bg-[#FEF7EC] py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mb-8">
          Have questions about contributing or supporting our mission? Explore
          the answers to our most commonly asked questions below.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            {/* FAQ Question */}
            <button
              className="w-full text-left font-semibold text-lg flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-base sm:text-lg">{faq.question}</span>
              {openFAQ === index ? (
                <AiOutlineMinus size={20} />
              ) : (
                <AiOutlinePlus size={20} />
              )}
            </button>
            {/* FAQ Answer */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openFAQ === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-8 text-center md:mt-16 md:order-3">
            <a
              href="#"
              title=""
              className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
            >
              Read all 2,157 FAQs
            </a>
          </div>
    </div>
  );
};

export default FAQsSection;
