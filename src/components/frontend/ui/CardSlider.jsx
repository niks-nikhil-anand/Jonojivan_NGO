"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";

const cards = [
  {
    src: "/cards/card2.jpeg",
    title: "Jonjivan Gramin Vikash Foundation",
    description: "Empowering rural communities through education, skill development, and healthcare.",
  },
  {
    src: "/cards/card1.jpeg",
    title: "Women Empowerment",
    description: "Promoting self-sustainability and women empowerment in villages.",
  },
  {
    src: "/cards/card3.jpeg",
    title: "Youth Training",
    description: "Bringing opportunities closer to rural youth through training programs.",
  },
];

const CardSlider = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // Changed breakpoint for slider to LG
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 4000); // Slower interval for better UX
        return () => clearInterval(interval);
      }
    };
    const cleanup = handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      cleanup && cleanup();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Header Section (Optional, adds context) */}
      <div className="mb-8 text-center sm:text-left">
           <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500 mb-2">
            Our Initiatives
          </h2> 
          <p className="text-gray-600 max-w-2xl">
            See how we are making a difference in the lives of rural communities.
          </p>
      </div>

      {/* Desktop Layout: Modern Masonry/Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6 h-[500px]">
        {/* Main Large Card (Takes 2 columns) */}
        <div
          className="col-span-2 relative cursor-pointer rounded-3xl overflow-hidden shadow-xl group"
          onClick={() => setSelectedImage(cards[0].src)}
        >
          <Image
            src={cards[0].src}
            alt={cards[0].title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white text-3xl font-bold mb-2">{cards[0].title}</h3>
            <p className="text-gray-200 text-lg opacity-90 line-clamp-2">{cards[0].description}</p>
          </div>
        </div>

        {/* Side Stacked Cards (Takes 1 column) */}
        <div className="col-span-1 flex flex-col gap-6 h-full">
          {cards.slice(1).map((card, index) => (
            <div
              key={index}
              className="flex-1 relative cursor-pointer rounded-3xl overflow-hidden shadow-xl group"
              onClick={() => setSelectedImage(card.src)}
            >
              <Image
                src={card.src}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white text-xl font-bold mb-1">{card.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Layout: Enhanced Slider */}
      <div className="lg:hidden relative w-full overflow-hidden min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full aspect-[4/5] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => setSelectedImage(cards[currentIndex].src)}
          >
            <Image
              src={cards[currentIndex].src}
              alt={cards[currentIndex].title}
              fill
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2 drop-shadow-md">
                {cards[currentIndex].title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base font-medium drop-shadow-sm">
                {cards[currentIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
           <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/30"
          >
            <AiOutlineLeft size={20} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
           <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/30"
          >
            <AiOutlineRight size={20} />
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
            {cards.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300'}`}
                />
            ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full h-auto max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                <AiOutlineClose size={24} />
                </button>
                <Image
                src={selectedImage}
                alt="Fullscreen View"
                width={1200}
                height={800}
                className="w-full h-full object-contain"
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardSlider;
