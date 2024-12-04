"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    panCard: "",
    phone: "",
  });

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

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Initialize Razorpay payment
  const initiateRazorpayPayment = async () => {
    // Check if the amount is valid
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }
  
    // Construct payload for the Razorpay API request
    const payload = {
      amount: amount * 100,  // Amount in paise
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };
  
    try {
      // Call the backend to create the Razorpay order
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // Handle non-200 status codes
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        return;
      }
  
      // Get the order details from the backend response
      const { order } = await response.json();
      const { amount, currency, order_id } = order;
  
      // Razorpay options for payment
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Your Razorpay Key ID
        amount: amount,              // Amount in paise
        currency: currency,
        name: "Donation",
        description: "Donation for the cause",
        order_id: order_id,          // Order ID received from backend
        handler: function (response) {
          // Handle successful payment
          toast.success("Donation successful! Thank you for your support.");
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: "Razorpay Donation",
        },
        theme: {
          color: "#FF0080", // Customize Razorpay theme color
        },
      };
  
      // Create Razorpay instance and open payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      // Handle network or server errors
      console.error("Error initiating Razorpay payment:", error);
      toast.error("Failed to create Razorpay order. Please try again.");
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (paymentMethod === "Online") {
      // If the payment method is online, call the Razorpay payment function
      initiateRazorpayPayment();
    } else {
      // For offline or test donations, proceed with submitting the form
      const payload = {
        ...formData,
        amount,
        paymentMethod,
      };
  
      try {
        const response = await fetch("/api/donation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          toast.success("Donation successful! Thank you for your support.");
          setFormData({ fullName: "", email: "", panCard: "", phone: "" });
          setAmount("");
          setIsModalOpen(false);
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  

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
                    ? "bg-[#FF0080] text-white" // Active button styling
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
                  ? "bg-[#FF0080] text-white" // Active button styling for custom amount
                  : "bg-white text-black hover:bg-gray-200 hover:scale-105"
              }`}
              onClick={handleCustomAmountSelect}
            >
              Custom Amount
            </button>
          </div>

          {isCustom && (
            <div className="flex justify-center mb-6">
              <span className="bg-[#FF0080] text-white px-5 py-3 rounded-l-lg">
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
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
              backgroundPosition: "right center",
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="px-10 py-4 bg-gradient-to-r from-[#FF0080] to-[#FF0080] text-white font-semibold text-lg sm:text-xl rounded-lg shadow-lg hover:shadow-xl focus:outline-none transition-all duration-300"
          >
            DONATE NOW
          </motion.button>
        </div>
      </motion.div>

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
            <form onSubmit={handleSubmit}>
              {["Full Name", "Email Address", "PAN Card Number", "Phone Number"].map(
                (label, index) => (
                  <div className="mb-4" key={index}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <input
                      type={label === "Email Address" ? "email" : "text"}
                      name={
                        label === "Full Name"
                          ? "fullName"
                          : label.toLowerCase().replace(" ", "")
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder={label}
                      value={formData[label.toLowerCase().replace(" ", "")]}
                      onChange={handleInputChange}
                    />
                  </div>
                )
              )}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                  backgroundPosition: "right center",
                }}
                whileTap={{
                  scale: 0.95,
                }}
                type="submit"
                className="w-full bg-[#FF0080] text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                {paymentMethod === "Online" ? "Proceed to Payment" : "Submit Donation"}
              </motion.button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationForm;
