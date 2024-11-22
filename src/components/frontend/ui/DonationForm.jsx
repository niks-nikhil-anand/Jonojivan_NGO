"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";


const DonationForm = () => {
  const [amount, setAmount] = useState(""); // State to store selected amount
  const [isCustom, setIsCustom] = useState(false); // State to track if custom amount is selected
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [paymentMethod, setPaymentMethod] = useState("Online"); // State for payment method selection

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

  // Handle modal open/close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="w-full bg-[#DEB841] p-8 rounded-b-2xl shadow-2xl text-black mb-8 mx-auto max-w-7xl transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">
            MAKE A DONATION
          </h3>
          <p className="text-sm sm:text-base mb-6 sm:mb-8 text-center text-gray-800">
            Your donation helps us make a real difference in the lives of many.
            Every contribution counts.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {["1000", "2500", "5000", "1000", "2500"].map((amountValue) => (
              <button
                key={amountValue}
                className="px-2 py-4 bg-white border border-gray-300 rounded-lg font-semibold text-lg sm:text-xl transition duration-300 transform hover:bg-gray-200 hover:scale-105 shadow-md sm:w-auto"
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
          <span className="bg-blue-800 text-white px-5 py-4 text-lg">₹</span>
            <input
              type="number"
              className="px-6 py-4 flex-grow focus:outline-none text-lg "
              placeholder="Enter amount"
              value={isCustom ? amount : amount === "" ? "" : amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!isCustom && amount !== ""} // Disable input unless custom amount is selected
            />
            <button
              onClick={openModal}
              className="px-8 py-4 bg-black text-white font-semibold text-lg sm:text-xl hover:bg-gray-800 transition duration-300 rounded-r-lg shadow-md w-full sm:w-auto"
            >
              DONATE NOW
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal for donation details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
          <button
            className="absolute top-4 right-2 bg-gray-200  text-gray-500 hover:bg-gray-300 hover:text-gray-800 rounded-full p-3 shadow-md"
            onClick={closeModal}
          >
            <FaTimes className="w-5 h-5 " />
          </button>

            <h2 className="text-xl font-bold mb-4">Donation Details</h2>

            {/* Payment Method Radio Buttons */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Select Payment Method:
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Online
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Offline"
                    checked={paymentMethod === "Offline"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Offline
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="TestDonation"
                    checked={paymentMethod === "TestDonation"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Test Donation
                </label>
              </div>
            </div>

            {/* Donation Form */}
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter full name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter email address"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  PAN Card Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter PAN card number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter phone number"
                />
              </div>
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
