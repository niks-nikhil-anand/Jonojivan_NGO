"use client";
import React, { useState } from "react";
import { Heart, Info, Loader2, CreditCard } from "lucide-react";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

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
      country: "India",
      donationMode: "Online",
      agreeToUpdates: false,
      citizenDeclaration: false,
    });
    setAmount("");
    setIsCustom(false);
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

              alert("Donation successful! Thank you for your support.");
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
        theme: { color: "#3B82F6" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      alert("Failed to create Razorpay order. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.state || !formData.city) {
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
    <div className="min-h-screen bg-white ">
      <div className="max-w-4xl mx-auto">

        {/* Main Donation Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gray-200 text-black rounded-t-lg">
            <CardTitle className="text-2xl">Yes! I'd like to help</CardTitle>
            <CardDescription className="text-black">
              Complete the form below to make your contribution
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Amount Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800">
                  Select Donation Amount
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {["500", "1000", "2500", "5000"].map((amountValue) => (
                    <Button
                      key={amountValue}
                      type="button"
                      variant={amount === amountValue ? "default" : "outline"}
                      className={`h-12 text-lg font-semibold transition-all ${
                        amount === amountValue
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                          : "hover:bg-blue-50 hover:border-blue-300"
                      }`}
                      onClick={() => handleAmountSelect(amountValue)}
                    >
                      ₹{amountValue}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant={isCustom ? "default" : "outline"}
                    className={`h-12 text-lg font-semibold transition-all ${
                      isCustom
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        : "hover:bg-blue-50 hover:border-blue-300"
                    }`}
                    onClick={handleCustomAmountSelect}
                  >
                    Custom
                  </Button>
                </div>

                {isCustom && (
                  <div className="space-y-2">
                    <Label htmlFor="customAmount">Custom Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        ₹
                      </span>
                      <Input
                        id="customAmount"
                        type="number"
                        className="pl-8 h-12 text-lg"
                        placeholder="Enter custom amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-lg font-semibold text-gray-800">
                    Payment Method
                  </Label>
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  We accept all major payment methods
                </p>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-3 gap-4"
                >
                  {["Online", "Offline", "TestDonation"].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <RadioGroupItem value={method} id={method} />
                      <Label 
                        htmlFor={method}
                        className="cursor-pointer flex-1 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {method}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="h-12"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="h-12"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="h-12"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      className="h-12"
                      placeholder="Enter your state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      className="h-12"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      className="h-12"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                </div>

                {/* PAN Card - Full Width */}
                <div className="space-y-2">
                  <Label htmlFor="panCard">PAN Card Number</Label>
                  <Input
                    id="panCard"
                    name="panCard"
                    type="text"
                    className="h-12"
                    placeholder="Enter your PAN card number"
                    value={formData.panCard}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-amber-600 font-medium">
                    <strong>Please note that if you do not provide your PAN Number, you will not be able to claim 50% tax exemption u/s 80G in India</strong>
                  </p>
                </div>
              </div>

              {/* Information Collection Notice */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    <strong>Information is being collected to comply with government regulations and shall be treated as confidential.</strong> These details shall not be divulged for any other purpose. By sharing your details, you agree to receive stories and updates from CRY via mobile, Whatsapp, landline, email and post. If you'd like to change this, please send us an email on writetous@crymail.org
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="agreeToUpdates"
                        checked={formData.agreeToUpdates}
                        onCheckedChange={(checked) => handleCheckboxChange('agreeToUpdates', checked)}
                      />
                      <Label htmlFor="agreeToUpdates" className="text-sm cursor-pointer">
                        I agree to receive stories and updates from CRY via mobile, Whatsapp, landline, email and post
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="citizenDeclaration"
                        checked={formData.citizenDeclaration}
                        onCheckedChange={(checked) => handleCheckboxChange('citizenDeclaration', checked)}
                      />
                      <Label htmlFor="citizenDeclaration" className="text-sm cursor-pointer">
                        <span className="text-red-500">*</span> I hereby declare that I am a citizen of India, making this donation out of my own funds. The information provided is accurate to the best of my knowledge.
                        {!showReadMore && (
                          <button 
                            type="button"
                            className="text-blue-600 hover:underline ml-1"
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
                              className="text-blue-600 hover:underline"
                              onClick={() => setShowReadMore(false)}
                            >
                              Read Less
                            </button>
                          </span>
                        )}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Summary */}
              {amount && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">
                        Total Donation Amount:
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{amount}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Information Alert */}
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Your donation is secure and will be processed safely. You&apos;ll receive a confirmation email shortly after completing your donation.
                </AlertDescription>
              </Alert>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 text-lg"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Reset Form
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !amount || !formData.citizenDeclaration}
                  className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
                  {isLoading ? "Processing..." : "Donate Now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationSection;