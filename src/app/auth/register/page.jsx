"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";
import authSignBanner from "../../../../public/frontend/authSignIn.svg";
import Link from "next/link";

const CreateAccountForm = () => {
  const router = useRouter(); // Initialize useRouter
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State for Terms and Conditions checkbox

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!acceptedTerms) {
      alert("You must accept the terms and conditions!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("password", password);

    try {
      const response = await axios.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Clear form fields
        setFullName("");
        setEmail("");
        setMobileNumber("");
        setPassword("");
        setConfirmPassword("");
        setAcceptedTerms(false);

        // Redirect to the login page
        router.push("/auth/signIn");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-lg p-8 w-full flex flex-col md:flex-row items-center"
      >
        <div className="hidden md:flex md:w-1/2 justify-center">
          <Image src={authSignBanner} alt="Sign Up Banner" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">Create Your Account</h2>
          <p className="text-center md:text-left text-gray-600 mb-6">
            Join Blush Belle and start your beauty journey
          </p>
          <form onSubmit={handleCreateAccount}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mobile Number</label>
              <div className="flex items-center">
                <span className="bg-gray-200 border border-r-0 rounded-l-lg px-3 py-2 text-gray-600">+91</span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (value.length <= 10) {
                      setMobileNumber(value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  maxLength={10} // Limit to 10 digits
                  required
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mr-2"
                  required
                />
                I accept the{" "}
                <Link href="/terms" className="text-purple-900 hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white rounded-lg ${
                loading ? "bg-gray-500" : "bg-purple-900 hover:bg-purple-800"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>
          <div className="flex justify-between mt-4">
            <Link href={"/auth/signIn"} className="text-purple-900 hover:underline">
              Already have an account? Login
            </Link>
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-4 text-gray-600">or sign up with</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg mr-2"
            >
              <FaGoogle className="mr-2" /> Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              <FaFacebook className="mr-2" /> Facebook
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateAccountForm;
