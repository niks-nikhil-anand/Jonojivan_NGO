"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa'; 
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [orderComplete, setOrderComplete] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCookieAndRedirect = async () => {
      try {
        console.log("Attempting to retrieve cookies...");
        
        const cookieResponse = await axios.get('/api/auth/userAuthTokenCookies');
        
        console.log("Cookie response:", cookieResponse.data);
        
        const userId = cookieResponse.data[0]?._id;
        
        if (!userId) {
          console.error("User ID not found in the cookie response.");
          return;
        }
        
        console.log("Redirecting to user profile with userId:", userId);
        router.push(`/users/${userId}`);
        
      } catch (error) {
        console.error("Error retrieving cookies or redirecting:", error);
      }
    };

    fetchCookieAndRedirect();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-2xl bg-white">
        {orderComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="flex items-center mt-4 bg-green-50 p-4 rounded-md border border-green-200"
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 10,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="mr-2 text-green-600"
            >
              <FaCheckCircle className="text-8xl" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold text-green-600"
            >
              Order Completed Successfully!
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
