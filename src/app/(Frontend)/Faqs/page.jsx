// FaqsPage.jsx
import React, { useState } from "react";

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 mb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
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
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqsPage;
