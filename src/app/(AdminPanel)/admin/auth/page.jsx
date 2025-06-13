"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Heart,
  Shield,
  ArrowRight,
  Mail,
  Lock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Fixed: Added missing import
import axios from "axios"; // Fixed: Added missing import
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const router = useRouter(); // Fixed: Initialize router

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const loginUrl = "/api/admin/auth";

      const response = await axios.post(loginUrl, {
        email,
        password,
      });

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setSuccess("Login successful! Redirecting...");
        toast.success("Login successful! Redirecting...");
        
        // Add a small delay before redirect for better UX
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Better error handling
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || "Invalid credentials";
        setError(errorMessage);
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection.");
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError("Login failed. Please try again.");
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mb-6 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-lg">
            BringSmile Foundation Admin Portal
          </p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.01,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          }}
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100 relative overflow-hidden group"
        >
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-500 opacity-0 group-hover:opacity-3 transition-opacity duration-500"></div>

          <div className="relative z-10">
            {/* Success/Error Alerts */}
            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white pr-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Forgot Password Link */}
            <div className="mt-6 text-center">
              <Link
                href="#"
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors inline-flex items-center space-x-1"
              >
                <span>Forgot your password?</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-8">
              <div className="border-t border-gray-200 flex-grow"></div>
              <div className="px-4 text-gray-500 text-sm font-medium">
                BringSmile Foundation
              </div>
              <div className="border-t border-gray-200 flex-grow"></div>
            </div>

            {/* Footer Message */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Secure admin access to manage foundation operations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
            <Shield className="w-4 h-4" />
            <span>Protected by enterprise-grade security</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;