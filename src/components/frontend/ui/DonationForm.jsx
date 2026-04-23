"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  X,
  Info,
  Building,
  CreditCard,
  Building2,
  Phone,
  UserPlus,
  LogIn,
  FileText,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import qr from "../../../../public/mediaGallery/QR.jpeg";
// If you use next/image, import it and replace <img ... /> accordingly.

const DonationForm = () => {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    panCard: "",
    phone: "",
    address: "",
    donationMode: "Online",
  });
  const [isLoading, setIsLoading] = useState(false);

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

    // Phone number validation - only allow digits and limit to 10
    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, ""); // Remove non-digits
      if (phoneValue.length <= 10) {
        setFormData({ ...formData, [name]: phoneValue });
      }
      return;
    }

    // PAN card validation - only allow alphanumeric and limit to 10
    if (name === "panCard") {
      const panValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase(); // Remove special chars and convert to uppercase
      if (panValue.length <= 10) {
        setFormData({ ...formData, [name]: panValue });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      panCard: "",
      phone: "",
      address: "",
      donationMode: "Online",
    });
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
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  };

  const initiateRazorpayPayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return false;
    }

    setIsLoading(true);

    const payload = {
      amount: amount * 100,
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
        setIsLoading(false);
        return false;
      }

      const { order } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Donation",
        description: "Donation for the cause",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

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
              setIsLoading(false);
              return;
            }

            const verificationResult = await verificationResponse.json();
            console.log("Payment verification successful:", verificationResult);

            try {
              console.log("Preparing data for donation API call...");

              const requestData = {
                amount: payload.amount / 100,
                fullName: formData.fullName,
                emailaddress: formData.email,
                panCard: formData.panCard,
                phonenumber: formData.phone,
                paymentMethod: "Online",
                razorpay_order_id,
                razorpay_payment_id,
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
                setIsLoading(false);
                return;
              }

              const donationResult = await donationResponse.json();
              console.log("Donation API response data:", donationResult);

              toast.success("Donation successful! Thank you for your support.");
              router.push("/donation/success");
              setIsLoading(false);
            } catch (donationError) {
              console.error("Failed to record donation:", donationError);
              toast.error("Failed to record donation. Please try again.");
              setIsLoading(false);
            }
          } catch (verificationError) {
            console.error("Failed to verify payment:", verificationError);
            toast.error("Payment verification failed. Please try again.");
            setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.panCard && formData.panCard.length !== 10) {
      toast.error("PAN card number must be exactly 10 characters.");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    const payload = { ...formData, amount, paymentMethod };

    if (paymentMethod === "Online") {
      await initiateRazorpayPayment();
      closeModal();
    } else {
      setIsLoading(true);
      const donationResponse = await makeDonationApiCall(payload);

      if (donationResponse.success) {
        toast.success("Donation successful! Thank you for your support.");
        resetForm();
        router.push("/donation/success");
      } else {
        toast.error(`Error: ${donationResponse.message}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-8 rounded-b-2xl shadow-2xl text-white mx-auto max-w-7xl z-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background decoration */}
        <div className="absolute top-4 right-4 opacity-10">
          <Heart className="w-20 h-20" />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 mb-2"
          >
            <Heart className="w-4 h-4 text-blue-300" />
            <span className="text-xs font-medium">Jonojivan Foundaion</span>
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            MAKE A DONATION
          </h3>
          <p className="text-sm sm:text-base mb-6 text-white/90">
            Your donation helps us make a real difference in the lives of many.
            Every contribution counts and creates lasting positive change.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {["500", "1000", "2500", "5000"].map((amountValue) => (
              <motion.button
                key={amountValue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 border border-gray-300 rounded-lg font-semibold text-lg sm:text-xl transition duration-300 shadow-md ${
                  amount === amountValue
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-300"
                    : "bg-white text-black hover:bg-gray-200 hover:scale-105"
                }`}
                onClick={() => handleAmountSelect(amountValue)}
              >
                ₹{amountValue}
              </motion.button>
            ))}
            <button
              className={`px-6 py-3 border border-gray-300 rounded-lg font-semibold text-lg sm:text-xl transition duration-300 shadow-md ${
                isCustom
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-300"
                  : "bg-white text-black hover:bg-gray-200 hover:scale-105"
              }`}
              onClick={handleCustomAmountSelect}
            >
              Custom Amount
            </button>
          </div>

          {isCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex justify-center mb-6"
            >
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-l-lg">
                ₹
              </span>
              <input
                type="number"
                className="px-6 py-3 border border-gray-300 rounded-r-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </motion.div>
          )}

          <motion.button
            onClick={openModal}
            disabled={isLoading}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
              backgroundPosition: "right center",
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600  text-white rounded-lg shadow-lg hover:shadow-xl focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "DONATE NOW"}
          </motion.button>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/become-member" passHref>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6 font-semibold text-sm group">
                  <span className="flex items-center justify-center">
                    <UserPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Become Member
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/auth/member-signIn" passHref>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6 font-semibold text-sm group">
                  <span className="flex items-center justify-center">
                    <LogIn className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Member Login 
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/jonojivan-garib-kalyan" passHref>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-6 font-semibold text-sm group">
                  <span className="flex items-center justify-center">
                    <FileText className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Apply for Jonojivan Garib Kalyan
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Payment Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-12 border border-white/20 max-w-sm mx-auto group hover:bg-white/15 transition-all duration-300"
          >
            <h4 className="text-xl font-bold mb-6 text-white flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Scan to Donate
            </h4>
            <div className="flex justify-center">
              <button
                type="button"
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all font-bold group"
                onClick={() => setShowQR(true)}
              >
                View QR Code
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* QR Modal Overlay (fullscreen, blurred/dark background) */}
      {showQR && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-[90vw] max-h-[90vh] flex flex-col items-center">
            <button
              className="absolute top-4 right-4 bg-gray-200/60 hover:bg-gray-300 text-gray-900 rounded-full p-2 transition"
              onClick={() => setShowQR(false)}
              aria-label="Close QR"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Scan to Donate (QR)
            </h2>
            <div className="bg-white p-4 rounded-xl border-4 border-blue-50">
              <img
                src={typeof qr === "string" ? qr : qr.src}
                alt="QR Code"
                className="max-w-full max-h-[70vh] rounded-lg shadow-xl"
              />
            </div>
            <div className="mt-4 text-gray-600 font-medium">
              Scan this code with any UPI app
            </div>
          </div>
        </motion.div>
      )}


      {/* Donation Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative flex flex-col"
          >
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 rounded-t-[2rem] text-white relative overflow-hidden shrink-0">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-8 -translate-x-8 pointer-events-none"></div>
              
              <button
                type="button"
                className="absolute top-5 right-5 bg-white/20 hover:bg-white/40 rounded-full p-2.5 transition-all duration-300 backdrop-blur-sm z-50 cursor-pointer"
                onClick={closeModal}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="bg-white/20 p-3 rounded-full mb-4 backdrop-blur-md shadow-inner">
                  <Heart className="w-8 h-8 text-pink-300 drop-shadow-md" fill="currentColor" />
                </div>
                <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
                  Complete Your Donation
                </h2>
                <p className="text-blue-100 font-medium">
                  Your generous contribution drives real impact
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all shadow-sm outline-none"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all shadow-sm outline-none"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 focus-within:bg-white transition-all">
                      <div className="pl-4 pr-3 py-3.5 flex items-center border-r border-gray-200 bg-gray-100/50">
                        <span className="text-gray-600 font-bold whitespace-nowrap">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full p-3.5 bg-transparent border-none focus:ring-0 outline-none"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        maxLength={10}
                      />
                    </div>
                    {formData.phone && formData.phone.length > 0 && formData.phone.length < 10 && (
                      <p className="text-xs text-rose-500 mt-1.5 font-medium">
                        Must be exactly 10 digits ({10 - formData.phone.length} remaining)
                      </p>
                    )}
                  </div>

                  {/* PAN Card */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center justify-between">
                      <span>PAN Card Number</span>
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full font-semibold border border-indigo-100">Optional (For 80G)</span>
                    </label>
                    <input
                      type="text"
                      name="panCard"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all shadow-sm outline-none uppercase"
                      placeholder="ABCDE1234F"
                      value={formData.panCard}
                      onChange={handleInputChange}
                      maxLength={10}
                    />
                    {formData.panCard && formData.panCard.length > 0 && formData.panCard.length < 10 && (
                      <p className="text-xs text-amber-600 mt-1.5 font-medium">
                        PAN must be exactly 10 characters
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      Required to claim 50% tax exemption u/s 80G in India.
                    </p>
                  </div>

                  {/* Address */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all shadow-sm outline-none"
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100/60">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Donation Amount</h4>
                      <p className="text-xs text-gray-500 mt-0.5">One-time secure payment</p>
                    </div>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 bg-white px-6 py-2 rounded-xl shadow-sm border border-indigo-100">
                      ₹{amount}
                    </div>
                  </div>

                  <Alert className="border-emerald-200 bg-emerald-50 mb-8 rounded-xl flex items-start p-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5 flex-shrink-0 bg-emerald-100 p-1 rounded-full">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-emerald-800">Secure Process</h5>
                        <AlertDescription className="text-emerald-700 text-xs mt-1 leading-relaxed font-medium">
                          Your donation is processed through Razorpay's 100% secure payment gateway. You will receive an instant 80G receipt on your email.
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>

                  <div className="flex flex-col-reverse sm:flex-row gap-3">
                    <button
                      type="button"
                      className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors w-full sm:w-1/3 outline-none focus:ring-2 focus:ring-gray-300"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      className="group relative px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold transition-all shadow-[0_10px_20px_rgba(79,70,229,0.2)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.3)] w-full sm:w-2/3 flex justify-center items-center gap-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Proceed to Pay
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default DonationForm;
