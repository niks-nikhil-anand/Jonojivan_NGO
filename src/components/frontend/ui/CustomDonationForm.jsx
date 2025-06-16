"use client";
import React, { useState } from "react";
import { toast } from "react-toastify"; 
import { useRouter } from "next/navigation";
import {
  CreditCard,
  FileText,
  Heart,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";

const CustomDonationForm = ({ setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    panCard: "",
    phone: "",
    donationMode: "Online",
  });
  const [amount, setAmount] = useState(1000); // Initialize donation amount
  const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
  const router = useRouter(); // Assuming you use Next.js for routing

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value)); // Update amount with slider value
  };

  const incrementAmount = () => {
    setAmount((prevAmount) => Math.min(prevAmount + 1000, 10000)); // Increase by ₹1000, max ₹10000
  };

  const decrementAmount = () => {
    setAmount((prevAmount) => Math.max(prevAmount - 1000, 1000)); // Decrease by ₹1000, min ₹1000
  };

  const resetForm = () => {
    setFormData({ fullName: "", email: "", panCard: "", phone: "" });
    setAmount(1000); // Reset donation amount to initial value
    setIsModalOpen(false);
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
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Donation",
        description: "Donation for the cause",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          router.push("/donation/success");

          try {
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

    const payload = { ...formData, amount };

    if (formData.donationMode === "Online") {
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
   <div className="fixed inset-0 bg-gradient-to-br from-green-900/90 via-emerald-900/90 to-teal-900/90 backdrop-blur-sm flex items-center justify-center z-30 p-4">
  <div className="bg-white rounded-2xl w-full sm:w-11/12 md:w-7/12 lg:w-[50%] xl:w-4/12 2xl:w-1/3  shadow-2xl relative max-h-[95vh] overflow-y-auto border border-green-100">
    {/* Header with gradient */}
    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 rounded-t-2xl relative">
      <button
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
        onClick={closeModal}
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3 text-white">
        <Heart className="w-8 h-8" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Make a Donation
          </h2>
          <p className="text-green-100 text-sm">
            Your kindness makes a difference
          </p>
        </div>
      </div>
    </div>

    <div className="p-6 space-y-6">
      {/* Full Name */}
      <div className="group">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4 text-green-600" />
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* Email */}
      <div className="group">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Mail className="w-4 h-4 text-[#e91e63]" />
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#e91e63] focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none"
          placeholder="Enter your email address"
          required
        />
      </div>

      {/* PAN Card */}
      <div className="group">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 text-green-600" />
          PAN Card Number
          <span className="text-xs text-gray-500 font-normal">
            (Optional)
          </span>
        </label>
        <input
          type="text"
          name="panCard"
          value={formData.panCard}
          maxLength={10}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none uppercase"
          placeholder="ABCDE1234F"
        />
      </div>

      {/* Phone Number */}
      <div className="group">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Phone className="w-4 h-4 text-[#e91e63]" />
          Phone Number
        </label>
        <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-[#e91e63] focus-within:ring-4 focus-within:ring-pink-100 transition-all duration-300">
          <span className="px-4 py-3 bg-gradient-to-r from-green-50 to-pink-50 border-r border-gray-200 text-gray-700 font-medium rounded-l-xl">
            +91
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            maxLength={10}
            pattern="[0-9]{10}"
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-r-xl outline-none"
            placeholder="Enter 10-digit number"
            required
          />
        </div>
      </div>

      {/* Donation Amount */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-4 rounded-xl border border-green-100">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
          <CreditCard className="w-4 h-4 text-green-600" />
          Donation Amount: ₹{amount.toLocaleString()}
        </label>

        <div className="flex items-center gap-4 mb-4">
          <button
            type="button"
            onClick={decrementAmount}
            className="w-10 h-10 bg-[#e91e63] hover:bg-[#c2185b] text-white rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={amount <= 1000}
          >
            −
          </button>

          <div className="flex-1 relative">
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={amount}
              onChange={handleAmountChange}
              className="w-full h-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #10b981 ${
                  ((amount - 1000) / 9000) * 100
                }%, #e5e7eb ${
                  ((amount - 1000) / 9000) * 100
                }%, #e5e7eb 100%)`,
              }}
            />
          </div>

          <button
            type="button"
            onClick={incrementAmount}
            className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={amount >= 10000}
          >
            +
          </button>
        </div>

        <div className="bg-white p-3 rounded-lg border-2 border-green-200">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
            ₹{amount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Donate Now
          </div>
        )}
      </button>
    </div>
  </div>
</div>
  );
};

export default CustomDonationForm;
