"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import authSignBanner from '../../../../public/frontend/authSignIn.svg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      email,
      password,
      rememberMe,
    };
    
    try {
      console.log("Sending login request with formData:", formData);
      const response = await axios.post('/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Login response:", response);
      
      if (response.status === 200) { 
        console.log("Login successful, retrieving cookies...");
        
        const cookieResponse = await axios.get('/api/auth/userAuthTokenCookies');
        console.log("Cookie response:", cookieResponse);

        if (cookieResponse.status === 200 && cookieResponse.data) {

          // Clear form fields
          setEmail('');
          setPassword('');
          setRememberMe(false);
          const userId = cookieResponse.data[0]._id; 

          console.log("Redirecting to user profile:", userId);
          router.push(`/users/${userId}`);
        } else {
          console.error("Failed to retrieve cookies or cookies are undefined:", cookieResponse);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-lg flex items-center justify-center bg-gray-50 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 w-full flex flex-col md:flex-row items-center"
      >
        <div className="hidden md:flex md:w-1/2 justify-center">
          <Image src={authSignBanner} alt="Login Banner" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">Welcome to JonoJivan Grocery </h2>
          <p className="text-center md:text-left text-gray-600 mb-6">
            Please sign-in to your account and start your beauty journey
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email or Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
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
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label className="text-gray-700">Remember me</label>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white rounded-lg ${loading ? 'bg-gray-500' : 'bg-purple-900 hover:bg-purple-800'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
          <div className="flex justify-between mt-4">
            <a href="#" className="text-purple-900 hover:underline">Forgot password?</a>
            <a href="#" className="text-purple-900 hover:underline">Create an account</a>
          </div>
          <div className="flex items-center justify-between mt-6">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-4 text-gray-600">JonoJivan Grocery</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
