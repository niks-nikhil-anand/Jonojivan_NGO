"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import slide1 from "../../../../public/frontend/heroSection/slide1.jpg";
import slide2 from "../../../../public/frontend/heroSection/slide2.jpg";
import slide3 from "../../../../public/frontend/heroSection/slide3.jpg";
import CustomDonationForm from "./CustomDonationForm";

const slides = [slide1, slide2, slide3];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsDonationFormOpen(true);
  };

  return (
    <>
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Slides with Next.js Image */}
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-purple-900/30 z-10" />

        {/* Content */}
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest font-medium text-pink-200 mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Helping around the world
          </motion.h2>

          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            MAKE SOMEONE&apos;S LIFE BY
          </motion.h1>

          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent mt-1 sm:mt-2 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            GIVING OF YOURS.
          </motion.h1>

          {/* Donate Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-6 lg:mt-8"
          >
            <Button
              onClick={handleDonateClick}
              size="lg"
              className="bg-[#e91e63] hover:bg-[#d81b60] text-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
            >
              Donate Now
              <Heart className="ml-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Dots */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {slides.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === i
                  ? "bg-gradient-to-r from-green-400 to-blue-400 scale-110"
                  : "bg-white/70 hover:bg-white/90"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Background Animation Blobs */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-full blur-xl z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/20 to-green-600/20 rounded-full blur-lg z-10"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Custom Donation Form Modal/Dialog */}
    {isDonationFormOpen && (
        <CustomDonationForm
          isOpen={isDonationFormOpen}
          setIsModalOpen={setIsDonationFormOpen}
        />
      )}
    </>
  );
};

export default HeroSection;