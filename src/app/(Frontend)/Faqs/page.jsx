"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";


const faqs = [
  {
    question: "What products does JonoJivan Grocery offer?",
    answer:
      "We offer a wide range of products including fresh fruits, vegetables, and essential household items. Our selection is curated to meet your daily needs with quality and freshness in mind.",
  },
  {
    question: "How can I place an order?",
    answer:
      "To place an order, browse our products, add items to your cart, and proceed to checkout. You’ll need to create an account or log in to complete your order.",
  },
  {
    question: "What are the delivery options available?",
    answer:
      "We offer flexible delivery options including same-day delivery and scheduled delivery slots to fit your convenience. Delivery slots can be selected during the checkout process.",
  },
  {
    question: "Is there a minimum order value for free delivery?",
    answer:
      "Yes, we offer free delivery on orders above $50. For orders below this amount, a small delivery fee will apply.",
  },
  {
    question: "Can I return or exchange items?",
    answer:
      "Yes, we have a return policy for certain items. Perishable items like fresh fruits and vegetables are not eligible for returns, but we will address any quality concerns. Household items can be returned within 7 days of purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including credit/debit cards, net banking, and digital wallets. Cash on delivery (COD) is also available for certain locations.",
  },
];

const FaqsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full bg-green-600 h-[60vh] flex justify-center items-center relative">
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <motion.div
            className="mx-auto max-w-max rounded-full border-2 border-white bg-gray-50 p-2 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              We&apos;d love to hear your thoughts
            </p>
          </motion.div>
          <motion.p
            className="text-center text-3xl font-bold text-white md:text-5xl md:leading-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            We Value Your Feedback
          </motion.p>
          <p className="mx-auto max-w-4xl text-center text-base text-gray-200 md:text-xl">
            Your opinions and experiences matter to us. Please feel free to share your thoughts, and let&apos;s make things better together.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <h1 className="text-3xl font-bold text-center mt-10 mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border-b border-gray-200 pb-4 mb-4 cursor-pointer px-10"
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h2 className="text-lg font-semibold flex justify-between items-center">
              {faq.question}
              <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </h2>
            {activeIndex === index && (
              <motion.p
                className="mt-2 text-gray-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};


export default FaqsPage;
