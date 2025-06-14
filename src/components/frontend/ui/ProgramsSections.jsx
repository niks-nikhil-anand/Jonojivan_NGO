"use client"
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Heart,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProgramsSection = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/dashboard/program');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data.data)
        setPrograms(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError('Failed to load programs');
       
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, programs.length - 3) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= programs.length - 3 ? 0 : prev + 1
    );
  };

  const handleProgramClick = (slug) => {
    window.location.href = `/program/${slug}`;
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section Loading */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
          <div className="flex space-x-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 h-96 bg-gray-200 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Unable to Load Programs</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
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
            Discover our impactful programs designed to create lasting change in communities. Each initiative is carefully crafted to address specific needs and empower those we serve.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content Section */}
          <div className="lg:w-2/5 text-center lg:text-left">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              How do you want to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                help children
              </span>{' '}
              today?
            </h3>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
              Your smallest contribution makes a big difference to children's lives. We count on the 
              generosity of people like you to be able to create real change for India's children!
            </p>
            
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 mx-auto lg:mx-0"
            >
              <Heart className="w-5 h-5" />
              <span>Donate For Happier Childhoods!</span>
            </Button>
          </div>

          {/* Right Carousel Section */}
          <div className="lg:w-3/5 relative">
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full transition-all duration-300"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full transition-all duration-300"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </Button>

            {/* Carousel Container */}
            <div className="overflow-hidden px-12">
              <div
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 33.333}%)`
                }}
              >
                {programs.map((program, index) => (
                  <div
                    key={program.id}
                    className="flex-shrink-0 w-80 cursor-pointer group hover:-translate-y-2 transition-transform duration-300"
                    onClick={() => handleProgramClick(program.slug)}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                      
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={program.image || '/api/placeholder/320/192'}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        
                        {/* Icon Badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 text-white shadow-lg">
                          <Calendar className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold text-sm tracking-wider mb-2">
                          PROGRAM
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-tight">
                          {program.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {program.description}
                        </p>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {programs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;