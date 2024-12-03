"use client"
import React from 'react';
import { motion } from 'framer-motion';

const FooterBanner = () => {
  return (
    <div className="bg-purple-500 flex items-center justify-between px-8 py-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl font-bold"
      >
        The joy of giving lasts longer than any material possession.
      </motion.div>
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="border-2 border-white px-6 py-2 font-bold uppercase rounded hover:bg-white hover:text-purple-500 transition-colors"
      >
        Donate Now
      </motion.button>
    </div>
  );
};

export default FooterBanner;
