"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CustomDonationForm from "./CustomDonationForm";
import { Heart, Users } from "lucide-react";

const CallToAction = () => {
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsDonationFormOpen(true);
  };

  return (
   <div>
      {/* Call to Action Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center text-white shadow-2xl mx-4 sm:mx-6 lg:mx-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Ready to Make a Difference?
          </h3>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
            Your contribution can transform lives and build stronger
            communities. Join Jonojivan Foundation in creating lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-lg sm:max-w-none mx-auto">
            <motion.button
              onClick={handleDonateClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 min-w-[160px] text-sm sm:text-base"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Donate Now</span>
            </motion.button>
            <Link href={"/volunteer"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 min-w-[160px] text-sm sm:text-base"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Volunteer</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
      {/* Custom Donation Form Modal/Dialog */}
      {isDonationFormOpen && (
        <CustomDonationForm
          isOpen={isDonationFormOpen}
          setIsModalOpen={setIsDonationFormOpen}
        />
      )}
    </div>
  );
};

export default CallToAction;
