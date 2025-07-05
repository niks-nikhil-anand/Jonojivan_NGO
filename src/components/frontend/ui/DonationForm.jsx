"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Added missing imports
import { Heart, X, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate phone number length
    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    // Validate PAN card format if provided
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
      // Fixed: Call the API function that was defined but never used
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
        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400
 p-8 rounded-b-2xl shadow-2xl text-white mx-auto max-w-7xl z-20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background decoration */}
        <div className="absolute top-4 right-4 opacity-10">
          <Heart className="w-20 h-20" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 mb-2"
          >
            <Heart className="w-4 h-4 text-green-300" />
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
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-green-300"
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
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-green-300"
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
              <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-5 py-3 rounded-l-lg">
                ₹
              </span>
              <input
                type="number"
                className="px-6 py-3 border border-gray-300 rounded-r-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
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
            className="px-10 py-4 bg-[#e91e63] hover:bg-[#d81b60] text-white rounded-lg shadow-lg hover:shadow-xl focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "DONATE NOW"}
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 p-6 rounded-t-2xl text-white relative">
              <button
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                onClick={closeModal}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">
                Complete Your Donation
              </h2>
              <p className="text-white/90">
                Help us create positive change in our community
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    label: "Full Name",
                    field: "fullName",
                    type: "text",
                    required: true,
                    placeholder: "Enter full name",
                  },
                  {
                    label: "Email Address",
                    field: "email",
                    type: "email",
                    required: true,
                    placeholder: "Enter email address",
                  },
                  {
                    label: "Phone Number",
                    field: "phone",
                    type: "tel",
                    required: true,
                    placeholder: "+91 Enter 10-digit phone number",
                  },
                  {
                    label: "PAN Card Number",
                    field: "panCard",
                    type: "text",
                    required: false,
                    placeholder: "Enter 10-character PAN number",
                  },
                  {
                    label: "Address",
                    field: "address",
                    type: "text",
                    required: false,
                    placeholder: "Enter address",
                  },
                ].map(({ label, field, type, required, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {label}{" "}
                      {required && <span className="text-red-500">*</span>}
                      {field === "phone" && (
                        <span className="text-gray-500 text-xs ml-1">
                          (10 digits only)
                        </span>
                      )}
                      {field === "panCard" && (
                        <span className="text-gray-500 text-xs ml-1">
                          (10 characters)
                        </span>
                      )}
                    </label>
                    <input
                      type={type}
                      name={field}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder={placeholder}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      required={required}
                      maxLength={
                        field === "phone" || field === "panCard"
                          ? 10
                          : undefined
                      }
                    />
                    {field === "panCard" && (
                      <p className="text-xs text-amber-600 mt-1 font-medium">
                        <strong>Note:</strong> If you do not provide your PAN
                        Number, you will not be able to claim 50% tax exemption
                        u/s 80G in India
                      </p>
                    )}
                    {field === "phone" &&
                      formData.phone &&
                      formData.phone.length < 10 && (
                        <p className="text-xs text-red-500 mt-1">
                          Phone number must be exactly 10 digits (
                          {formData.phone.length}/10)
                        </p>
                      )}
                    {field === "panCard" &&
                      formData.panCard &&
                      formData.panCard.length > 0 &&
                      formData.panCard.length < 10 && (
                        <p className="text-xs text-red-500 mt-1">
                          PAN card must be exactly 10 characters (
                          {formData.panCard.length}/10)
                        </p>
                      )}
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Donation Amount
                  </label>
                  <input
                    type="text"
                    value={`₹${amount}`}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 font-bold text-lg"
                  />
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <Info className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Your donation is secure and will be processed safely.
                    You&apos;ll receive a confirmation email shortly.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-green-600 hover:from-emerald-600 hover:via-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Processing..." : "Confirm Donation"}
                  </button>
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
