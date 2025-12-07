import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  Lock,
  FileText,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VolunteerRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    gender: "",
    mobile: "",
    whatsapp: "",
    email: "",
    guardianName: "",
    guardianMobile: "",
    maritalStatus: "",

    // Address Details
    address: "",
    country: "India",
    state: "",
    district: "",
    pincode: "",

    // Identity
    documentType: "Aadhaar Card",
    documentNumber: "",

    // Joining Details
    committee: "",
    subCommittee: "",
    joiningState: "",
    post: "",
    supportingAmount: "",

    // Security & Image
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Data Constants
  const committees = [
    { name: "Executive Committee", amount: 499 },
    { name: "National Committee", amount: 499 },
    { name: "State Committee", amount: 499 },
    { name: "Mandal Committee", amount: 499 },
    { name: "District Committee", amount: 499 },
    { name: "Tehsil Committee", amount: 499 },
    { name: "Block Committee", amount: 499 },
    { name: "Board of Guardians", amount: 499 },
    { name: "Member", amount: 499 },
    { name: "Chairman", amount: 499 },
  ];

  const subCommittees = [
    "Main Body",
    "National Body",
    "State Body",
    "District Body",
    "Sub Body",
  ];

  const posts = [
    "Area District Manager",
    "Assistant Event Manager",
    "Assistant Manager",
    "Associate Public Relations Head",
    "Chairman",
    "Co Media In Charge",
    "Co-Convener",
    "Co-head of Training",
    "Committee President",
    "Committee Puyun",
    "Convener",
    "District Manager",
    "Event Manager",
    "Executive Member",
    "Financier",
    "General",
    "General Secretary",
    "IT Manager",
    "Legal Adviser",
    "Media In Charge",
    "Member",
    "Nagar Chairman",
    "Public Relations Head",
    "Secretary",
    "Spokesperson",
    "Team Manager",
    "Team Service Manager",
    "Training Manager",
    "Vice Chairman",
    "Sabalambi Member",
    "AREA DEVELOPED MANAGER (ADM)",
    "AREA SALES MANAGER (ASM)",
    "BUSINESS DEVELOPED MANAGER (BDM)",
    "CHAUKI DOR (CD)",
    "DONATE CONNECTION MANAGER (DCM)",
    "SARVA SHIKSHA SCHOOL RELATIONSHIP (SSSR)",
    "SARVA SHIKSHA SCHOOL HEAD TEACHER (SSSHT)",
    "COMMITTEE RELATIONSHIP PRESIDENT (CRP)",
    "HUMAN RIGHTS COMMITTEE PRESIDENT",
    "HUMAN RIGHTS COMMITTEE SECRETARY",
    "HUMAN RIGHTS COMMITTEE MEMBER",
    "ANTI CORRUPTION COMMITTEE PRESIDENT",
    "ANTI CORRUPTION COMMITTEE SECRETARY",
    "ANTI CORRUPTION COMMITTEE MEMBER",
    "SCHOOL COMMITTEE PRESIDENT",
    "SCHOOL COMMITTEE SECRETARY",
    "SCHOOL COMMITTEE MEMBER",
    "SOCIAL WELFARE COMMITTEE PRESIDENT",
    "SOCIAL WELFARE COMMITTEE SECRETARY",
    "SOCIAL WELFARE MEMBER",
    "SARVA SHIKSHA SCHOOL TEACHER",
    "SARVA SHIKSHA SCHOOL STUDENT",
    "NARI SHAKTI GROUP PRESIDENT",
    "NARI SHAKTI GROUP SECRETARY",
    "NARI SHAKTI GROUP MEMBER",
    "GARIB KALYAN SEVA COMMITTEE PRESIDENT",
    "GARIB KALYAN SEVA COMMITTEE SECRETARY",
    "GARIB KALYAN SEVA COMMITTEE MEMBER",
  ];

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Lakshadweep",
    "Andaman and Nicobar Islands",
  ];

  const documentTypes = [
    "Aadhaar Card",
    "PAN Card",
    "Bank Passbook",
    "Voter ID Card",
  ];

  const steps = [
    { id: 1, title: "Personal Details", icon: User },
    { id: 2, title: "Address Details", icon: MapPin },
    { id: 3, title: "Identity", icon: FileText },
    { id: 4, title: "Membership", icon: Users },
    { id: 5, title: "Security", icon: Lock },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Input sanitization and restriction
    let processedValue = value;

    if (["mobile", "whatsapp", "guardianMobile"].includes(name)) {
      // Allow only numbers and max 10 digits
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "pincode") {
      // Allow only numbers and max 6 digits
      processedValue = value.replace(/\D/g, "").slice(0, 6);
    } else if (name === "documentNumber") {
      // Validation based on document type
      if (formData.documentType === "Aadhaar Card") {
         processedValue = value.replace(/\D/g, "").slice(0, 12);
      } else if (formData.documentType === "PAN Card") {
         processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
      } else {
         // Default alphanumeric for others (Voter ID, Bank)
         processedValue = value.slice(0, 20);
      }
    }

    setFormData((prev) => {
      const updates = { [name]: processedValue };
      
      if (name === "committee") {
        const selectedCommittee = committees.find((c) => c.name === processedValue);
        if (selectedCommittee) {
          updates.supportingAmount = selectedCommittee.amount.toString();
        } else {
          updates.supportingAmount = "";
        }
      }
      
      // Clear document number when document type changes
      if (name === "documentType") {
        updates.documentNumber = "";
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const validateStep = (step) => {
    const required = [];
    switch (step) {
      case 1:
        required.push("name", "gender", "mobile", "email", "guardianName", "guardianMobile", "maritalStatus");
        break;
      case 2:
        required.push("address", "state", "district", "pincode");
        break;
      case 3:
        required.push("documentType", "documentNumber");
        break;
      case 4:
        required.push("committee", "subCommittee", "joiningState", "post", "supportingAmount");
        break;
      case 5:
        required.push("password", "confirmPassword");
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return false;
        }
        break;
      default:
        break;
    }

    const missing = required.filter(field => !formData[field]);
    if (missing.length > 0) {
      // Format field names for better readability (e.g., "confirmPassword" -> "Confirm Password")
      const formattedMissing = missing.map(field => 
        field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
      ).join(", ");
      
      alert(`Please fill in the following required fields: ${formattedMissing}`);
      return false;
    }

    // Specific Validations
    if (step === 1) {
      if (!/^\d{10}$/.test(formData.mobile)) {
        alert("Mobile Number must be exactly 10 digits.");
        return false;
      }
      if (formData.whatsapp && !/^\d{10}$/.test(formData.whatsapp)) {
        alert("WhatsApp Number must be exactly 10 digits.");
        return false;
      }
      if (!/^\d{10}$/.test(formData.guardianMobile)) {
        alert("Guardian Mobile Number must be exactly 10 digits.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert("Please enter a valid email address.");
        return false;
      }
    }

    if (step === 2) {
      if (!/^\d{6}$/.test(formData.pincode)) {
        alert("Pincode must be exactly 6 digits.");
        return false;
      }
    }

    if (step === 3) {
      const { documentType, documentNumber } = formData;
      
      if (documentType === "Aadhaar Card") {
        if (!/^\d{12}$/.test(documentNumber)) {
          alert("Aadhaar Number must be exactly 12 digits.");
          return false;
        }
      } else if (documentType === "PAN Card") {
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(documentNumber)) {
          alert("Invalid PAN Card Number format.");
          return false;
        }
      } else if (documentType === "Voter ID Card") {
        // Basic length check for Voter ID (usually 10 chars)
        if (documentNumber.length < 10) {
          alert("Voter ID Card number seems too short.");
          return false;
        }
      }
      // Bank Passbook check (just presence which is already done)
    }

    return true;
  };

  const nextStep = () => {
    if (isNavigating) return;
    if (validateStep(currentStep)) {
      setDirection(1);
      setIsNavigating(true);
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      setTimeout(() => setIsNavigating(false), 400); // Reset after transition
    }
  };

  const prevStep = () => {
    if (isNavigating) return;
    setDirection(-1);
    setIsNavigating(true);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setTimeout(() => setIsNavigating(false), 400); // Reset after transition
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep < 5) {
      nextStep();
      return;
    }

    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData[key]) {
          submitData.append("image", formData[key]);
        } else if (key !== "image" && key !== "confirmPassword") {
          submitData.append(key, formData[key]);
        }
      });

      const response = await fetch("/api/member", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      console.log("Registration successful:", result);
      alert("Registration submitted successfully!");
      
      // Reset or Redirect
      window.location.reload(); 
    } catch (error) {
      console.error("Registration failed:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const renderField = (label, name, type = "text", placeholder, required = true, options = null, readOnly = false, fullWidth = false) => (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value || opt.name || opt} value={opt.value || opt.name || opt}>
              {opt.label || opt.name || opt} {opt.amount ? `- ₹${opt.amount}` : ""}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
          readOnly={readOnly}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${readOnly ? 'cursor-not-allowed opacity-75' : ''}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Member Registration
          </h1>
          <p className="text-gray-600 text-lg">Join us in making a difference. Complete your profile in 5 simple steps.</p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative max-w-3xl mx-auto">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive || isCompleted 
                        ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110" 
                        : "border-gray-200 text-gray-400 bg-white"
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative min-h-[500px]">
          <form onSubmit={handleSubmit} className="p-8 lg:p-12 h-full flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                className="w-full"
              >
                {/* Step 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderField("Full Name", "name", "text", "Enter full name")}
                    {renderField("Gender", "gender", "select", "", true, [
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" }
                    ])}
                    {renderField("Mobile Number", "mobile", "tel", "Enter mobile number")}
                    {renderField("WhatsApp Number", "whatsapp", "tel", "Enter WhatsApp number", false)}
                    {renderField("Email Address", "email", "email", "Enter email address")}
                    {renderField("Marital Status", "maritalStatus", "select", "", true, [
                      { value: "single", label: "Single" },
                      { value: "married", label: "Married" },
                      { value: "divorced", label: "Divorced" },
                      { value: "widowed", label: "Widowed" }
                    ])}
                    {renderField("Guardian Name", "guardianName", "text", "Father/Mother/Wife Name")}
                    {renderField("Guardian Mobile", "guardianMobile", "tel", "Guardian contact number")}
                  </div>
                )}

                {/* Step 2: Address Details */}
                {currentStep === 2 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderField("Address", "address", "textarea", "Complete address", true, null, false, true)}
                    {renderField("Country", "country", "text", "", true, null, true)}
                    {renderField("State", "state", "select", "Select state", true, indianStates)}
                    {renderField("District", "district", "text", "Enter district")}
                    {renderField("Pincode", "pincode", "text", "Enter pincode")}
                  </div>
                )}

                {/* Step 3: Identity Verification */}
                {currentStep === 3 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderField("Document Type", "documentType", "select", "", true, documentTypes)}
                    {renderField(
                      formData.documentType === "Aadhaar Card" ? "Aadhaar Number" : 
                      formData.documentType === "PAN Card" ? "PAN Number" : 
                      formData.documentType === "Bank Passbook" ? "Account Number" : "Voter ID Number",
                      "documentNumber",
                      "text",
                      "Enter document number"
                    )}
                  </div>
                )}

                {/* Step 4: Membership Details */}
                {currentStep === 4 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {renderField("Committee", "committee", "select", "", true, committees)}
                    {renderField("Sub Committee", "subCommittee", "select", "", true, subCommittees)}
                    {renderField("Joining State", "joiningState", "select", "", true, indianStates)}
                    {renderField("Post", "post", "select", "", true, posts)}
                    {renderField("Supporting Amount (Non-Refundable)", "supportingAmount", "number", "Auto-filled", true, null, true)}
                  </div>
                )}

                {/* Step 5: Security & Image */}
                {currentStep === 5 && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        {renderField("Password", "password", showPassword ? "text" : "password", "Create a strong password")}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-[38px] text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      {renderField("Confirm Password", "confirmPassword", "password", "Repeat password")}
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="profile-upload"
                      />
                      <label htmlFor="profile-upload" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {formData.image ? <CheckCircle2 className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-700">
                            {formData.image ? "Image Selected" : "Upload Profile Photo"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formData.image ? formData.image.name : "Click to browse or drag and drop"}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={isNavigating || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 1 
                    ? "opacity-0 pointer-events-none" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isNavigating || isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:transform-none"
                >
                  Next Step <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || isNavigating}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:transform-none"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>Complete Registration <CheckCircle2 className="w-5 h-5" /></>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-gray-400 mt-8 text-sm">
          Protected by Jonojivan Foundation &copy; 2024
        </p>
      </div>
    </div>
  );
};

export default VolunteerRegistrationForm;
