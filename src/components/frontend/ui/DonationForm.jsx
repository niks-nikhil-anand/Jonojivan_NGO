"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");

  // Handle predefined amount selection
  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setIsCustom(false);
  };

  // Handle custom amount selection
  const handleCustomAmountSelect = () => {
    setAmount("");
    setIsCustom(true);
  };

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="w-full bg-[#DEB841] p-8 rounded-b-2xl shadow-2xl text-black mb-8 mx-auto max-w-7xl z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            MAKE A DONATION
          </h3>
          <p className="text-sm sm:text-base mb-6 text-gray-800">
            Your donation helps us make a real difference in the lives of many.
            Every contribution counts.
          </p>
                <div className="flex flex-wrap gap-4 justify-center mb-8">
        {["500", "1000", "2500", "5000"].map((amountValue) => (
          <button
            key={amountValue}
            className={`px-6 py-3 border border-gray-300 rounded-lg font-semibold text-lg sm:text-xl transition duration-300 shadow-md ${
              amount === amountValue
                ? "bg-blue-600 text-white" // Active button styling
                : "bg-white text-black hover:bg-gray-200 hover:scale-105"
            }`}
            onClick={() => handleAmountSelect(amountValue)}
          >
            ₹{amountValue}
          </button>
        ))}
        <button
          className={`px-6 py-3 border border-gray-300 rounded-lg font-semibold text-lg sm:text-xl transition duration-300 shadow-md ${
            isCustom
              ? "bg-blue-600 text-white" // Active button styling for custom amount
              : "bg-white text-black hover:bg-gray-200 hover:scale-105"
          }`}
          onClick={handleCustomAmountSelect}
        >
          Custom Amount
        </button>
                </div>

          {isCustom && (
            <div className="flex justify-center mb-6">
              <span className="bg-blue-800 text-white px-5 py-3 rounded-l-lg">
                ₹
              </span>
              <input
                type="number"
                className="px-6 py-3 border border-gray-300 rounded-r-lg w-full md:w-1/2 focus:outline-none"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          )}
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg sm:text-xl rounded-lg shadow-lg hover:shadow-xl focus:outline-none"
          >
            DONATE NOW
          </motion.button>
        </div>
      </motion.div>

      {/* Modal for donation details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-4 right-4 bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-800 rounded-full p-2 shadow-md"
              onClick={closeModal}
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Donation Details</h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Select Payment Method:
              </p>
              <div className="flex gap-4">
                {["Online", "Offline", "TestDonation"].map((method) => (
                  <label key={method} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>
            <form>
              {["Full Name", "Email Address", "PAN Card Number", "Phone Number"].map(
                (label, index) => (
                  <div className="mb-4" key={index}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type={label === "Email Address" ? "email" : "text"}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                )
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="text"
                  value={`₹${amount}`}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#DEB841] text-white rounded-lg"
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationForm;
