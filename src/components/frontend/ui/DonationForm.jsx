"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DonationForm = () => {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    panCard: "",
    phone: "",
    donationMode: "Online", // Add this line to set the initial selection to "Online"
  });
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state


  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setIsCustom(false);
  };

  const handleCustomAmountSelect = () => {
    setAmount("");
    setIsCustom(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ fullName: "", email: "", panCard: "", phone: "" });
    setAmount("");
    setIsModalOpen(false);
  };

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
  const initiateRazorpayPayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return false;
    }

    setIsLoading(true); // Set loading to true when payment starts

    const payload = {
      amount: amount * 100, // Convert to smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    try {
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        setIsLoading(false); // Set loading to false after payment creation attempt
        return false;
      }

      const { order } = await response.json();

      const options = {
        key: "rzp_test_YyfNhFl02BDQxW",
        amount: order.amount,
        currency: order.currency,
        name: "Donation",
        description: "Donation for the cause",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          router.push("/donation/success");

          try {
            const verificationResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
            });

            if (!verificationResponse.ok) {
              const errorData = await verificationResponse.json();
              console.error("Payment verification failed:", errorData);
              toast.error(`Payment verification failed: ${errorData.message}`);
              setIsLoading(false); // Set loading to false after verification failure
              return;
            }

            const verificationResult = await verificationResponse.json();
            console.log("Payment verification successful:", verificationResult);

            // Record donation after successful verification
            try {
              console.log("Preparing data for donation API call...");

              const requestData = {
                amount: payload.amount / 100, // Convert to rupees
                fullName: formData.fullName,
                emailaddress: formData.email,
                panCard: formData.panCard,
                phonenumber: formData.phone,
                paymentMethod: "Online", // Specify the payment method
                razorpay_order_id, // Optional, include only if your API handles it
                razorpay_payment_id, // Optional, include only if your API handles it
              };

              console.log("Request data:", requestData);

              const donationResponse = await fetch("/api/donationSuccess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
              });

              console.log("API response status:", donationResponse.status);

              if (!donationResponse.ok) {
                const errorData = await donationResponse.json();
                console.error("Error details:", errorData);
                toast.error(`Error recording donation: ${errorData.message}`);
                setIsLoading(false); // Set loading to false after donation API failure
                return;
              }

              const donationResult = await donationResponse.json();
              console.log("Donation API response data:", donationResult);

              toast.success("Donation successful! Thank you for your support.");
             
              setIsLoading(false); // Set loading to false after donation success
            } catch (donationError) {
              console.error("Failed to record donation:", donationError);
              toast.error("Failed to record donation. Please try again.");
              setIsLoading(false); // Set loading to false after donation failure
            }
          } catch (verificationError) {
            console.error("Failed to verify payment:", verificationError);
            toast.error("Payment verification failed. Please try again.");
            setIsLoading(false); // Set loading to false after verification failure
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: { address: "Razorpay Donation" },
        theme: { color: "#FF0080" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      toast.error("Failed to create Razorpay order. Please try again.");
      setIsLoading(false); // Set loading to false after payment creation failure
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, amount, paymentMethod };

    if (paymentMethod === "Online") {
      await initiateRazorpayPayment();
      closeModal();
    } else {
      setIsLoading(true); // Set loading to true when processing offline donation
      if (donationResponse.success) {
        toast.success("Donation successful! Thank you for your support.");
        resetForm();
        router.push("/donation/success");
      } else {
        toast.error(`Error: ${donationResponse.message}`);
      }
      setIsLoading(false); // Set loading to false after donation API completion
    }
  };

  return (
    <motion.div
      className="w-full p-8 bg-[#DEB841] rounded-b-2xl shadow-2xl text-black  mx-auto max-w-7xl z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">MAKE A DONATION</h3>
        <p className="text-sm sm:text-base mb-6 text-gray-800">
        Your Donation Can Transform Lives and Shape Futures      
          </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {["1" ,"500", "1000", "2500", "5000"].map((value) => (
            <button
              key={value}
              className={`px-6 py-3 border rounded-lg font-semibold text-lg shadow-md ${
                amount === value ? "bg-[#FF0080] text-white" : "bg-white"
              }`}
              onClick={() => handleAmountSelect(value)}
            >
              ₹{value}
            </button>
          ))}
          <button
            className={`px-6 py-3 border rounded-lg font-semibold text-lg shadow-md ${
              isCustom ? "bg-[#FF0080] text-white" : "bg-white"
            }`}
            onClick={handleCustomAmountSelect}
          >
            Custom Amount
          </button>
        </div>
              {isCustom && (
       <motion.input
       type="number"
       className="px-4 py-3 w-full max-w-md border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0080] focus:border-[#FF0080] bg-gray-100 transition-all duration-300 shadow-sm"
       placeholder="₹ Enter custom amount"
       value={amount}
       onChange={(e) => setAmount(e.target.value)}
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.5 }}
     />
     
      )}

      <motion.button
        onClick={openModal}
        className="px-10 py-4 bg-gradient-to-r from-[#FF0080] to-[#FF0080] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 m-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        DONATE NOW
      </motion.button>

      </div>

            {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative max-h-[100vh] overflow-y-auto">
                <button
              className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes className="text-gray-600" />
            </button>
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF0080] mb-2">
                Make a Difference with Your Donation
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Your generosity supports impactful initiatives and helps us make a change.
              </p>
                </div>
            <form onSubmit={handleSubmit}>
            

              <div className="mb-6">
                <label
                  htmlFor="donationAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Selected Amount
                </label>
                <input
                  type="text"
                  id="donationAmount"
                  name="donationAmount"
                  value={`₹${amount}`}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-100"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF0080] focus:border-[#FF0080]"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF0080] focus:border-[#FF0080]"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="panCard"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  PAN Card (optional)
                </label>
                <input
                  type="text"
                  id="panCard"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF0080] focus:border-[#FF0080]"
                />
              </div>

              <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="flex items-center border rounded-lg shadow-sm focus-within:ring-[#FF0080] focus-within:border-[#FF0080]">
                    <span className="px-4 py-2 bg-gray-100 border-r text-gray-700">+91</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 focus:outline-none"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms || true}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the <Link href={"/termsAndConditions"} className="text-[#FF0080] underline">Terms and Conditions</Link>.
                </label>
              </div>

              <button
                type="submit"
                className={`w-full py-3 text-white font-bold bg-[#FF0080] rounded-lg shadow-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Donate Now"}
              </button>
            </form>
          </div>
        </div>
      )}





    </motion.div>
  );
};

export default DonationForm;
