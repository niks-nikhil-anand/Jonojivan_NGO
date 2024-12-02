"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import icon1 from '../../../../../public/frontend/AboutUs/icon1.png';
import icon2 from '../../../../../public/frontend/AboutUs/icon2.png';
import icon3 from '../../../../../public/frontend/AboutUs/icon3.png';
import icon4 from '../../../../../public/frontend/AboutUs/icon4.png';
import main from '../../../../../public/frontend/AboutUs/main.png';

const CausesSection = () => {
  return (
    <div className="bg-[#f7f8fc] py-12 px-4">
      <div className="max-w-screen-xl mx-auto flex items-center flex-wrap">
        {/* Left Section */}
        <motion.div 
          className="w-full md:w-1/2 pr-8 mb-8 md:mb-0" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <Image
            src={main}
            alt="Volunteers serving food"
            className="rounded-lg shadow-lg"
            layout="responsive"
            width={500}
            height={400}
          />
        </motion.div>

        {/* Right Section */}
        <motion.div 
          className="w-full md:w-1/2" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#1d1d1f] mb-6">
            Mission in Motion: Discover <span className="text-[#ff5a5f]">Our Charitable Purpose</span>
          </h2>
          <p className="text-base text-[#6c757d] leading-relaxed mb-8">
            Meet the passionate minds shaping the Charity journey, committed to making a meaningful
            impact on communities worldwide, where compassion meets action. Learn about Charity roots,
            values, and the collective dedication that fuels our mission to create a better, more
            compassionate world.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
  <div className="flex items-center mb-4">
    <Image src={icon1} alt="Save Children" width={50} height={50} />
    <div className="ml-4">
      <h4 className="text-xl font-semibold mb-2">Save Children</h4>
      <p className="text-sm text-[#6c757d]">
        Explore our cutting-edge certified models backed...
      </p>
    </div>
  </div>
  <div className="flex items-center mb-4">
    <Image src={icon2} alt="Clean Water" width={50} height={50} />
    <div className="ml-4">
      <h4 className="text-xl font-semibold mb-2">Clean Water</h4>
      <p className="text-sm text-[#6c757d]">
        Explore our cutting-edge certified models backed...
      </p>
    </div>
  </div>
  <div className="flex items-center mb-4">
    <Image src={icon3} alt="Better Education" width={50} height={50} />
    <div className="ml-4">
      <h4 className="text-xl font-semibold mb-2">Better Education</h4>
      <p className="text-sm text-[#6c757d]">
        Explore our cutting-edge certified models backed...
      </p>
    </div>
  </div>
  <div className="flex items-center mb-4">
    <Image src={icon4} alt="Health Support" width={50} height={50} />
    <div className="ml-4">
      <h4 className="text-xl font-semibold mb-2">Health Support</h4>
      <p className="text-sm text-[#6c757d]">
        Explore our cutting-edge certified models backed...
      </p>
    </div>
  </div>
</div>


          {/* Animated Button with infinite popup effect */}
          <motion.button
            className="mt-8 bg-[#28a745] text-white py-3 px-6 text-lg font-semibold rounded-md hover:bg-[#218838] transition transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.1, 1],
              transition: { 
                duration: 0.5, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }
            }}
          >
            Know More About Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CausesSection;
