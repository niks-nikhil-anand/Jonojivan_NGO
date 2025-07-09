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
        className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl p-12 text-center text-white shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            Your contribution can transform lives and build stronger
            communities. Join Jonojivan Foundation in creating lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleDonateClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Donate Now</span>
            </motion.button>
            <Link href={"/volunteer"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
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
