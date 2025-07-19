"use client"
import React, { useRef, useState, useEffect } from "react";
import {
  Users,
  Award,
  Star,
  Leaf,
  Book,
  Heart,
  Briefcase,
  Equal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Initiatives = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardsData = [
    {
      title: "Youth Empowerment",
      subtitle: "Unleashing potential through skills and leadership",
      bg: "from-blue-50 via-blue-100 to-indigo-100",
      border: "border-blue-200",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Skill Development",
        "Leadership Programs",
        "Job Placement Assistance",
        "Youth Advocacy",
      ],
    },
    {
      title: "Women Empowerment",
      subtitle: "Fostering financial, legal, and health independence",
      bg: "from-green-50 via-green-100 to-emerald-100",
      border: "border-green-200",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      icon: <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Economic Independence",
        "Education & Training",
        "Health & Wellness",
        "Legal Awareness",
      ],
    },
    {
      title: "Rural Empowerment",
      subtitle: "Transforming rural lives with opportunities",
      bg: "from-yellow-50 via-yellow-100 to-orange-100",
      border: "border-yellow-200",
      iconBg: "bg-gradient-to-br from-yellow-500 to-orange-500",
      icon: <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Agricultural Support",
        "Infrastructure Development",
        "Community Development",
        "Income Generation",
      ],
    },
    {
      title: "Environmental Help",
      subtitle: "Protecting our planet for future generations",
      bg: "from-green-50 via-green-100 to-lime-100",
      border: "border-green-200",
      iconBg: "bg-gradient-to-br from-green-600 to-lime-600",
      icon: <Leaf className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Conservation Projects",
        "Sustainable Practices",
        "Climate Change Awareness",
        "Waste Management",
      ],
    },
    {
      title: "Education Empowerment",
      subtitle: "Opening doors to learning and opportunity",
      bg: "from-indigo-50 via-indigo-100 to-purple-100",
      border: "border-indigo-200",
      iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
      icon: <Book className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Access to Quality Education",
        "Teacher Training",
        "Adult Literacy Programs",
        "Inclusive Education",
      ],
    },
    {
      title: "Health Empowerment",
      subtitle: "Promoting wellness, prevention, and mental health",
      bg: "from-red-50 via-red-100 to-pink-100",
      border: "border-red-200",
      iconBg: "bg-gradient-to-br from-red-500 to-pink-500",
      icon: <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Healthcare Access",
        "Health Education",
        "Disease Prevention and Control",
        "Mental Health Support",
      ],
    },
    {
      title: "Skill Development for Women",
      subtitle: "Unlocking financial freedom through practical skills",
      bg: "from-pink-50 via-pink-100 to-rose-100",
      border: "border-pink-200",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
      icon: <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Vocational Training",
        "Entrepreneurship",
        "Job Readiness",
        "Financial Literacy",
      ],
    },
    {
      title: "Tuition for Underprivileged Children",
      subtitle: "Supporting academic success for every child",
      bg: "from-sky-50 via-sky-100 to-cyan-100",
      border: "border-sky-200",
      iconBg: "bg-gradient-to-br from-sky-500 to-cyan-500",
      icon: <Book className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "One-on-One Tutoring",
        "Study Materials",
        "Progress Tracking",
        "Mentorship",
      ],
    },
    {
      title: "Empower Through Equality",
      subtitle: "Championing gender equality and human rights",
      bg: "from-violet-50 via-violet-100 to-fuchsia-100",
      border: "border-violet-200",
      iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
      icon: <Equal className="w-4 h-4 sm:w-6 sm:h-6 text-white" />,
      initiatives: [
        "Advocacy & Awareness",
        "Legal Aid",
        "Leadership Programs",
        "Safe Spaces",
      ],
    },
  ];

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      return () => scrollContainer.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: window.innerWidth < 640 ? -280 : -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: window.innerWidth < 640 ? 280 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white">
      <section className="py-12  px-4 sm:px-6 lg:px-8">
        <div className="max-w-9xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
              ✨ Transform Lives Together
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Facing Challenges? Join{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Jonojivan Garib Kalyan
              </span>
            </h2>
            <p className="text-sm sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              If you or your loved ones are struggling—whether with education,
              employment, health, or empowerment—be part of our mission. You may
              be eligible to receive support from our donation bank and
              life-changing programs.
            </p>
          </div>

          {/* Cards Section with Navigation */}
          <div className="relative">
            {/* Left Navigation Button */}
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
                canScrollLeft
                  ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
                canScrollRight
                  ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="overflow-x-auto mx-8 sm:mx-12"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="flex gap-3 sm:gap-6 min-w-max px-2 py-4">
                {cardsData.map((card, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-72 sm:w-80 lg:w-96 bg-gradient-to-br ${card.bg} rounded-xl sm:rounded-2xl p-5 sm:p-7 border ${card.border} hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group`}
                  >
                    {/* Icon */}
                    <div className={`${card.iconBg} p-3 sm:p-4 rounded-xl sm:rounded-2xl w-fit mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      {card.icon}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {card.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-gray-700 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed">
                      {card.subtitle}
                    </p>
                    
                    {/* Initiatives List */}
                    <ul className="space-y-1.5 sm:space-y-2">
                      {card.initiatives.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                          <span className="text-xs sm:text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-5">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Complete Application Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Initiatives;