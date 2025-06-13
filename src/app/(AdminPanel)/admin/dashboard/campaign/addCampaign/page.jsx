"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import {
  Heart,
  Upload,
  Target,
  FileText,
  Image,
  Plus,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from "@/components/ui/alert";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddCampaignPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: null,
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleQuillChange = (content) => {
    setFormData({ ...formData, content });
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.goal || formData.goal <= 0) newErrors.goal = "Valid goal amount is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("goal", formData.goal);
    formDataToSubmit.append("content", formData.content);

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }

    try {
      const response = await fetch("/api/admin/dashboard/campaign/addCampaign", {
        method: "POST",
        body: formDataToSubmit,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Campaign added successfully!");
        setFormData({
          title: "",
          description: "",
          goal: "",
          image: null,
          content: "",
        });
        setStep(1);
      } else {
        toast.error(data.message || "Failed to add campaign.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Define step titles and descriptions
  const steps = [
    { 
      title: "Campaign Details", 
      description: "Basic information about your campaign" 
    },
    { 
      title: "Content & Media", 
      description: "Story and images for your campaign" 
    }
  ];

  return (
    <div className="w-full h-[90vh] overflow-y-auto max-h-[95vh] p-6 bg-gray-50 custom-scrollbar">
      <Card className="w-full shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-800">Create New Campaign</CardTitle>
              <CardDescription className="text-blue-600 mt-1">Launch your fundraising campaign and make a meaningful impact</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-medium
                    ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step > i + 1 ? <Check size={16} /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-1 w-8 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-600">
              Step {step}: {steps[step-1].title}
            </p>
            <p className="text-xs text-gray-500">{steps[step-1].description}</p>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 pb-20">
          <div onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="mb-6">
                    <Label htmlFor="title" className="text-base font-medium text-gray-700 mb-3 block">
                      Campaign Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter an inspiring campaign title"
                      className={`mt-2 h-12 ${errors.title ? "border-red-300 bg-red-50" : ""}`}
                      disabled={loading}
                      required
                    />
                    {errors.title && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.title}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="description" className="text-base font-medium text-gray-700 mb-3 block">
                      Short Description
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write a compelling description that captures attention"
                      rows="4"
                      className={`w-full mt-2 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none ${
                        errors.description ? "border-red-300 bg-red-50" : ""
                      }`}
                      disabled={loading}
                      required
                    />
                    {errors.description && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="goal" className="text-base font-medium text-gray-700 mb-3 block">
                      Fundraising Goal
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">₹</span>
                      <Input
                        type="number"
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        placeholder="50000"
                        min="0"
                        className={`pl-8 h-12 ${errors.goal ? "border-red-300 bg-red-50" : ""}`}
                        disabled={loading}
                        required
                      />
                    </div>
                    {errors.goal && (
                      <div className="flex items-center mt-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.goal}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6 ">
                  <div className="mb-20">
                    <Label htmlFor="content" className="text-base font-medium text-gray-700 mb-3 block">
                      Campaign Story
                    </Label>
                    <div className={`mt-4 border rounded-md ${errors.content ? "border-red-300" : ""}`}>
                      <ReactQuill
                        value={formData.content}
                        onChange={handleQuillChange}
                        className="h-96 rounded"
                        placeholder="Tell your campaign story in detail. Share the impact, the need, and how donations will make a difference..."
                      />
                    </div>
                    {errors.content && (
                      <div className="flex items-center mt-16 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {errors.content}
                      </div>
                    )}
                  </div>
                  
                  <div className=" mb-6">
                    <Label htmlFor="image" className="text-base font-medium text-gray-700 mb-3 block">
                      Campaign Image
                    </Label>
                    <div className="mt-4 flex items-center">
                      <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-200 cursor-pointer hover:bg-blue-50 transition-colors">
                        <Upload className="w-8 h-8" />
                        <span className="mt-2 text-base">Select campaign image</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="hidden"
                          onChange={handleChange}
                          accept="image/*"
                          disabled={loading}
                        />
                      </label>
                    </div>
                    {formData.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Campaign preview"
                          className="w-16 h-16 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-green-800 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Image uploaded successfully!
                          </p>
                          <p className="text-green-600 text-sm">{formData.image.name}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between p-6 border-t bg-gray-50">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline"
              onClick={handlePrevStep}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < steps.length ? (
            <Button 
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1 bg-blue-400 hover:bg-blue-500"
              disabled={!formData.title || !formData.description || !formData.goal}
            >
              Next
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button 
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !formData.content}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Launch Campaign</span>
                  <Heart className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      <style jsx global>{`
        .campaign-editor .ql-container {
          border: none !important;
          font-size: 16px;
        }
        .campaign-editor .ql-toolbar {
          border: none !important;
          border-bottom: 2px solid #e5e7eb !important;
        }
        .campaign-editor .ql-editor {
          min-height: 300px;
          padding: 20px;
        }
        .campaign-editor .ql-editor::before {
          font-style: normal;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default AddCampaignPage;