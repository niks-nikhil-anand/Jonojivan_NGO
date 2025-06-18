"use client";
import React, { useState } from "react";
import { Heart, Info, Loader2, CreditCard, User, Mail, Phone, FileText, MapPin } from "lucide-react";

const DonationSection = ({ program }) => {
  const [amount, setAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [showReadMore, setShowReadMore] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    panCard: "",
    phone: "",
    state: "",
    city: "",
    pincode: "",
    country: "India",
    donationMode: "Online",
    agreeToUpdates: false,
    citizenDeclaration: false,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  const resetForm = () => {
    setFormData({ 
      fullName: "", 
      email: "", 
      panCard: "", 
      phone: "", 
      state: "",
      city: "",
      pincode: "",
      country: "India",
      donationMode: "Online",
      agreeToUpdates: false,
      citizenDeclaration: false,
    });
    setAmount("");
    setIsCustom(false);
  };

  const initiateRazorpayPayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount.");
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
        alert(`Error: ${errorData.message}`);
        setIsLoading(false);
        return false;
      }

      const { order } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Program Donation",
        description: `Donation for ${program?.title || 'Program'}`,
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          try {
            const verificationResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
            });

            if (!verificationResponse.ok) {
              const errorData = await verificationResponse.json();
              console.error("Payment verification failed:", errorData);
              alert(`Payment verification failed: ${errorData.message}`);
              setIsLoading(false);
              return;
            }

            const verificationResult = await verificationResponse.json();
            console.log("Payment verification successful:", verificationResult);

            try {
              const requestData = {
                amount: payload.amount / 100,
                fullName: formData.fullName,
                emailaddress: formData.email,
                panCard: formData.panCard,
                phonenumber: formData.phone,
                state: formData.state,
                city: formData.city,
                pincode: formData.pincode,
                paymentMethod: "Online",
                razorpay_order_id,
                razorpay_payment_id,
              };

              const donationResponse = await fetch("/api/donationSuccess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
              });

              if (!donationResponse.ok) {
                const errorData = await donationResponse.json();
                console.error("Error details:", errorData);
                alert(`Error recording donation: ${errorData.message}`);
                setIsLoading(false);
                return;
              }

              const donationResult = await donationResponse.json();
              console.log("Donation API response data:", donationResult);
              resetForm();
              setIsLoading(false);
            } catch (donationError) {
              console.error("Failed to record donation:", donationError);
              alert("Failed to record donation. Please try again.");
              setIsLoading(false);
            }
          } catch (verificationError) {
            console.error("Failed to verify payment:", verificationError);
            alert("Payment verification failed. Please try again.");
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: { address: "Program Donation" },
        theme: { color: "#10b981" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      alert("Failed to create Razorpay order. Please try again.");
      setIsLoading(false);
    }
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

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.state || !formData.city || !formData.pincode) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    if (!formData.citizenDeclaration) {
      alert("Please confirm that you are a citizen of India.");
      return;
    }

    const payload = { ...formData, amount, paymentMethod };

    if (paymentMethod === "Online") {
      await initiateRazorpayPayment();
    } else {
      setIsLoading(true);
      const donationResponse = await makeDonationApiCall(payload);
      
      if (donationResponse.success) {
        alert("Donation successful! Thank you for your support.");
        resetForm();
      } else {
        alert(`Error: ${donationResponse.message}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <div className="max-w-4xl ">        

        {/* Main Donation Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">
            <h2 className="text-2xl font-bold text-white">Yes! I'd like to help</h2>
            <p className="text-emerald-100 mt-2">Complete the form below to make your contribution</p>
          </div>
          
          <div className="p-8">
            <div className="space-y-8">
              {/* Amount Selection */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  Select Donation Amount
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {["500", "1000", "2500", "5000"].map((amountValue) => (
                    <button
                      key={amountValue}
                      type="button"
                      className={`h-12 text-lg font-semibold rounded-xl transition-all transform hover:scale-105 ${
                        amount === amountValue
                          ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                          : "bg-gray-50 hover:bg-emerald-50 text-gray-700 border-2 border-gray-200 hover:border-emerald-300"
                      }`}
                      onClick={() => handleAmountSelect(amountValue)}
                    >
                      ₹{amountValue}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`h-12 text-lg font-semibold rounded-xl transition-all transform hover:scale-105 ${
                      isCustom
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                        : "bg-gray-50 hover:bg-emerald-50 text-gray-700 border-2 border-gray-200 hover:border-emerald-300"
                    }`}
                    onClick={handleCustomAmountSelect}
                  >
                    Custom
                  </button>
                </div>

                {isCustom && (
                  <div className="space-y-2">
                    <label htmlFor="customAmount" className="text-sm font-medium text-gray-700">Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        ₹
                      </span>
                      <input
                        id="customAmount"
                        type="number"
                        className="w-full pl-8 h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                        placeholder="Enter custom amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-emerald-100 pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 transition-all">
                      <span className="px-4 py-3 bg-gray-50 border-r border-gray-200 text-gray-700 font-medium rounded-l-xl">
                        +91
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        maxLength={10}
                        className="w-full px-4 py-3 rounded-r-xl outline-none"
                        placeholder="Enter 10-digit number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                      placeholder="Enter your state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pincode" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      maxLength={6}
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                      placeholder="Enter your pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>

                {/* PAN Card - Full Width */}
                <div className="space-y-2">
                  <label htmlFor="panCard" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    PAN Card Number
                  </label>
                  <input
                    id="panCard"
                    name="panCard"
                    type="text"
                    maxLength={10}
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none uppercase"
                    placeholder="ABCDE1234F"
                    value={formData.panCard}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-amber-600 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <strong>Please note that if you do not provide your PAN Number, you will not be able to claim 50% tax exemption u/s 80G in India</strong>
                  </p>
                </div>
              </div>

              {/* Information Collection Notice */}
              <div className="space-y-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-4 font-medium">
                    <strong>Information is being collected to comply with government regulations and shall be treated as confidential.</strong> These details shall not be divulged for any other purpose. By sharing your details, you agree to receive stories and updates from CRY via mobile, Whatsapp, landline, email and post. If you'd like to change this, please send us an email on writetous@crymail.org
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agreeToUpdates"
                        className="mt-1 w-4 h-4 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"
                        checked={formData.agreeToUpdates}
                        onChange={(e) => handleCheckboxChange('agreeToUpdates', e.target.checked)}
                      />
                      <label htmlFor="agreeToUpdates" className="text-sm cursor-pointer">
                        I agree to receive stories and updates from CRY via mobile, Whatsapp, landline, email and post
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="citizenDeclaration"
                        className="mt-1 w-4 h-4 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"
                        checked={formData.citizenDeclaration}
                        onChange={(e) => handleCheckboxChange('citizenDeclaration', e.target.checked)}
                      />
                      <label htmlFor="citizenDeclaration" className="text-sm cursor-pointer">
                        <span className="text-red-500">*</span> I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided is accurate to the best of my knowledge.
                        {!showReadMore && (
                          <button 
                            type="button"
                            className="text-emerald-600 hover:underline ml-1 font-medium"
                            onClick={() => setShowReadMore(true)}
                          >
                            Read More
                          </button>
                        )}
                        {showReadMore && (
                          <span>
                            {" "}I understand that this donation is voluntary and irrevocable. I also acknowledge that I have read and understood the terms and conditions of the donation.{" "}
                            <button 
                              type="button"
                              className="text-emerald-600 hover:underline font-medium"
                              onClick={() => setShowReadMore(false)}
                            >
                              Read Less
                            </button>
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Summary */}
              {amount && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total Donation Amount:
                    </span>
                    <span className="text-3xl font-bold text-emerald-600">
                      ₹{amount}
                    </span>
                  </div>
                </div>
              )}

              {/* Information Alert */}
              <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-blue-800 text-sm">
                    Your donation is secure and will be processed safely. You'll receive a confirmation email shortly after completing your donation.
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  className="flex-1 h-12 text-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all transform hover:scale-105"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Reset Form
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !amount || !formData.citizenDeclaration}
                  className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2 inline" />}
                  {isLoading ? "Processing..." : "Donate Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSection;