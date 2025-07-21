"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import slide1 from "../../../../public/frontend/heroSection/slide1.jpg";
import slide2 from "../../../../public/frontend/heroSection/slide2.jpg";
import slide3 from "../../../../public/frontend/heroSection/slide3.jpg";

const slides = [
  {
    image: slide1,
    title: "Protecting Human Rights",
    subtitle:
      "Stand up for justice and equality. Your support helps us defend the rights of the most vulnerable in our society.",
    button1: "Become member",
    button2: "Jono-Garib Kalyan ",
    focus: "Human Rights",
  },
  {
    image: slide2,
    title: "Fighting Corruption",
    subtitle:
      "Join us in building a transparent society. Together we can create accountability and ensure resources reach those who need them most.",
    button1: "Become member",
    button2: "Jono-Garib Kalyan ",
    focus: "Anti-Corruption",
  },
  {
    image: slide3,
    title: "Social Welfare for All",
    subtitle:
      "Supporting communities through comprehensive welfare programs. Help us create lasting change in healthcare, education, and livelihood.",
    button1: "Become member",
    button2: "Jono-Garib Kalyan ",
    focus: "Social Welfare",
  },
];

const slideVariants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Preload images
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image.src;
    });

    // Start auto slide interval
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  const { image, title, subtitle, button1, button2 } = slides[current];

  return (
    <div
      className="relative w-full bg-black overflow-hidden 
  h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen"
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {/* Background Image */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300 ease-in-out"
            priority
          />
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center px-6 md:px-20 z-10">
            {/* Gradient Overlay to the Left */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/60 to-black z-0 " />

            {/* Text Content */}
            <div className="max-w-2xl text-white space-y-6 z-10">
              {title.includes(" to ") ? (
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Playfair_Display'] font-semibold leading-tight text-center md:text-left"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 500,
                  }}
                >
                  {title.split(" to ")[0]} <br className="hidden sm:block" />
                  {"to " + title.split(" to ")[1]}
                </h1>
              ) : (
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-['Playfair_Display'] font-semibold leading-tight text-center md:text-left"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 500,
                  }}
                >
                  {title}
                </h1>
              )}

              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-light leading-relaxed text-center md:text-left"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                {/* Primary Button - White Text on Primary Background */}
                <motion.button
                  className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-blue-700 transition text-xs sm:text-sm md:text-base lg:text-xl cursor-pointer"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontWeight: 600,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {button1}
                </motion.button>

                {/* Secondary Button - Transparent with White Border */}
                <motion.button
                  className="border border-white text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all text-xs sm:text-sm md:text-base lg:text-xl cursor-pointer"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontWeight: 600,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {button2}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Slider;
