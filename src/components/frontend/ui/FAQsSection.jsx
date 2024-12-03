"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import CompositeImage from "../../../../public/frontend/Banner/Group_910.webp";
import Image from "next/image";
import { motion } from "framer-motion";

const FAQsSection = () => {
  // State to manage the open/close state of each FAQ
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
    <div className="bg-[#FEF7EC] py-10 px-6 md:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* FAQ Section */}
        <div className="w-full md:w-1/2 text-left mt-8 md:mt-0 md:pr-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <Image
            src={CompositeImage}
            alt="Composite of multiple images"
            className="rounded-lg object-cover mx-auto"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQsSection;
