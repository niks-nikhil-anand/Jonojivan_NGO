"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Eye, Share2, User, MessageCircle, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // Track how many articles to show
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state for load more

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

  const handleShare = (e, article) => {
    e.stopPropagation();
    // Add share functionality here
    console.log('Share article:', article);
  };

  // Handle load more functionality
  const handleLoadMore = async () => {
    setLoadingMore(true);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setVisibleCount(prev => prev + 3);
    setLoadingMore(false);
  };

  // Handle show less functionality
  const handleShowLess = () => {
    setVisibleCount(3);
    // Smooth scroll to blog section
    const blogSection = document.getElementById('blog-section');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-6 w-48 mx-auto mb-4" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <Skeleton className="w-full h-64" />
              <div className="p-6">
                <Skeleton className="h-6 w-full mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <BlogSkeleton />;
  }

  // Get visible articles
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

  return (
    <div id="blog-section" className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Content - Centered at the top */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-600 font-medium text-lg mb-4 tracking-wide">
            News & articles
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Directly from the latest news and articles
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Explore the latest stories, campaigns, and causes that showcase how your support creates lasting change in our community.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {visibleArticles.map((article, index) => (
            <motion.div
              key={article._id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group relative overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(article._id)}
              onMouseEnter={() => setHoveredCard(article._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image Section */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit"
                  })}
                </div>

                {/* Share Button */}
                <motion.button
                  className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all duration-300 ${
                    hoveredCard === article._id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  onClick={(e) => handleShare(e, article)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-4 h-4 text-gray-700" />
                </motion.button>
                
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-6 relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {getContentPreview(article.content, 18)}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-200 mb-4"></div>

                {/* Read More Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                  
                  <motion.div 
                    className="flex items-center space-x-2 text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm">Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More / Show Less Buttons - Only show if there are articles */}
        {articles.length > 0 && (
          <motion.div 
            className="text-center mt-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Load More Button - Only show if there are more than 3 articles and not all are visible */}
            {articles.length > 3 && hasMoreArticles && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-green-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto border-2 border-transparent hover:border-emerald-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>LOADING...</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-5 h-5" />
                      <span>VIEW MORE STORIES</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Show Less Button - Only show if more than 3 articles are visible */}
            {visibleCount > 3 && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button 
                  onClick={handleShowLess}
                  className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto border-2 border-transparent hover:border-gray-300"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>SHOW LESS</span>
                </button>
              </motion.div>
            )}

            {/* Articles Counter - Only show if there are more than 3 articles */}
            {articles.length > 3 && (
              <div className="text-sm text-gray-500 mt-4">
                Showing {Math.min(visibleCount, articles.length)} of {articles.length} articles
              </div>
            )}

            {/* Visit Full Blog Button - Only shown when all articles are loaded and there are more than 3 */}
            {articles.length > 3 && visibleCount >= articles.length && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pt-4"
              >
                <Link href="/blog">
                  <button className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto border-2 border-transparent hover:border-emerald-300">
                    <Eye className="w-4 h-4" />
                    <span>VISIT FULL BLOG</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            )}
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

export default BlogSection;