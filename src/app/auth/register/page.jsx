"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast




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
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!acceptedTerms) {
      toast.error("You must accept the terms and conditions!");
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
        toast.success("Account created successfully!");

        setTimeout(() => {
          router.push("/auth/signIn");
        }, 1000); // Slight delay to allow users to see the success toast
      
      }
    } catch (error) {
      toast.error("Error creating account. Please try again.");
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white px-4 md:px-0 w-full flex-col my-10">
      <div>
        <h1 className="text-3xl my-5">Create Account</h1>
      </div>
      
        <div className="w-full md:w-1/2">          
          <form onSubmit={handleCreateAccount}>
            <div className="mb-4">
              <input
                type="text"
                value={fullName}
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-6 py-2 border border-black rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-2 border border-black rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <span className="bg-gray-200 border border-r-0 border-black rounded-l-2xl px-3 py-2 text-gray-600">+91</span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (value.length <= 10) {
                      setMobileNumber(value);
                    }
                  }}
                  placeholder="Mobile Number"
                  className="w-full px-3 py-2 border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border-black"
                  maxLength={10} // Limit to 10 digits
                  required
                />
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 border-black "
                required
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-2xl border-black focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-1  "
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
               
                <Link href="/terms" className="text-purple-900 hover:underline">
                I accept the terms & condition
                </Link>
              </label>
            </div>
                  <div className="w-full flex justify-center">
                  <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-1/2 py-2 px-4 text-white rounded-2xl  ${
                loading ? "bg-gray-500" : "bg-purple-900 hover:bg-purple-800"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
                  </div>
           
          </form>
          
         
        </div>
      
    </div>
  );
};

export default CreateAccountForm;
