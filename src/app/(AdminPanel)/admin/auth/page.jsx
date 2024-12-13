"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('admin'); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginUrl = '/api/admin/auth';

      const response = await axios.post(loginUrl, {
        email,
        password,
      });

      if (response.status === 200) {
        setEmail('');
        setPassword('');
        toast.success("Login successful! Redirecting...");
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-green-50 px-6 md:px-4 w-full flex-col">
  <div className="w-full md:w-2/3 lg:w-1/2 md:pl-6 my-5">
    <motion.h2
      className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-extrabold mb-6 text-center md:text-left text-green-800 mt-8 tracking-wide"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Welcome Back to BringSmile Foundation...
    </motion.h2>

        

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center text-sm cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 text-white rounded-2xl ${loading ? 'bg-gray-400' : 'bg-green-700 hover:bg-green-600'} text-sm md:text-base`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <div className="flex justify-between mt-4 text-sm md:text-base">
          <a href="#" className="text-green-700 hover:underline">Forgot password?</a>
        </div>

        <div className="flex items-center justify-between my-6">
          <span className="border-t border-gray-300 flex-grow"></span>
          <span className="mx-4 text-gray-600">BringSmile Foundation</span>
          <span className="border-t border-gray-300 flex-grow"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
