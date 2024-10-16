"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroSection01 from "../../../../public/frontend/heroSection01.webp";



const HeroSection = () => {
  return (
    <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[75vh] lg:h-[90vh] flex items-center justify-center bg-beige">
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={HeroSection01}
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          priority
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-start justify-center pl-8 sm:pl-12 md:pl-20 lg:pl-28 text-left">
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-red-500 text-5xl sm:text-6xl md:text-[12rem] lg:text-[18rem] font-bold italic leading-none">
              50%
              <span className="block text-[0.5em] sm:text-[0.7em] md:text-[1rem] lg:text-[2rem] ">
                Off
              </span>
            </div>
          </motion.div>

          <motion.p
            className="text-red-500 text-sm sm:text-xl md:text-3xl lg:text-4xl mt-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Superfruit max gummies
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;