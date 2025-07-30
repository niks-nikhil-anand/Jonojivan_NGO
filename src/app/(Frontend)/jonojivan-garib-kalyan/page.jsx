"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Heart,
  Users,
  MapPin,
  Award,
  Mail,
  Phone,
  Target,
  Globe,
  HandHeart,
  Upload,
  FileText,
  CreditCard,
  User,
  CheckCircle,
  AlertCircle,
  Building2,
  Shield,
  Camera,
  Banknote,
  Link,
  Star,
  Loader2,
} from "lucide-react";
import Initiatives from "@/components/frontend/shared/Initiatives";
import IdCardGenerator from "@/lib/garibKalyanCertificate";

export default function JonojivanMembershipPage() {
  const [formData, setFormData] = useState({
    memberName: "",
    contactNumber: "",
    documentNumber: "",
    accountNumber: "",
    referLinkIdCard: "",
    photoUpload: null,
    aadhaarCard: null,
    bankPassbook: null,
  });

  const [uploadStatus, setUploadStatus] = useState({
    photo: false,
    aadhaar: false,
    bank: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [membershipData, setMembershipData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    // Only allow numbers for contact number and account number
    if (name === "contactNumber") {
      filteredValue = value.replace(/\D/g, "").slice(0, 10); // Only digits, max 10
    } else if (name === "accountNumber") {
      filteredValue = value.replace(/\D/g, "").slice(0, 16); // Only digits, max 16
    }

    setFormData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      const statusKey =
        fieldName === "photoUpload"
          ? "photo"
          : fieldName === "aadhaarCard"
          ? "aadhaar"
          : "bank";

      setUploadStatus((prev) => ({
        ...prev,
        [statusKey]: true,
      }));

      // Clear error when file is uploaded
      if (errors[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.memberName.trim()) {
      newErrors.memberName = "Member name is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = "Please enter exactly 10 digits";
    }

    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = "Document number is required";
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (formData.accountNumber.length !== 16) {
      newErrors.accountNumber = "Please enter exactly 16 digits";
    }

    if (!formData.photoUpload) {
      newErrors.photoUpload = "Photo upload is required";
    }

    if (!formData.aadhaarCard) {
      newErrors.aadhaarCard = "Aadhaar card upload is required";
    }

    if (!formData.bankPassbook) {
      newErrors.bankPassbook = "Bank passbook upload is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateMembershipId = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `JGK${timestamp.slice(-6)}${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const apiFormData = new FormData();
      
      // Append text fields
      apiFormData.append('memberName', formData.memberName);
      apiFormData.append('contactNumber', formData.contactNumber);
      apiFormData.append('documentNumber', formData.documentNumber);
      apiFormData.append('accountNumber', formData.accountNumber);
      apiFormData.append('referLinkIdCard', formData.referLinkIdCard || '');
      
      // Append files
      if (formData.photoUpload) {
        apiFormData.append('photoUpload', formData.photoUpload);
      }
      
      if (formData.aadhaarCard) {
        apiFormData.append('aadhaarCard', formData.aadhaarCard);
      }
      
      if (formData.bankPassbook) {
        apiFormData.append('bankPassbook', formData.bankPassbook);
      }

      // Make API call
      const response = await axios.post('/api/jonojivan-garib-kalyan', apiFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });

      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        // Generate membership data for ID card
        const membershipId = generateMembershipId();
        const membershipDataForId = {
          membershipId,
          memberName: formData.memberName,
          contactNumber: formData.contactNumber,
          documentNumber: formData.documentNumber,
          accountNumber: formData.accountNumber,
          referLinkIdCard: formData.referLinkIdCard,
          photoUpload: formData.photoUpload,
          issueDate: new Date().toLocaleDateString('en-IN'),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'), // 1 year from now
        };

        setMembershipData(membershipDataForId);
        setShowIdCard(true);

        alert(
          "Membership application submitted successfully! Your ID card will be generated and downloaded automatically."
        );
        
        // Reset form
        setFormData({
          memberName: "",
          contactNumber: "",
          documentNumber: "",
          accountNumber: "",
          referLinkIdCard: "",
          photoUpload: null,
          aadhaarCard: null,
          bankPassbook: null,
        });
        
        setUploadStatus({
          photo: false,
          aadhaar: false,
          bank: false,
        });

        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `Server error: ${error.response.status}`;
        alert(`Failed to submit application: ${errorMessage}`);
      } else if (error.request) {
        alert("Network error: Please check your internet connection and try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        .slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .pulse-glow {
          animation: pulseGlow 3s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          }
        }

        .glass-card {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .file-input {
          display: none;
        }
      `}</style>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm pulse-glow">
                <HandHeart className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Jonojivan Garib Kalyan
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4 mb-8">
              Join the Jonojivan Foundations Garib Kalyan initiative — a
              compassionate effort to distribute donated funds directly to those
              in need.{" "}
            </p>
            <div className="flex justify-center">
              <div className="bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
                <p className="text-white font-semibold">
                  Jonojivan Garib Kalyan{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Membership Benefits */}
      <div>
        <Initiatives />
      </div>

      {/* Membership Registration Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                Jonojivan Garib Kalyan Yojana
              </h2>
              <p className="text-sm sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
                Fill out the form below to take benefits of Jonojivan Garib
                Kalyan
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Member Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Member Name *
                </label>
                <input
                  type="text"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.memberName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.memberName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.memberName}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact Number * (10 digits only)
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  maxLength="10"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.contactNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your 10-digit phone number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.contactNumber.length}/10 digits
                </p>
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* Document Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Document Number *
                </label>
                <input
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.documentNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your document number"
                />
                {errors.documentNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.documentNumber}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Banknote className="w-4 h-4 inline mr-2" />
                  Account Number * (16 digits only)
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  maxLength="16"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.accountNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your 16-digit bank account number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.accountNumber.length}/16 digits
                </p>
                {errors.accountNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.accountNumber}
                  </p>
                )}
              </div>

              {/* Refer Link ID Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Link className="w-4 h-4 inline mr-2" />
                  Refer Link ID Card Number
                </label>
                <input
                  type="text"
                  name="referLinkIdCard"
                  value={formData.referLinkIdCard}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter referral ID card number (optional)"
                />
              </div>

              {/* File Uploads */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Camera className="w-4 h-4 inline mr-2" />
                    Photo Copy *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "photoUpload")}
                      className="file-input"
                      id="photoUpload"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="photoUpload"
                      className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        uploadStatus.photo
                          ? "border-green-500 bg-green-50"
                          : errors.photoUpload
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {uploadStatus.photo ? (
                        <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      )}
                      <span className="text-sm text-gray-600">
                        {uploadStatus.photo
                          ? "Photo Uploaded"
                          : "Click to upload"}
                      </span>
                    </label>
                  </div>
                  {errors.photoUpload && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.photoUpload}
                    </p>
                  )}
                </div>

                {/* Aadhaar Card Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Aadhaar Card *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, "aadhaarCard")}
                      className="file-input"
                      id="aadhaarCard"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="aadhaarCard"
                      className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        uploadStatus.aadhaar
                          ? "border-green-500 bg-green-50"
                          : errors.aadhaarCard
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {uploadStatus.aadhaar ? (
                        <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      )}
                      <span className="text-sm text-gray-600">
                        {uploadStatus.aadhaar
                          ? "Aadhaar Uploaded"
                          : "Click to upload"}
                      </span>
                    </label>
                  </div>
                  {errors.aadhaarCard && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.aadhaarCard}
                    </p>
                  )}
                </div>

                {/* Bank Passbook Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Bank Passbook *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, "bankPassbook")}
                      className="file-input"
                      id="bankPassbook"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="bankPassbook"
                      className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        uploadStatus.bank
                          ? "border-green-500 bg-green-50"
                          : errors.bankPassbook
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {uploadStatus.bank ? (
                        <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      )}
                      <span className="text-sm text-gray-600">
                        {uploadStatus.bank
                          ? "Passbook Uploaded"
                          : "Click to upload"}
                      </span>
                    </label>
                  </div>
                  {errors.bankPassbook && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.bankPassbook}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
         {showIdCard && membershipData && (
        <IdCardGenerator 
          membershipData={membershipData}
          onClose={() => setShowIdCard(false)}
        />
      )}
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Have questions about membership? We&quot;re here to help!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                  <p className="text-blue-600">membership@jonojivan.org</p>
                </div>
              </div>
              <p className="text-gray-700">
                Send us your questions about membership benefits and
                registration process
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                  <a href="tel:+919435266783" className="text-green-600">
                    +91 9435266783
                  </a>
                </div>
              </div>
              <p className="text-gray-700">
                Speak with our membership coordinator for immediate assistance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
