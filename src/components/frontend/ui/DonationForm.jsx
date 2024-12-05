"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'; // Import useRouter from next/router


const DonationForm = () => {
  const router = useRouter(); // Initialize router

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

  const initiateRazorpayPayment = async () => {
    // Validate the donation amount
    if (!amount || isNaN(amount) || amount <= 0) {
      console.error("Invalid donation amount:", amount);
      toast.error("Please enter a valid donation amount.");
      return;
    }
  
    // Prepare the payload for creating a Razorpay order
    const payload = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
    };
  
    console.log("Payload for Razorpay API:", payload);
  
    try {
      // Create Razorpay order via backend API
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData);
        toast.error(`Error: ${errorData.message}`);
        return;
      }
  
      const { order } = await response.json();
      console.log("Order details from backend:", order);
  
      const options = {
        key: "rzp_test_9P5WN79x91PczG", // Replace with your actual Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Donation",
        description: "Donation for the cause",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
          if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            console.error("Missing payment details in Razorpay response");
            toast.error("Payment verification failed: Missing payment details.");
            return;
          }
  
          console.log("Razorpay payment response:", response);
  
          try {
            // Verify payment with backend
            const verificationResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              }),
            });
  
            if (!verificationResponse.ok) {
              const errorData = await verificationResponse.json();
              console.error("Payment verification failed:", errorData);
              toast.error(`Payment verification failed: ${errorData.message}`);
              return;
            }
  
            const verificationResult = await verificationResponse.json();
            console.log("Payment verification successful:", verificationResult);
  
            // Record donation after successful verification
            try {
              const donationResponse = await fetch("/api/donation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  amount: payload.amount / 100, // Convert to rupees
                  fullName: formData.fullName,
                  emailaddress: formData.email,
                  panCard: formData.panCard,
                  phonenumber: formData.phone,
                  paymentMethod: "Online", // Specify the payment method
                  razorpay_order_id, // Optional, include only if your API handles it
                  razorpay_payment_id, // Optional, include only if your API handles it
                }),
              });
              
  
              if (!donationResponse.ok) {
                const errorData = await donationResponse.json();
                console.error("Error in donation API:", errorData);
                toast.error(`Error recording donation: ${errorData.message}`);
                return;
              }
  
              const donationResult = await donationResponse.json();
              console.log("Donation recorded successfully:", donationResult);
              toast.success("Donation successful! Thank you for your support.");
            } catch (donationError) {
              console.error("Error recording donation:", donationError);
              toast.error("Failed to record donation. Please contact support.");
            }
          } catch (verificationError) {
            console.error("Error verifying payment:", verificationError);
            toast.error("Failed to verify payment. Please contact support.");
          }
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
          color: "#FF0080",
        },
      };
  
      console.log("Razorpay options:", options);
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      toast.error("Failed to create Razorpay order. Please try again.");
    }
  };
  
  
  
  
  
  

// Helper function to make the donation API call
const makeDonationApiCall = async (payload) => {
  try {
    const response = await fetch("/api/donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: "An error occurred. Please try again later." };
  }
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    amount,
    paymentMethod,
  };

  try {
    if (paymentMethod === "Online") {
      console.log("Initiating Razorpay payment...");

      const razorpaySuccess = await initiateRazorpayPayment();

      if (razorpaySuccess) {
        console.log("Razorpay payment result:", razorpaySuccess);
        // Navigate to success page if payment is successful
        router.push("/donation/success");
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } else {
      console.log("Processing offline donation...");

      const donationResponse = await makeDonationApiCall(payload);
      console.log("Donation API response:", donationResponse);

      if (donationResponse.success) {
        toast.success("Donation successful! Thank you for your support.");
        resetForm(); // Ensure form resets on successful donation
        router.push("/donation/success");
      } else {
        // Handle API error response
        toast.error(`Error: ${donationResponse.message}`);
      }
    }
  } catch (error) {
    // Unified error handling for both online and offline processes
    console.error("Error during donation process:", error);

    const errorMessage = paymentMethod === "Online"
      ? "An error occurred during the payment process. Please try again later."
      : "An error occurred while processing your donation. Please try again later.";

    toast.error(errorMessage);
  }
};



// Function to reset the form
const resetForm = () => {
  setFormData({ fullName: "", email: "", panCard: "", phone: "" });
  setAmount("");
  setIsModalOpen(false);
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
