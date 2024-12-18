"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify"; // Make sure you have the react-toastify package installed
import { useRouter } from "next/navigation";

const CampaignDonationForm = ({  setIsModalOpen, cardId }) => {  
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
  const [blogData, setBlogData] = useState(null); // To store the full blog response




  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/admin/dashboard/campaign/${cardId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setBlogData(data); // Store the fetched data
        } else {
          toast.error("Failed to fetch blog data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching blog data.");
      }
    };

    if (cardId) {
      fetchBlogData();
    }
  }, [cardId]);


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
                   cardId
                 };
   
                 console.log("Request data:", requestData);
   
                 const donationResponse = await fetch("/api/campaignSuccess", {
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

    const payload = { ...formData, amount, donationMode: formData.donationMode };

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
    <div>
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg w-full sm:w-11/12 md:w-8/12 lg:w-6/12 max-w-md shadow-lg relative max-h-[97vh] overflow-y-auto">
        <button
          className="absolute top-4 right-2 bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-800 rounded-full p-2 sm:p-3 shadow-md"
          onClick={closeModal}
        >
          <FaTimes className="w-5 h-5" />
        </button>
  
        {blogData ? (
      <>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black">
          {blogData.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6">
          {blogData.description.split(" ").slice(0, 20).join(" ")}...
          </p>
      </>
    ) : (
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black">
        Loading Blog...
      </h2>
    )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">PAN Card Number(Optional)</label>
            <input
              type="text"
              name="panCard"
              value={formData.panCard}
              onChange={handleInputChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg"
              placeholder="Enter PAN card number"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <div className="flex items-center border rounded-lg shadow-sm text-black">
          <span className="px-2 sm:px-4 py-2 bg-gray-100 border-r text-gray-700">+91</span>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-2 sm:px-4 py-2 border-gray-300 rounded-lg text-black"
            placeholder="Enter your phone number"
            required
          />
        </div>

          </div>
  
          {/* Donation Amount Section */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">
              Donation Amount (₹{amount})
            </label>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={decrementAmount}
                className="px-3 sm:px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                -
              </button>
  
              <input
                type="range"
                min="1000"
                max="10000"
                value={amount}
                onChange={handleAmountChange}
                className="w-full mx-3 sm:mx-4"
              />
  
              <button
                type="button"
                onClick={incrementAmount}
                className="px-3 sm:px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                +
              </button>
            </div>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium text-gray-700">Amount</label>
            <input
              type="text"
              value={`₹${amount}`}
              readOnly
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-black"
            />
          </div>
  
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-4 text-white font-semibold rounded-lg ${
              isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </div>
    </div>
  </div>
  
  
  

  );
};

export default CampaignDonationForm;
