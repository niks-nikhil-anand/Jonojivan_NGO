"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import CampaignDonationForm from "./CampaignDonationForm";
import { useRouter } from "next/navigation";


const CampaignCards = () => {
  const [cardsData, setCardsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const router = useRouter();
  


  const openModal = (cardId) => {
    setSelectedCardId(cardId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCardId(null);
    setIsModalOpen(false);
  };

  // Fetch campaigns from the API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/api/admin/dashboard/campaign/addCampaign");
        setCardsData(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="bg-[#f7f8fc] py-6 px-4 md:px-12 mt-5">
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
            key={card._id}
            className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={card.image} // Image from the API
                alt={card.title}
                className="w-full h-48 md:h-56 object-cover"
              />
              <motion.button
                className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-semibold rounded-md shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
          Goal: ₹ {(card.goal / 10000000).toFixed(2)} crore
          </motion.button>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 hover:underline cursor-pointer"
             onClick={() => router.push(`/causes/${card._id}`)}

              >
                {card.title}
              </h2>
              <p className="text-sm md:text-base text-gray-600 my-4">
              {card.description.split(" ").slice(0, 20).join(" ")}...
              </p>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex justify-between text-xs md:text-sm font-medium text-gray-600 mb-1">
                  <span>{Math.min((card.raised / card.goal) * 100, 100).toFixed(2)}%</span>
                  <span> Goal ₹{card.goal.toLocaleString("en-IN")}</span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-2 bg-[#D07021] rounded-full"
                    style={{ width: `${(card.raised / card.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                Raised: ₹{card.raised.toLocaleString()}
                </div>
              </div>

              {/* Button */}
              <motion.button
                className="w-full bg-[#FF0080] text-white py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold shadow-md"
                whileHover={{ y: -3 }}
                onClick={() => openModal(card._id)}
              >
                DONATE NOW
              </motion.button>
            </div>
            {isModalOpen && selectedCardId === card._id && (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CampaignDonationForm
                  setIsModalOpen={setIsModalOpen}
                  cardId={selectedCardId}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CampaignCards;
