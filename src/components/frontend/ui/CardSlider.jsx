"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const cards = [
  {
    src: "/cards/card2.jpeg",
    title: "Jonjivan Gramin Vikash Foundation",
    description:
      "Empowering rural communities through education, skill development, and healthcare.",
  },
  {
    src: "/cards/card1.jpeg",
    title: "Jonjivan Gramin Vikash Foundation",
    description:
      "Promoting self-sustainability and women empowerment in villages.",
  },
  {
    src: "/cards/card3.jpeg",
    title: "Jonjivan Gramin Vikash Foundation",
    description:
      "Bringing opportunities closer to rural youth through training programs.",
  },
];

const CardSlider = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide only on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 3000);
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
    <div className="p-4">
      {/* Desktop / Tablet → Grid */}
      <div className="hidden sm:flex gap-4 h-[500px]">
        {/* Left big card */}
        <div
          className="flex-1 cursor-pointer rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 container"
          onClick={() => setSelectedImage(cards[0].src)}
        >
          <Image
            src={cards[0].src}
            alt="Card 1"
            width={600}
            height={500}
            className="object-cover w-full h-full"
          />
          <div className="p-3 bg-white">
            <h3 className="font-semibold text-lg">{cards[0].title}</h3>
            <p className="text-sm text-gray-600">{cards[0].description}</p>
          </div>
        </div>

        {/* Right two stacked small cards */}
        <div className="flex-1 flex flex-col gap-4">
          {cards.slice(1).map((card, index) => (
            <div
              key={index + 1}
              className="flex-1 cursor-pointer rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedImage(card.src)}
            >
              <Image
                src={card.src}
                alt={`Card ${index + 2}`}
                width={600}
                height={245}
                className="object-cover w-full h-full"
              />
              <div className="p-3 bg-white">
                <h3 className="font-semibold text-lg">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile → Slider */}
      <div className="sm:hidden relative w-full overflow-hidden">
        <div className="p-3 bg-white flex justify-center items-center flex-col">
          <h3 className="font-semibold text-xl">
            Jonjivan Gramin Vikash Foundation
          </h3>
          <p className="text-sm text-gray-600 text-center">
            Empowering rural communities through education, skill development,
            and healthcare.
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer rounded-xl overflow-hidden shadow-lg"
            onClick={() => setSelectedImage(cards[currentIndex].src)}
          >
            <Image
              src={cards[currentIndex].src}
              alt={`Card ${currentIndex + 1}`}
              width={400}
              height={250}
              className="object-cover w-full h-60"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-6 my-5">
          <button
            onClick={prevSlide}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
          >
            <AiOutlineLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
          >
            <AiOutlineRight size={24} />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Fullscreen View"
            width={800}
            height={600}
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CardSlider;
