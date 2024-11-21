"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DonationForm = () => {
  const [amount, setAmount] = useState("");  // State to store selected amount
  const [isCustom, setIsCustom] = useState(false); // State to track if custom amount is selected

  // Handle predefined amount selection
  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setIsCustom(false); // Disable custom amount when a predefined amount is selected
  };

  // Handle custom amount selection
  const handleCustomAmountSelect = () => {
    setAmount(""); // Clear input when custom amount is selected
    setIsCustom(true); // Enable custom amount input
  };

  return (
    <motion.div
      className="w-full  bg-[#DEB841] p-8 rounded-b-2xl shadow-2xl text-black mb-8 mx-auto max-w-7xl  transform -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">
          MAKE A DONATION
        </h3>
        <p className="text-sm sm:text-base mb-6 sm:mb-8 text-center text-gray-800">
          Your donation helps us make a real difference in the lives of many. Every contribution counts.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {["1000", "2500", "5000", "1000", "2500"].map((amountValue) => (
            <button
              key={amountValue}
              className="px-2 py-4 bg-white border border-gray-300 rounded-lg font-semibold text-lg sm:text-xl transition duration-300 transform hover:bg-gray-200 hover:scale-105 shadow-md  sm:w-auto"
              onClick={() => handleAmountSelect(amountValue)}
            >
               ₹{amountValue}
            </button>
          ))}
          <button
            className="px-8 py-4 bg-white border border-gray-300 rounded-lg font-semibold text-lg sm:text-xl transition duration-300 transform hover:bg-gray-200 hover:scale-105 shadow-md w-full sm:w-auto"
            onClick={handleCustomAmountSelect}
          >
            Custom Amount
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center border border-gray-300 rounded-lg overflow-hidden mb-8 shadow-lg">
          <input
            type="number"
            className="px-6 py-4 flex-grow focus:outline-none text-lg rounded-l-lg"
            placeholder="Enter amount"
            value={isCustom ? amount : amount === "" ? "" : amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={!isCustom && amount !== ""} // Disable input unless custom amount is selected
          />
          <button className="px-8 py-4 bg-black text-white font-semibold text-lg sm:text-xl hover:bg-gray-800 transition duration-300 rounded-r-lg shadow-md w-full sm:w-auto">
            DONATE NOW
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DonationForm;
