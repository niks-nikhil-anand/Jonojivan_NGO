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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8 ">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-green-700 text-lg font-medium">
            Volunteer Portal - Jonojivan Foundation
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-green-200 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

          <div className="relative z-10">
            {/* Success/Error Alerts */}
            {success && (
              <div className="mb-6 p-4 border border-green-200 bg-green-50 rounded-lg">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-green-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-green-50 hover:bg-white"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-green-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-green-50 hover:bg-white pr-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-green-500 hover:text-green-700 transition-colors"
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
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-medium transition-colors inline-flex items-center space-x-1"
              >
                <span>Forgot your password?</span>
              </a>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                New volunteer?{" "}
                <a
                  href="/volunteer/signup"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Create an account
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-8">
              <div className="border-t border-green-200 flex-grow"></div>
              <div className="px-4 text-green-600 text-sm font-medium">
                Jonojivan Foundation
              </div>
              <div className="border-t border-green-200 flex-grow"></div>
            </div>

            {/* Footer Message */}
            <div className="text-center">
              <p className="text-green-600 text-sm">
                Join our mission to make a difference in the community
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-green-600 text-sm">
            <Heart className="w-4 h-4" />
            <span>Thank you for your service to the community</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;