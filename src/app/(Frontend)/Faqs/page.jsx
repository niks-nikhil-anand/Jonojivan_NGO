"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa"

const faqs = [
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
  {
    question: "Can I sponsor a specific child?",
    answer:
      "While we do not currently offer specific child selection, your donation goes directly to support the most deserving children in need, and we provide regular updates on their progress.",
  },
  {
    question: "Can I donate for a specific program?",
    answer:
      "Yes, you can choose to donate to any of our programs such as Girl Child Education, Skill Development for Women, or School Building Projects. Your donation will go directly toward the program you select.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes, Bring Smile is a registered non-profit, and all donations are eligible for tax deductions under Section 80G of the Income Tax Act of 1961.",
  },
  {
    question: "How can I stay updated on Bring Smile's progress?",
    answer:
      "Once you donate, we will send regular updates through emails, newsletters, and social media. You can also follow us on social media for real-time information about our programs and the impact of your donation.",
  },
  {
    question: "Can I donate in memory or honor of someone?",
    answer:
      "Yes, you can make a donation in memory or honor of someone special. We will send a personalized acknowledgment for your gesture, and your contribution will help create a lasting legacy.",
  },
  {
    question: "What is the minimum amount I can donate?",
    answer:
      "There is no minimum donation amount. Every contribution, no matter how big or small, makes a significant impact and helps us reach more children and women in need.",
  },
  {
    question: "Can I donate through a bank transfer?",
    answer:
      "Yes, we accept donations via bank transfer. Please visit our Donation Page for bank details or contact us for more information on how to make a transfer.",
  },
  {
    question: "How does my donation help women’s empowerment?",
    answer:
      "Your donation to the Skill Development for Women program provides women with vocational training, entrepreneurial support, and mentorship, empowering them to become financially independent and socially active members of their communities.",
  },
  {
    question: "How can I volunteer with Bring Smile?",
    answer:
      "We are always looking for passionate volunteers. You can apply to volunteer on our Volunteer Page, where you can choose opportunities that match your skills and interests.",
  },
  {
    question: "Can I organize a fundraising event for Bring Smile?",
    answer:
      "Absolutely! We encourage individuals and organizations to host fundraising events to support our mission. Contact us to learn how we can assist in organizing and promoting your event.",
  },
  {
    question: "What is the impact of the School Building Project?",
    answer:
      "Your donation to the School Building Project helps construct safe, well-equipped classrooms, providing a nurturing environment where children can learn, grow, and dream without limitations.",
  },
  {
    question: "How can I share Bring Smile’s mission with others?",
    answer:
      "You can help spread the word by sharing our website, social media posts, and newsletters with your network. Every person you inspire to get involved makes a difference!",
  },
  {
    question: "How can I make a monthly donation?",
    answer:
      "You can set up a monthly donation on our Donate Now page by choosing the “Monthly Donation” option. This ensures your ongoing support in creating lasting change for children and women.",
  },
  {
    question: "Can I donate materials or resources instead of money?",
    answer:
      "Yes, in some cases, we accept donations of educational materials, school supplies, and other resources. Please contact us to discuss the items you wish to donate.",
  },
  {
    question: "What is the best way to contact Bring Smile for additional information?",
    answer:
      "You can contact us via email at email@bringsmile.org or call us at [phone number]. We are happy to answer any questions and discuss how you can further support our mission.",
  },
];

const FaqsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (

    <div className="flex flex-col px-6 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-center mt-10 mb-8">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border-b border-gray-300 pb-6 mb-4 cursor-pointer px-4 md:px-8"
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
                className="mt-4 text-gray-600"
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
      <hr className="my-8 border-gray-400" />
      <div className="flex flex-col items-center space-y-4">
        <FaQuestionCircle className="text-gray-500 text-4xl" />
        <p className="font-bold text-center text-gray-700 px-6 md:px-16">
          If you still have questions or need assistance, feel free to reach out.
          Together, we can create a brighter future for children and women in need.
        </p>
      </div>
    </div>
    
  
  );
};

export default FaqsPage;
