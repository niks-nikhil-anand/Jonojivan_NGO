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
      question: "What is the impact of my donation?",
      answer:
        "Your donation helps provide education, healthcare, and protection for marginalized children in India.",
    },
    {
      question: "How can I contribute?",
      answer:
        "You can contribute online via our donation portal or by contacting our team for offline donation methods.",
    },
    {
      question: "Can I choose which project my donation supports?",
      answer:
        "Yes, you can specify the project you would like to support, and we will ensure your donation is allocated accordingly.",
    },
    {
      question: "Are my donations tax-deductible?",
      answer:
        "Yes, your donations are tax-deductible under section 80G of the Income Tax Act in India.",
    },
    {
      question: "How do I receive confirmation of my donation?",
      answer:
        "After donating, you will receive an email confirmation and receipt for your records.",
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
    </div>
  );
};

export default FAQsSection;
