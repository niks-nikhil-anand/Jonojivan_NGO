"use client"
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Heart,
  Users,
  ArrowRight,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const signInUrl = "/api/volunteer/auth/signIn";

      const response = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        setSuccess("Sign in successful! Redirecting...");
        
        // Add a small delay before redirect for better UX
        setTimeout(() => {
          window.location.href = "/volunteer/dashboard";
        }, 1000);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Invalid credentials";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-6 shadow-xl transform hover:scale-110 transition-all duration-300 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-50 blur-sm"></div>
            <Sparkles className="w-10 h-10 text-white relative z-10" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h2>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Jonojivan Member SignIn
          </h3>
          <p className="text-blue-600 text-base font-medium">
            Jonojivan Foundation
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-200 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>

          <div className="relative z-10">
            {/* Success/Error Alerts */}
            {success && (
              <div className="mb-6 p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl shadow-sm">
                <p className="text-blue-700 text-sm font-medium flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-blue-600" />
                  {success}
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl shadow-sm">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50/50 hover:bg-white hover:border-blue-300 text-blue-900 placeholder-blue-400"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-blue-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50/50 hover:bg-white hover:border-blue-300 text-blue-900 placeholder-blue-400 pr-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
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

              {/* Sign In Button */}
              <button
                type="button"
                onClick={handleSignIn}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                }`}
              >
                {/* Button shine effect */}
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
                )}
                
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    <span>Sign In to Jonojivan</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 inline-flex items-center space-x-1 hover:underline"
              >
                <span>Forgot your password?</span>
              </a>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                New to Jonojivan?{" "}
                <a
                  href="/volunteer/signup"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
                >
                  Become a Member
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-8">
              <div className="border-t border-blue-200 flex-grow"></div>
              <div className="px-4 text-blue-600 text-sm font-semibold bg-blue-50 rounded-full py-1">
                Jonojivan Foundation
              </div>
              <div className="border-t border-blue-200 flex-grow"></div>
            </div>

            {/* Footer Message */}
            <div className="text-center">
              <p className="text-blue-600 text-sm font-medium">
                Empowering Lives • Building Communities
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-blue-600 text-sm font-medium">
            <Heart className="w-4 h-4 text-blue-500" />
            <span>Thank you for being part of our mission</span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 text-center">
          <div className="flex justify-center space-x-6 text-xs text-blue-500">
            <span>📞 +91 94352 66783</span>
            <span>📧 info@jonojivan.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
``