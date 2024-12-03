"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaDonate, FaChild, FaHandsHelping } from "react-icons/fa";

const Card = ({ Icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 h-96 flex flex-col justify-between"
    >
      <div className="flex flex-col items-center">
        <div className="bg-white p-6 rounded-full mb-6 shadow-lg">
          <Icon className="text-red-500 w-12 h-12" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 text-center text-base">
          {description}
        </p>
      </div>
      <a
        href="#"
        className="text-red-500 text-sm font-medium underline hover:text-red-700 transition-colors mt-6 self-center"
      >
        Learn More
      </a>
    </motion.div>
  );
};

const WhoWeAre = () => {
  const cardData = [
    {
      Icon: FaDonate,
      title: "Give Donation",
      description:
        "Support charitable causes across the globe and make a difference in the lives of those in need.",
    },
    {
      Icon: FaChild,
      title: "Children Helped",
      description:
        "Provide resources and assistance to children worldwide, ensuring brighter futures for the next generation.",
    },
    {
      Icon: FaHandsHelping,
      title: "Become Volunteer",
      description:
        "Join hands with us and contribute your time and skills to create a positive impact in your community.",
    },
  ];

  return (
    <div className="bg-[#f7f8fc] grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
      {cardData.map((card, index) => (
        <Card
          key={index}
          Icon={card.Icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default WhoWeAre;
