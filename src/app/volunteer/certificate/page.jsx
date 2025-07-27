"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import { Award, Download, User, FileText, Loader2 } from "lucide-react";

const CertificateGeneratorPage = () => {
  const [fullName, setFullName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [loading, setLoading] = useState(false);

  const certificateCategories = {
    "educational": {
      title: "🎓 Educational & Training",
      certificates: [
        "Certificate of Participation",
        "Certificate of Completion",
        "Certificate of Achievement",
        "Certificate of Excellence",
        "Skill Development Certificate",
        "Workshop Attendance Certificate",
        "Training Program Certificate",
        "Internship Completion Certificate"
      ]
    },
    "volunteering": {
      title: "❤️ Volunteering & Service",
      certificates: [
        "Volunteer Appreciation Certificate",
        "Social Service Recognition Certificate",
        "Community Service Certificate",
        "Youth Empowerment Certificate",
        "Certificate of Contribution",
        "Leadership in Service Certificate"
      ]
    },
    "recognition": {
      title: "🏆 Recognition & Awards",
      certificates: [
        "Best Volunteer Award",
        "Change-Maker Certificate",
        "Outstanding Dedication Certificate",
        "Role Model Award",
        "Certificate of Honor",
        "Certificate of Recognition"
      ]
    },
    "event": {
      title: "👩‍🏫 Event & Campaign Based",
      certificates: [
        "Health Camp Participation Certificate",
        "Awareness Campaign Certificate",
        "Environment Drive Participation Certificate",
        "Blood Donation Certificate",
        "Educational Seminar Certificate",
        "Women's Empowerment Workshop Certificate"
      ]
    },
    "custom": {
      title: "📜 Custom & Thematic",
      certificates: [
        "Jono Garib Kalyan Certificate",
        "Nari Shakti Certificate (for women empowerment)",
        "Bal Vikas Samman Patra (Child development appreciation)",
        "Senior Citizen Support Certificate"
      ]
    }
  };

  const handleGenerateCertificate = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!selectedCertificate) {
      toast.error("Please select a certificate type");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/member/certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: fullName.trim(),
          certificateType: selectedCertificate,
          category: selectedCategory
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Certificate generated successfully!");
        
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank');
        } else if (result.certificateData) {
          console.log("Certificate data:", result.certificateData);
        }
      } else {
        const errorData = await response.json();
        toast.error(`Failed to generate certificate: ${errorData.msg || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCertificate("");
  };

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto scrollbar-hide">
      <div className="w-full mx-auto py-8 px-4">       

        {/* Main Content Layout - Form Left, Cards Right */}
        <div className="flex flex-col lg:flex-row gap-8">
            
          {/* Form Section - Left Side */}
          <div className="w-full lg:w-1/2 xl:w-2/5">
           <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Certificate Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Generate your personalized certificate with ease</p>
        </div>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <FileText className="w-6 h-6" />
                  <span>Certificate Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {/* Full Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400 transition-all duration-200"
                  />
                </div>

                {/* Certificate Category Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Certificate Category</Label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                      <SelectValue placeholder="Select a certificate category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-blue-200 shadow-xl rounded-lg max-h-60 overflow-y-auto">
                      {Object.entries(certificateCategories).map(([key, category]) => (
                        <SelectItem 
                          key={key} 
                          value={key} 
                          className="hover:bg-blue-50 focus:bg-blue-100 text-gray-800 cursor-pointer py-3 px-4 transition-colors duration-150"
                        >
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Certificate Type Selection */}
                {selectedCategory && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <Label className="text-sm font-semibold text-gray-700">Certificate Type</Label>
                    <Select value={selectedCertificate} onValueChange={setSelectedCertificate}>
                      <SelectTrigger className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                        <SelectValue placeholder="Select a certificate type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-blue-200 shadow-xl rounded-lg max-h-60 overflow-y-auto">
                        {certificateCategories[selectedCategory].certificates.map((cert, index) => (
                          <SelectItem 
                            key={index} 
                            value={cert} 
                            className="hover:bg-blue-50 focus:bg-blue-100 text-gray-800 cursor-pointer py-3 px-4 transition-colors duration-150"
                          >
                            {cert}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Generate Button */}
                <div className="pt-6">
                  <Button
                    onClick={handleGenerateCertificate}
                    disabled={loading || !fullName.trim() || !selectedCertificate}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating Certificate...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Download className="w-5 h-5" />
                        <span>Generate Certificate</span>
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificate Categories Preview Cards - Right Side */}
          <div className="w-full lg:w-1/2 xl:w-3/5 flex flex-col">
            <div className="mb-6 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center lg:text-left">
                Available Certificate Categories
              </h2>
              <p className="text-gray-600 text-center lg:text-left">
                Choose from our wide range of certificate types
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 pr-2">
              {Object.entries(certificateCategories).map(([key, category]) => (
                <Card 
                  key={key} 
                  className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-0 cursor-pointer ${
                    selectedCategory === key ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => handleCategoryChange(key)}
                >
                  <CardHeader className="pb-3 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-t-lg">
                    <CardTitle className="text-lg font-semibold">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {category.certificates.slice(0, 4).map((cert, index) => (
                        <p key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                          <span className="line-clamp-1">{cert}</span>
                        </p>
                      ))}
                      {category.certificates.length > 4 && (
                        <p className="text-sm text-blue-600 font-semibold flex items-center pt-1">
                          <span className="text-blue-500 mr-2">+</span>
                          {category.certificates.length - 4} more certificates...
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGeneratorPage;
