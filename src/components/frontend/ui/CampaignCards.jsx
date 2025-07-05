"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Heart, Target, TrendingUp, Eye, ArrowRight } from "lucide-react";
import CampaignDonationForm from "./CampaignDonationForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Skeleton Loading Component
  const CampaignSkeleton = () => (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-12 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return <CampaignSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white px-6 py-3 rounded-full font-bold hover:from-blue-700 hover:via-blue-600 hover:to-sky-600 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Content - Centered at the top */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-600 font-medium text-lg mb-4 tracking-wide">
            Dignity, Opportunity, Hope
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Our Active Campaigns
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Join us in making a real difference. Every contribution counts towards building a better tomorrow for our community.
          </p>
        </motion.div>

        {/* Campaign Cards Grid - Below the content */}
        {cardsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No campaigns available at the moment.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cardsData.slice(0, 3).map((card, index) => {
              // Safely calculate progress with fallback values
              const goal = card.goal || 1;
              const raised = card.raised || 0;
              const progressPercentage = Math.min((raised / goal) * 100, 100);
              
              // Consistent character limits for all cards
              const titleMaxLength = 60;
              const descriptionMaxLength = 120;
              
              return (
                <motion.div
                  key={card._id || index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group relative overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (card._id) {
                      router.push(`/causes/${card._id}`);
                    }
                  }}
                >
                  {/* Background Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={card.image || '/placeholder-image.jpg'}
                      alt={card.title || 'Campaign'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    
                    {/* Goal Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>₹{(goal / 10000000).toFixed(2)} Cr</span>
                      </div>
                    </div>
                    
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {truncateText(card.title || 'Untitled Campaign', titleMaxLength)}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {truncateText(card.description || 'No description available.', descriptionMaxLength)}
                    </p>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-gray-600" />
                          <span className="text-base font-bold text-gray-800">
                            {progressPercentage.toFixed(1)}%
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                          Goal: ₹{(goal / 100000).toFixed(0)}L
                        </span>
                      </div>
                      
                      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        ></motion.div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mt-2 font-medium">
                        Raised: ₹{(raised / 100000).toFixed(0)}L
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 mb-4"></div>

                    {/* Donate Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Heart className="w-4 h-4" />
                        <span>Make a difference</span>
                      </div>
                      
                      <motion.button
                        className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:from-blue-700 hover:via-blue-600 hover:to-sky-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (card._id) {
                            openModal(card._id);
                          }
                        }}
                      >
                        <span>DONATE</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View All Button at the bottom */}
        {cardsData.length > 3 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/campaigns">
                <button className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-700 hover:via-blue-600 hover:to-sky-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto border-2 border-transparent hover:border-blue-300">
                  <Heart className="w-5 h-5" />
                  <span>VIEW ALL CAMPAIGNS</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
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