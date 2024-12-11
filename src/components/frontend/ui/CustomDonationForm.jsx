"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CustomDonationForm = ({ setIsModalOpen }) => {
    const [paymentMethod, setPaymentMethod] = useState("Online"); // Default payment method
    const [amount] = useState(1000); // Default donation amount
  
    const closeModal = () => {
      setIsModalOpen(false); // Close the modal
    };
  
    return (
      <div>
        {/* Modal for donation details */}
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-4 right-2 bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-800 rounded-full p-3 shadow-md"
              onClick={closeModal}
            >
              <FaTimes className="w-5 h-5" />
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
                  onClick={closeModal} // Close the modal
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#DEB841] text-white rounded-lg"
                >
                  Donate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomDonationForm;
  
