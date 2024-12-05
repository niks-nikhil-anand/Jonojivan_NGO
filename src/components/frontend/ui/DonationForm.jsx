"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
        key: "rzp_live_9ZTzDG6fFahGrR",
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

              const donationResponse = await fetch("/api/donation", {
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
    } else {
      setIsLoading(true); // Set loading to true when processing offline donation
      const donationResponse = await makeDonationApiCall(payload);
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
      className="w-full p-8 bg-[#DEB841] rounded-b-2xl shadow-2xl text-black mb-8 mx-auto max-w-7xl z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">MAKE A DONATION</h3>
        <p className="text-sm sm:text-base mb-6 text-gray-800">
          Your donation helps us make a real difference in the lives of many.
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
          <input
            type="number"
            className="px-4 py-2 w-full max-w-md border rounded-lg focus:outline-none"
            placeholder="Enter custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        )}
        <motion.button
          onClick={openModal}
          className="px-10 py-4 bg-gradient-to-r from-[#FF0080] to-[#FF0080] text-white font-semibold rounded-lg"
        >
          DONATE NOW
        </motion.button>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30">
    <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
      <button
        className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full"
        onClick={closeModal}
      >
        <FaTimes />
      </button>
      <h2 className="text-xl font-bold mb-6 text-center text-[#FF0080]">Donation Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-6 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              id="online"
              name="donationMode"
              value="Online"
              checked={formData.donationMode === 'Online'}
              onChange={handleInputChange}
              className="mr-2"
            />
            Online
          </label>
          
        </div>

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
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-[#FF0080] focus:border-[#FF0080]"
            required
          />
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
