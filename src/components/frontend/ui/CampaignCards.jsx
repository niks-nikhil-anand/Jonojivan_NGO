"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Heart, Target, TrendingUp } from "lucide-react";
import CampaignDonationForm from "./CampaignDonationForm";
import { useRouter } from "next/navigation";

const CampaignCards = () => {
  const [cardsData, setCardsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const openModal = (cardId) => {
    setSelectedCardId(cardId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCardId(null);
    setIsModalOpen(false);
  };

  // Function to truncate text to specific character limit
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // Fetch campaigns from the API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/dashboard/campaign/addCampaign");
        console.log(response)
        setCardsData(response.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setError("Failed to load campaigns. Please try again later.");
        setCardsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mb-4 lg:mb-6">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          <h4 className="text-base sm:text-lg text-gray-500 font-medium mb-2">
            Dignity, Opportunity, Hope
          </h4>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 lg:mb-4">
            Our Active Campaigns
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Join us in making a real difference. Every contribution counts towards building a better tomorrow.
          </p>
        </motion.div>

        {/* Campaign Cards */}
        {cardsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No campaigns available at the moment.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cardsData.map((card, index) => {
              // Safely calculate progress with fallback values
              const goal = card.goal || 1;
              const raised = card.raised || 0;
              const progressPercentage = Math.min((raised / goal) * 100, 100);
              
              const colors = [
                { 
                  gradient: "from-pink-500 to-fuchsia-500", 
                  bg: "bg-pink-50", 
                  border: "border-pink-200",
                  button: "bg-gradient-to-r from-pink-500 to-fuchsia-500"
                },
                { 
                  gradient: "from-purple-500 to-violet-500", 
                  bg: "bg-purple-50", 
                  border: "border-purple-200",
                  button: "bg-gradient-to-r from-purple-500 to-violet-500"
                },
                { 
                  gradient: "from-blue-500 to-sky-500", 
                  bg: "bg-blue-50", 
                  border: "border-blue-200",
                  button: "bg-gradient-to-r from-blue-500 to-sky-500"
                },
                { 
                  gradient: "from-yellow-500 to-amber-500", 
                  bg: "bg-yellow-50", 
                  border: "border-yellow-200",
                  button: "bg-gradient-to-r from-yellow-500 to-amber-500"
                },
                { 
                  gradient: "from-rose-500 to-pink-500", 
                  bg: "bg-rose-50", 
                  border: "border-rose-200",
                  button: "bg-gradient-to-r from-rose-500 to-pink-500"
                }
              ];
              
              const colorScheme = colors[index % colors.length];
              
              // Consistent character limits for all cards
              const titleMaxLength = 60; // Characters for title
              const descriptionMaxLength = 120; // Characters for description
              
              return (
                <motion.div
                  key={card._id || index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  className={`${colorScheme.bg} rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ${colorScheme.border} border-2 group relative overflow-hidden h-full flex flex-col`}
                >
                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Image Section */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={card.image || '/placeholder-image.jpg'}
                      alt={card.title || 'Campaign'}
                      className="w-full h-44 sm:h-48 lg:h-52 object-cover rounded-t-2xl lg:rounded-t-3xl"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <motion.div
                      className={`absolute top-3 right-3 lg:top-4 lg:right-4 bg-gradient-to-r ${colorScheme.gradient} text-white px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg lg:rounded-xl shadow-lg backdrop-blur-sm`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="flex items-center space-x-1">
                        <Target className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>₹{(goal / 10000000).toFixed(2)} Cr</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6 lg:p-8 relative z-10 flex-grow flex flex-col">
                    {/* Title with consistent height and line wrapping */}
                    <h3 
                      className="text-lg sm:text-xl font-bold text-gray-800 mb-3 hover:underline cursor-pointer transition-colors duration-300 leading-tight min-h-[3.5rem] flex items-start"
                      onClick={() => {
                        if (card._id) {
                          router.push(`/causes/${card._id}`);
                        }
                      }}
                      title={card.title || 'Campaign'}
                    >
                      <span className="line-clamp-2">
                        {truncateText(card.title || 'Untitled Campaign', titleMaxLength)}
                      </span>
                    </h3>
                    
                    {/* Description with consistent height */}
                    <p className="text-sm sm:text-base text-gray-700 mb-4 lg:mb-6 leading-relaxed min-h-[4rem] flex items-start">
                      <span className="line-clamp-3">
                        {truncateText(card.description || 'No description available.', descriptionMaxLength)}
                      </span>
                    </p>

                    {/* Progress Section */}
                    <div className="mb-4 lg:mb-6 flex-shrink-0">
                      <div className="flex justify-between items-center mb-2 lg:mb-3">
                        <div className="flex items-center space-x-1 lg:space-x-2">
                          <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
                          <span className="text-base lg:text-lg font-bold text-gray-800">
                            {progressPercentage.toFixed(1)}%
                          </span>
                        </div>
                        <span className="text-xs lg:text-sm text-gray-600 font-medium">
                          Goal: ₹{(goal / 100000).toFixed(0)}L
                        </span>
                      </div>
                      
                      <div className="relative w-full h-2.5 lg:h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute top-0 left-0 h-2.5 lg:h-3 bg-gradient-to-r ${colorScheme.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        ></motion.div>
                      </div>
                      
                      <div className="text-xs lg:text-sm text-gray-600 mt-1.5 lg:mt-2 font-medium">
                        Raised: ₹{(raised / 100000).toFixed(0)}L
                      </div>
                    </div>

                    {/* Donate Button */}
                    <div className="mt-auto">
                      <motion.button
                        className={`w-full ${colorScheme.button} text-white py-3 lg:py-4 rounded-lg lg:rounded-xl text-sm lg:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (card._id) {
                            openModal(card._id);
                          }
                        }}
                        disabled={!card._id}
                      >
                        <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span>DONATE NOW</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Modal */}
        {isModalOpen && selectedCardId && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CampaignDonationForm
                setIsModalOpen={setIsModalOpen}
                cardId={selectedCardId}
                onClose={closeModal}
              />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Custom CSS for line clamping */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CampaignCards;