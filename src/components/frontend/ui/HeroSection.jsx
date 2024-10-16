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
      </motion.div>
    </div>
  );
};

export default HeroSection;