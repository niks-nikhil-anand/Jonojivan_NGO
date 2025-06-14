"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/admin/dashboard/blog`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/blog/${id}`);
  };

  // Function to extract text from content and limit words
  const getContentPreview = (content, wordLimit = 20) => {
    if (!content) return "";
    
    let textContent = "";
    
    // Handle different content types
    if (typeof content === 'string') {
      // If content is HTML string, strip HTML tags
      textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    } else if (typeof content === 'object') {
      // If content is an object (like rich text editor output)
      if (content.text) {
        textContent = content.text;
      } else if (content.blocks) {
        // Handle block-based content (like EditorJS)
        textContent = content.blocks
          .filter(block => block.type === 'paragraph' || block.type === 'text')
          .map(block => block.data?.text || '')
          .join(' ');
      } else {
        // Try to stringify and extract text
        textContent = JSON.stringify(content).replace(/[{}"\[\]]/g, ' ');
      }
    }
    
    const words = textContent.split(' ').filter(word => word.length > 0);
    return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
  };

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
  const BlogSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto" />
        </div>

        {/* Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
              {/* Square Image Skeleton */}
              <Skeleton className="w-full aspect-square" />
              
              {/* Content Skeleton */}
              <div className="p-8">
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="text-center">
          <Skeleton className="h-12 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-80 mx-auto" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Stories of Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the latest stories, campaigns, and causes that showcase how your support creates lasting change
          </p>
        </motion.div>

        {/* Articles Grid - Updated for Square Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.slice(0, 6).map((article, index) => (
            <motion.div
              key={article._id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group relative overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(article._id)}
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Square Image Section */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>
                
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-base line-clamp-3">
                  {getContentPreview(article.content, 18)}
                </p>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 mx-auto group"
            >
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>View All Stories</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
          
          <p className="text-gray-600 mt-4 text-sm">
            Discover more inspiring stories and updates from our community
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogSection;