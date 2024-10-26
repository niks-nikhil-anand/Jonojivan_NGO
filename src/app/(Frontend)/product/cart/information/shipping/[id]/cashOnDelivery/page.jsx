"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa'; // Importing a tick icon

const Page = () => {
  const [orderComplete, setOrderComplete] = useState(true);

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
