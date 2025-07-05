"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Heart,
  Handshake,
  Building,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/dashboard/contactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message.");

      setSuccess(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
      });
    } catch (error) {
      setError("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contactInfo = [
    {
      title: "Foundation Office",
      details: "UTTAR KHATOWAL PO UTTAR KHATOWAL PS RUPAHIHAT NAGAON ASSAM PIN 782124",
      icon: <Building className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-white/95",
      borderColor: "border-blue-200",
    },
    {
      title: "Location",
      details: "Nagaon, Assam - 782124",
      icon: <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-white/95",
      borderColor: "border-blue-200",
    },
    {
      title: "Email Address",
      details: "info@jonojivanfoundation.org",
      icon: <Mail className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-white/95",
      borderColor: "border-blue-200",
    },
    {
      title: "Phone",
      details: "+91-9435266783",
      icon: <Phone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-white/95",
      borderColor: "border-blue-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/60">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              JONOJIVAN Foundation
            </h1>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Get in Touch
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              We&apos;d love to hear your thoughts. Your opinions and
              experiences matter to us. Share your thoughts and let&apos;s
              improve together.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {/* Contact Form and Info Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100/50"
          >
            <div className="text-center mb-6 sm:mb-8">
              <Send className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                Send us a Message
              </h2>
              <p className="text-sm sm:text-base text-gray-600 px-2">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            {success && (
              <Alert className="mb-4 sm:mb-6 border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 text-sm sm:text-base">
                  Your message has been sent successfully! We&apos;ll get back
                  to you soon.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-4 sm:mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-sm sm:text-base">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    className="w-full h-10 sm:h-12 px-3 sm:px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-full h-10 sm:h-12 px-3 sm:px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                  type="tel"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  className="w-full h-28 sm:h-32 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-sm sm:text-base"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={cardVariants}
            className="space-y-4 sm:space-y-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl mb-6 sm:mb-8 border border-gray-100/50">
              <div className="text-center mb-6 sm:mb-8">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                  Contact Information
                </h2>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Reach out to us through any of these channels
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    }}
                    className={`${info.bgColor} backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 ${info.borderColor} border-2 group relative overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>

                    <div className="flex items-start space-x-3 sm:space-x-4 relative z-10">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${info.color} rounded-xl text-white shadow-lg flex-shrink-0`}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 leading-tight">
                          {info.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {info.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
              <div className="text-center relative z-10">
                <Phone className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-90" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
                  Need Immediate Help?
                </h3>
                <p className="opacity-90 mb-4 text-sm sm:text-base">
                  Call us directly for urgent matters
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+919435266783"
                  className="inline-block bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                >
                  +91-9435266783
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Final CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Empowering Communities. Transforming Lives.
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            JONOJIVAN Foundation is dedicated to creating positive change through community development, education, and social empowerment initiatives.
          </p>
        </div>
      </div>
    </div>
  );
}