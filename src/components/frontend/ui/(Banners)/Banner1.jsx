"use client";
import React from "react";
import { motion } from "framer-motion";
import banner1 from "../../../../../public/frontend/CampaignBanner/cause-4.jpg";
import banner2 from "../../../../../public/frontend/CampaignBanner/cause-5.jpg";
import banner3 from "../../../../../public/frontend/CampaignBanner/cause-6.jpg";

// Data array for the cards
const cardsData = [
  {
    id: 1,
    image: banner1,
    title: "Help to Mothers",
    description:
      "Support mothers with essential resources to improve their lives and that of their families.",
    progress: 36,
    goal: "₹334,000",
    raised: "₹122,200",
  },
  {
    id: 2,
    image: banner2,
    title: "Empower Education",
    description:
      "Provide education tools and scholarships to children in underserved areas.",
    progress: 50,
    goal: "₹200,000",
    raised: "₹100,000",
  },
  {
    id: 3,
    image: banner3,
    title: "Support Healthcare",
    description:
      "Deliver critical healthcare resources to communities in need.",
    progress: 75,
    goal: "₹500,000",
    raised: "₹375,000",
  },
];

const HelpCard = () => {
  return (
    <div className=" bg-white py-6  px-4 md:px-12">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h4 className="text-sm md:text-base text-gray-500 font-medium">
          Dignity, Opportunity, Hope
        </h4>
        <h1 className="text-3xl md:text-4xl font-bold text-[#FF473D]">
          Our Causes
        </h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card) => (
          <motion.div
            key={card.id}
            className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={card.image.src} // Use the imported image
                alt={card.title}
                className="w-full h-48 md:h-56 object-cover"
              />
              <motion.button
                className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-md shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {card.goal}
              </motion.button>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {card.description}
              </p>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex justify-between text-xs md:text-sm font-medium text-gray-600 mb-1">
                  <span>{card.progress}%</span>
                  <span>Goal: {card.goal}</span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-2 bg-[#D07021] rounded-full"
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Raised: {card.raised}
                </div>
              </div>

              {/* Button */}
              <motion.button
                className="w-full bg-[#FF0080] text-white py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold shadow-md"
                whileHover={{ y: -3 }}
              >
                DONATE NOW
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HelpCard;
