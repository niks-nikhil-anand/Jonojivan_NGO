"use client"
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpenCheck,
  School,
  Handshake,
  Users,
  HeartHandshake,
  Target,
  Globe,
  Lightbulb,
  Heart,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ProgramsSection = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default program styling configurations
  const programStyles = [
    {
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200',
      color: 'from-blue-500 to-indigo-600',
      icon: <GraduationCap className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      borderColor: 'border-green-200',
      color: 'from-green-500 to-emerald-600',
      icon: <BookOpenCheck className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
      borderColor: 'border-purple-200',
      color: 'from-purple-500 to-violet-600',
      icon: <School className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-100',
      borderColor: 'border-orange-200',
      color: 'from-orange-500 to-amber-600',
      icon: <Handshake className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-100',
      borderColor: 'border-pink-200',
      color: 'from-pink-500 to-rose-600',
      icon: <Users className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-100',
      borderColor: 'border-teal-200',
      color: 'from-teal-500 to-cyan-600',
      icon: <HeartHandshake className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-red-50 to-rose-100',
      borderColor: 'border-red-200',
      color: 'from-red-500 to-rose-600',
      icon: <Target className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-100',
      borderColor: 'border-indigo-200',
      color: 'from-indigo-500 to-blue-600',
      icon: <Globe className="w-8 h-8" />
    },
    {
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-100',
      borderColor: 'border-yellow-200',
      color: 'from-yellow-500 to-orange-600',
      icon: <Lightbulb className="w-8 h-8" />
    }
  ];

  // Function to truncate text to specific character limit
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/admin/dashboard/program');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched programs:', data.data);
        
        // Enhanced programs with styling
        const enhancedPrograms = data.data.map((program, index) => {
          const styleIndex = index % programStyles.length;
          return {
            ...program,
            ...programStyles[styleIndex]
          };
        });
        
        setPrograms(enhancedPrograms);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError('Failed to load programs. Please try again later.');
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleProgramClick = (slug) => {
    console.log(`Navigating to: /program/${slug}`);
    window.location.href = `/program/${slug}`;
  };

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
  const ProgramSkeleton = () => (
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
                <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <ProgramSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:from-green-700 hover:via-green-600 hover:to-emerald-600 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No programs available at the moment.</p>
          </div>
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
          <p className="text-emerald-600 font-medium text-lg mb-4 tracking-wide">
            Empowerment, Growth, Impact
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Our Programs
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Discover our comprehensive programs designed to create lasting impact and transform communities through education, support, and empowerment.
          </p>
        </motion.div>

        {/* Programs Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {programs.slice(0, 3).map((program, index) => {
            // Consistent character limits for all cards
            const titleMaxLength = 60;
            const descriptionMaxLength = 120;
            
            return (
              <motion.div
                key={program.id || index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group relative overflow-hidden cursor-pointer"
                onClick={() => handleProgramClick(program.slug)}
              >
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Image Section */}
                <div className="relative overflow-hidden h-64">
                  {program.image ? (
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        {program.icon}
                        <p className="mt-2 text-sm">No Image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Program Type Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-4 h-4" />
                      <span>Program</span>
                    </div>
                  </div>
                  
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {truncateText(program.title || 'Untitled Program', titleMaxLength)}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {truncateText(program.description || 'This program is designed to make a positive impact in our community.', descriptionMaxLength)}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 mb-4"></div>

                  {/* Learn More Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span>Learn & Engage</span>
                    </div>
                    
                    <motion.button
                      className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:from-green-700 hover:via-green-600 hover:to-emerald-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleProgramClick(program.slug);
                      }}
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button at the bottom */}
        {programs.length > 3 && (
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
              <Link href="/programs">
                <button className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-green-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto border-2 border-transparent hover:border-emerald-300">
                  <Eye className="w-5 h-5" />
                  <span>VIEW ALL PROGRAMS</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
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

export default ProgramsSection;