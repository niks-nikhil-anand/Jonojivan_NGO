"use client";

import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Award, Send, User, Mail, FileText, Loader2, Sparkles, Check } from "lucide-react";

const CertificateGeneratorPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateCertificate = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!selectedCertificate) {
      toast.error("Please select a certificate type");
      return;
    }

    try {
      setLoading(true);
      
      // Show loading toast
      const loadingToast = toast.loading("Submitting certificate request...", {
        description: "Please wait while we process your request"
      });

      const response = await axios.post("/api/member/certificate", {
        fullName: fullName.trim(),
        email: email.trim(),
        certificateType: selectedCertificate
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.status === 200) {
        toast.success("Certificate request submitted successfully!", {
          description: "Your certificate has been sent for review. You will be notified once it's approved.",
          duration: 5000
        });
        
        // Reset form after successful submission
        setFullName("");
        setEmail("");
        setSelectedCertificate("");
      }
    } catch (error) {
      console.error("Error submitting certificate request:", error);
      
      if (axios.isCancel(error)) {
        toast.error("Request was cancelled");
      } else if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout", {
          description: "The server took too long to respond. Please try again."
        });
      } else if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.msg || error.response.data?.message || 'Unknown error';
        toast.error(`Failed to submit certificate request`, {
          description: errorMessage
        });
      } else if (error.request) {
        // Network error
        toast.error("Network error", {
          description: "Please check your internet connection and try again"
        });
      } else {
        // Something else happened
        toast.error("Failed to submit certificate request", {
          description: "An unexpected error occurred"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12 min-h-screen flex flex-col ">
        {/* Hero Section */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            </div>
            <div className="text-center sm:text-left">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-xl sm:rounded-2xl blur-xl"></div>
                <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent px-4 sm:px-6 py-3 sm:py-4 bg-white/50 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
                  Certificate Request
                </h1>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-3 sm:mt-4">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 bg-white/60 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm text-center">
                  Submit your certificate request for review
                </p>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Centered Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4 sm:p-6">
                <CardTitle className="flex items-center space-x-3 text-lg sm:text-xl">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span>Certificate Request Form</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                {/* Full Name Input */}
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <div className="p-1 bg-blue-100 rounded">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Full Name</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400 transition-all duration-300 hover:border-blue-300 text-sm sm:text-base"
                    />
                    {fullName && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <div className="p-1 bg-green-100 rounded">
                      <Mail className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Email Address</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder:text-gray-400 transition-all duration-300 hover:border-green-300 text-sm sm:text-base"
                    />
                    {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificate Type Selection - FIXED */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <div className="p-1 bg-indigo-100 rounded">
                      <Award className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span>Certificate Type</span>
                  </Label>
                  <Select value={selectedCertificate} onValueChange={setSelectedCertificate}>
                    <SelectTrigger className="w-full px-4 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 transition-all duration-300 hover:border-indigo-300 text-sm sm:text-base">
                      <SelectValue placeholder="Select certificate type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl">
                      <SelectItem value="Achievement" className="hover:bg-indigo-50 text-sm sm:text-base">Achievement</SelectItem>
                      <SelectItem value="Participation" className="hover:bg-indigo-50 text-sm sm:text-base">Participation</SelectItem>
                      <SelectItem value="Excellence" className="hover:bg-indigo-50 text-sm sm:text-base">Excellence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="pt-4 sm:pt-6">
                  <Button
                    onClick={handleGenerateCertificate}
                    disabled={loading || !fullName.trim() || !email.trim() || !selectedCertificate}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {loading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                        <span>Submitting Request...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Submit Certificate Request</span>
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGeneratorPage;
