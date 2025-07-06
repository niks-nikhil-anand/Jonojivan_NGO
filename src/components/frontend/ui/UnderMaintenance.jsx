"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const UnderMaintenance = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-xl rounded-lg max-w-md">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We&apos;ll Be Back Soon!
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Our website is currently under maintenance. We appreciate your patience and apologize for any inconvenience.
        </motion.p>
        <motion.div
          className="mt-6 relative w-full h-48"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <Image
            src="https://via.placeholder.com/300x200"
            alt="Under Maintenance"
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 448px) 100vw, 448px"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};

export default UnderMaintenance;