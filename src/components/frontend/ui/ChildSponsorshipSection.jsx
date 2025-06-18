"use client"
import React from 'react';
import banner from '../../../../public/frontend/Banners/OrganizationInfo.jpg';
import Image from 'next/image';
import SponsorshipForm from './SponsorshipForm';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpenCheck, 
  Heart, 
  Shirt, 
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react";

const ChildSponsorshipSection = () => {
  const [sharpenedImage, setSharpenedImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Fetch the sharpened image URL from the API
    fetch("/api/sharpen-image")
      .then((response) => response.json())
      .then((data) => {
        if (data.images && data.images[1]) {
          let imageUrl = data.images[1];
          
          // Replace backslashes with forward slashes and fix extension if necessary
          imageUrl = imageUrl.replace(/\\/g, "/").replace(/\.jp$/, ".jpg");
          
          console.log("Normalized Image URL:", imageUrl);
          setSharpenedImage(imageUrl);
        }
      })
      .catch((error) => console.error("Error fetching sharpened image:", error));
  }, []);

  const sponsorshipBenefits = [
    {
      title: "Tuition Fees",
      description: "Complete educational support",
      icon: <BookOpenCheck className="w-6 h-6" />,
      color: "from-blue-500 to-sky-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Books and Learning Materials",
      description: "Essential learning resources",
      icon: <BookOpenCheck className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Uniforms and School Supplies",
      description: "Proper school preparation",
      icon: <Shirt className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50"
    },
    {
      title: "Health and Well-being Support",
      description: "Comprehensive care",
      icon: <Shield className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <SponsorshipForm setIsModalOpen={setIsModalOpen} />
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Content Section */}
          <motion.div 
            className="flex flex-col justify-center items-start w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Badge */}
            <motion.div 
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6"
              variants={cardVariants}
            >
              <Sparkles className="w-4 h-4 text-white mr-2" />
              <span className="text-white font-semibold text-sm uppercase tracking-wide">
                Gift a Smile
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 leading-tight"
              variants={cardVariants}
            >
              What is the Child Sponsorship Program of Plan to Empower Foundation?
            </motion.h2>

            {/* Description */}
            <motion.div 
              className="space-y-4 mb-8"
              variants={cardVariants}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                Every child deserves the chance to learn, grow, and dream—yet millions, especially in underserved communities, face barriers to education. At Bring Smile, we are committed to breaking these barriers by providing children with access to quality education and the tools they need to succeed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By sponsoring a child, you don&apos;t just provide education—you open the door to a brighter future.
              </p>
            </motion.div>

            {/* Why Sponsor Section */}
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6"
              variants={cardVariants}
            >
              Why Sponsor a Child?
            </motion.h3>

            {/* Benefits Grid */}
            <motion.div 
              className="grid md:grid-cols-2 gap-4 mb-8 w-full"
              variants={containerVariants}
            >
              {sponsorshipBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  className={`${benefit.bgColor} rounded-2xl p-4 border border-opacity-20 hover:border-opacity-40 transition-all duration-300 group`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${benefit.color} rounded-xl text-white shadow-lg`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="flex justify-center lg:justify-start"
              variants={cardVariants}
            >
              <motion.button 
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 group"
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
                <span>Sponsor a Child Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Floating Quote Card */}
            <motion.div 
              className="absolute bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white bottom-[-2rem] left-[-2rem] z-10 rounded-2xl shadow-2xl max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">Inspiration</span>
              </div>
              <p className="text-lg font-bold leading-tight">
                Be the Spark That Ignites a Future.
              </p>
            </motion.div>

            {/* Main Image */}
            <motion.div 
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
              <Image 
                src={sharpenedImage || banner}
                alt="Child Sponsorship Program" 
                className="w-full h-full object-cover" 
                layout="responsive" 
                width={1200} 
                height={800} 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChildSponsorshipSection;