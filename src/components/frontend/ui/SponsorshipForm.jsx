"use client";
import React, { useState } from "react";
import {
  CreditCard,
  FileText,
  Heart,
  Mail,
  Phone,
  User,
  X,
  GraduationCap,
  Calendar,
} from "lucide-react";

const SponsorshipForm = ({ setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    panCard: "",
    phone: "",
    donationMode: "Online",
    terms: true,
  });
  const [years, setYears] = useState(1); // Initialize years to 1 (1 Year)
  const [amount, setAmount] = useState(26000); // Initialize amount for 1 year
  const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
  const baseAmount = 26000; // Base amount for 1 year
  // Mock router for demonstration
  const router = { push: (path) => console.log('Navigate to:', path) };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleYearChange = (selectedYears) => {
    setYears(selectedYears);
    setAmount(baseAmount * selectedYears); // Update the amount based on selected years
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      panCard: "",
      phone: "",
      donationMode: "Online",
      terms: true,
    });
    setYears(1);
    setAmount(26000);
    setIsModalOpen(false);
  };

  const initiateRazorpayPayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      console.log("Error: Please enter a valid donation amount.");
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
        console.log(`Error: ${errorData.message}`);
        setIsLoading(false); // Set loading to false after payment creation attempt
        return false;
      }

      const { order } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Child Sponsorship",
        description: "Sponsor a child's education",
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
              console.log(`Payment verification failed: ${errorData.message}`);
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
                console.log(`Error recording donation: ${errorData.message}`);
                setIsLoading(false); // Set loading to false after donation API failure
                return;
              }

              const donationResult = await donationResponse.json();
              console.log("Donation API response data:", donationResult);

              console.log("Sponsorship successful! Thank you for your support.");

              setIsLoading(false); // Set loading to false after donation success
            } catch (donationError) {
              console.error("Failed to record donation:", donationError);
              console.log("Failed to record sponsorship. Please try again.");
              setIsLoading(false); // Set loading to false after donation failure
            }
          } catch (verificationError) {
            console.error("Failed to verify payment:", verificationError);
            console.log("Payment verification failed. Please try again.");
            setIsLoading(false); // Set loading to false after verification failure
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: { address: "Child Sponsorship" },
        theme: { color: "#FF0080" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      console.log("Failed to create Razorpay order. Please try again.");
      setIsLoading(false); // Set loading to false after payment creation failure
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, amount, donationMode: formData.donationMode };

    if (formData.donationMode === "Online") {
      await initiateRazorpayPayment();
      closeModal();
    } else {
      setIsLoading(true); // Set loading to true when processing offline donation
      // Mock offline donation processing
      setTimeout(() => {
        console.log("Sponsorship successful! Thank you for your support.");
        resetForm();
        router.push("/donation/success");
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/90 via-emerald-900/90 to-teal-900/90 backdrop-blur-sm flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-2xl w-full sm:w-11/12 md:w-7/12 lg:w-[50%] xl:w-4/12 2xl:w-1/3 shadow-2xl relative max-h-[95vh] overflow-y-auto border border-green-100">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 rounded-t-2xl relative">
          <button
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-300 backdrop-blur-sm"
            onClick={closeModal}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 text-white">
            <GraduationCap className="w-8 h-8" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Sponsor a Child's Education
              </h2>
              <p className="text-green-100 text-sm">
                Transform a life through education
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Information Section */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-4 rounded-xl border border-green-100">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Sponsoring a child costs ₹26,000 per year, covering their school fees, books, uniforms, and other essential resources for a full year of education. Your generous donation helps make a lasting impact on a child's future.
                </p>
              </div>
            </div>
          </div>

          {/* Years Selection */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
              <Calendar className="w-4 h-4 text-green-600" />
              Select Sponsorship Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => handleYearChange(year)}
                  className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 border-2 ${
                    years === year
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                >
                  {year} Year{year > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Display */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-4 rounded-xl border border-green-100">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <CreditCard className="w-4 h-4 text-green-600" />
              Sponsorship Amount
            </label>
            <div className="bg-white p-4 rounded-lg border-2 border-green-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  ₹{amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  For {years} year{years > 1 ? 's' : ''} of education
                </div>
              </div>
            </div>
          </div>

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

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
              I agree to the{" "}
              <a href="/termsAndConditions" className="text-[#e91e63] hover:text-[#c2185b] font-medium underline">
                Terms and Conditions
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !formData.terms}
            className={`w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
              isLoading || !formData.terms
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
                <GraduationCap className="w-5 h-5" />
                Sponsor Now
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipForm;