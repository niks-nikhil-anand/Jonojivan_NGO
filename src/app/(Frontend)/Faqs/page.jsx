"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MessageCircleQuestion, Heart, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What is Plan to Empower - NGO?",
    answer:
      "Plan to Empower is a non-profit organization dedicated to improving the lives of children, women, and communities through education, skill development, and empowerment. We focus on creating lasting change by providing access to education and equal opportunities for all.",
    category: "General",
  },
  {
    question: "How can I donate to Plan to Empower?",
    answer:
      "You can easily donate through our website's Donate Now page. Simply choose your donation amount and proceed with a secure online payment using your preferred method.",
    category: "Donation",
  },
  {
    question: "What programs does Plan to Empower support?",
    answer:
      "Plan to Empower supports various programs, including: Girl Child Education, Skill Development for Women, Tuition Classes for Quality Education, School Building Projects, and Women Empowerment & Gender Equality initiatives.",
    category: "Programs",
  },
  {
    question: "How does my donation help?",
    answer:
      "Your donation directly supports our programs, providing education, skill development, mentorship, and the creation of infrastructure, ultimately improving the lives of children and women in underserved communities.",
    category: "Impact",
  },
  {
    question: "How much does it cost to sponsor a child?",
    answer:
      "Sponsoring a child costs ₹26,000 per year, which covers their school fees, books, uniforms, and other essential resources for a full year of education.",
    category: "Sponsorship",
  },
  {
    question: "Can I sponsor a specific child?",
    answer:
      "While we do not currently offer specific child selection, your donation goes directly to support the most deserving children in need, and we provide regular updates on their progress.",
    category: "Sponsorship",
  },
  {
    question: "Can I donate for a specific program?",
    answer:
      "Yes, you can choose to donate to any of our programs such as Girl Child Education, Skill Development for Women, or School Building Projects. Your donation will go directly toward the program you select.",
    category: "Donation",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes, Plan to Empower is a registered non-profit, and all donations are eligible for tax deductions under Section 80G of the Income Tax Act of 1961.",
    category: "Donation",
  },
  {
    question: "How can I stay updated on Plan to Empower’s progress?",
    answer:
      "Once you donate, we will send regular updates through emails, newsletters, and social media. You can also follow us on social media for real-time information about our programs and the impact of your donation.",
    category: "General",
  },
  {
    question: "Can I donate in memory or honor of someone?",
    answer:
      "Yes, you can make a donation in memory or honor of someone special. We will send a personalized acknowledgment for your gesture, and your contribution will help create a lasting legacy.",
    category: "Donation",
  },
  {
    question: "What is the minimum amount I can donate?",
    answer:
      "There is no minimum donation amount. Every contribution, no matter how big or small, makes a significant impact and helps us reach more children and women in need.",
    category: "Donation",
  },
  {
    question: "Can I donate through a bank transfer?",
    answer:
      "Yes, we accept donations via bank transfer. Please visit our Donation Page for bank details or contact us for more information on how to make a transfer.",
    category: "Donation",
  },
  {
    question: "How does my donation help women's empowerment?",
    answer:
      "Your donation to the Skill Development for Women program provides women with vocational training, entrepreneurial support, and mentorship, empowering them to become financially independent and socially active members of their communities.",
    category: "Impact",
  },
  {
    question: "How can I volunteer with Plan to Empower?",
    answer:
      "We are always looking for passionate volunteers. You can apply to volunteer on our Volunteer Page, where you can choose opportunities that match your skills and interests.",
    category: "General",
  },
  {
    question: "Can I organize a fundraising event for Plan to Empower?",
    answer:
      "Absolutely! We encourage individuals and organizations to host fundraising events to support our mission. Contact us to learn how we can assist in organizing and promoting your event.",
    category: "General",
  },
  {
    question: "What is the impact of the School Building Project?",
    answer:
      "Your donation to the School Building Project helps construct safe, well-equipped classrooms, providing a nurturing environment where children can learn, grow, and dream without limitations.",
    category: "Impact",
  },
  {
    question: "How can I share Plan to Empower's mission with others?",
    answer:
      "You can help spread the word by sharing our website, social media posts, and newsletters with your network. Every person you inspire to get involved makes a difference!",
    category: "General",
  },
  {
    question: "How can I make a monthly donation?",
    answer:
      "You can set up a monthly donation on our Donate Now page by choosing the 'Monthly Donation' option. This ensures your ongoing support in creating lasting change for children and women.",
    category: "Donation",
  },
  {
    question: "Can I donate materials or resources instead of money?",
    answer:
      "Yes, in some cases, we accept donations of educational materials, school supplies, and other resources. Please contact us to discuss the items you wish to donate.",
    category: "Donation",
  },
  {
    question: "What is the best way to contact Plan to Empower for additional information?",
    answer:
      "You can contact us via email at contact@plantoempower.org or call us at [phone number]. We are happy to answer any questions and discuss how you can further support our mission.",
    category: "General",
  },
];


const FaqsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "General", "Donation", "Programs", "Impact", "Sponsorship"];

  const filteredFaqs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getCategoryColor = (category) => {
    const colors = {
      General: "bg-blue-100 text-blue-800 border-blue-200",
      Donation: "bg-green-100 text-green-800 border-green-200",
      Programs: "bg-purple-100 text-purple-800 border-purple-200",
      Impact: "bg-orange-100 text-orange-800 border-orange-200",
      Sponsorship: "bg-pink-100 text-pink-800 border-pink-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <MessageCircleQuestion className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Frequently Asked
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our mission, donation process, and how you can make a difference in the lives of children and women.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 text-emerald-600 mr-3" />
                Categories
              </h3>
              
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {category}
                    <span className="ml-2 text-sm opacity-75">
                      ({category === "All" ? faqs.length : faqs.filter(f => f.category === category).length})
                    </span>
                  </button>
                ))}
              </div>

              {/* Contact Card */}
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Still need help?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Contact us for personalized assistance with your questions.
                  </p>
                  <Link href={"/contactUs"}>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer">
                    Contact Support
                  </button>
                  
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedCategory === "All" ? "All Questions" : `${selectedCategory} Questions`}
              </h2>
              <p className="text-gray-600">
                Showing {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''}
              </p>
            </motion.div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* FAQ Question Button */}
                  <button
                    className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-all duration-300"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(faq.category)}`}>
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 leading-relaxed">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <motion.div
                        animate={{ rotate: activeIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-md"
                      >
                        {activeIndex === index ? (
                          <Minus className="w-5 h-5 text-white" />
                        ) : (
                          <Plus className="w-5 h-5 text-white" />
                        )}
                      </motion.div>
                    </div>
                  </button>

                  {/* FAQ Answer */}
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="h-px bg-gradient-to-r from-emerald-200 via-green-200 to-transparent mb-4"></div>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of supporters who are creating lasting change in the lives of children and women. Every contribution makes a meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default FaqsPage;