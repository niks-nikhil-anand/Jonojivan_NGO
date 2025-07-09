"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import CustomDonationForm from "./CustomDonationForm";

const FooterBanner = () => {
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsDonationFormOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-6 md:py-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg md:text-2xl font-bold text-center md:text-left mb-4 md:mb-0"
      >
        Your Donation Can Transform Lives & Shapes Future.
      </motion.div>
      <button
        className="group bg-white text-blue-600 hover:bg-blue-50 border-2 border-white hover:border-blue-200 px-8 py-4 md:px-10 md:py-5 font-bold text-lg uppercase rounded-full transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        onClick={handleDonateClick}
      >
        <Heart className="w-5 h-5 group-hover:text-blue-700 transition-colors" />
        <span className="group-hover:text-blue-700 transition-colors">
          Donate Now
        </span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
      {isDonationFormOpen && (
        <CustomDonationForm
          isOpen={isDonationFormOpen}
          setIsModalOpen={setIsDonationFormOpen}
        />
      )}
    </div>
  );
};

export default FooterBanner;
