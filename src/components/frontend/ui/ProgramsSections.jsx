"use client"
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
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
  Lightbulb
} from 'lucide-react';

const ProgramsSection = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

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

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            ...programStyles[styleIndex],
            // Create short description from description if it exists
            shortDesc: program.description 
              ? program.description.length > 100 
                ? program.description.substring(0, 100) + '...'
                : program.description
              : 'Learn more about this program',
            // If whatWeDo exists and is a string, use it as extended description
            extendedDescription: typeof program.whatWeDo === 'string' 
              ? program.whatWeDo 
              : program.description || 'This program is designed to make a positive impact in our community.'
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

  // Calculate max index properly
  const maxIndex = programs.length > 0 ? Math.max(0, programs.length - itemsPerView) : 0;

  const handlePrevious = () => {
    if (programs.length === 0) return;
    
    if (isMobile) {
      setCurrentIndex((prev) => prev === 0 ? programs.length - 1 : prev - 1);
    } else {
      setCurrentIndex((prev) => prev === 0 ? maxIndex : prev - 1);
    }
  };

  const handleNext = () => {
    if (programs.length === 0) return;
    
    if (isMobile) {
      setCurrentIndex((prev) => prev >= programs.length - 1 ? 0 : prev + 1);
    } else {
      setCurrentIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
    }
  };

  const handleProgramClick = (slug) => {
    console.log(`Navigating to: /program/${slug}`);
    window.location.href = `/program/${slug}`;
  };

  const getVisiblePrograms = () => {
    if (programs.length === 0) return [];
    
    if (isMobile) {
      return programs[currentIndex] ? [programs[currentIndex]] : [];
    }
    
    const endIndex = Math.min(currentIndex + itemsPerView, programs.length);
    return programs.slice(currentIndex, endIndex);
  };

  // Reset currentIndex when programs load or change
  useEffect(() => {
    if (programs.length > 0 && currentIndex >= programs.length) {
      setCurrentIndex(0);
    }
  }, [programs.length, currentIndex]);

  // Reset currentIndex when itemsPerView changes to prevent out-of-bounds
  useEffect(() => {
    if (programs.length > 0) {
      const newMaxIndex = Math.max(0, programs.length - itemsPerView);
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex);
      }
    }
  }, [itemsPerView, programs.length, currentIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Programs
            </h2>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-gray-600 mt-4">Loading our amazing programs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Programs</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">No Programs Available</h3>
            <p className="text-yellow-600">Check back later for new programs.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive programs designed to create lasting impact and transform communities
          </p>
        </div>

        {/* Programs Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {programs.length > itemsPerView && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-105 border border-gray-200"
                aria-label="Previous programs"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-105 border border-gray-200"
                aria-label="Next programs"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}

          {/* Programs Cards */}
          <div className="px-12">
            <div className={`grid gap-8 ${
              itemsPerView === 1 ? 'grid-cols-1' : 
              itemsPerView === 2 ? 'grid-cols-1 md:grid-cols-2' : 
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {getVisiblePrograms().map((program) => (
                <div
                  key={program._id || program.id}
                  onClick={() => handleProgramClick(program.slug)}
                  className={`${program.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${program.borderColor} border-2 group relative overflow-hidden cursor-pointer transform hover:scale-[1.02]`}
                >
                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Program Image */}
                  {program.image && (
                    <div className="mb-6 rounded-2xl overflow-hidden">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Icon - Show only if no image or image fails to load */}
                  {!program.image && (
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {program.icon}
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                      {program.title}
                    </h3>
                    
                    <p className="text-gray-600 font-medium mb-4">
                      {program.shortDesc}
                    </p>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">
                      {program.extendedDescription}
                    </p>                   

                    {/* Learn More Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Click to learn more</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {programs.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(programs.length / itemsPerView) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newIndex = index * itemsPerView;
                    const maxValidIndex = Math.max(0, programs.length - itemsPerView);
                    setCurrentIndex(Math.min(newIndex, maxValidIndex));
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? 'bg-blue-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;