"use client";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  Heart, 
  DollarSign, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target
} from "lucide-react";

const OrganizationInfo = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      number: 6478,
      suffix: "",
      title: "Volunteers in 2020",
      description: "Dedicated changemakers",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-sky-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      number: 2348195,
      suffix: "",
      title: "People Helped in 2020",
      description: "Lives transformed",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      number: 16,
      suffix: "M",
      title: "Funds Collected",
      description: "Resources mobilized",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    }
  ];

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

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={sectionRef} className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4 relative overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/frontend/Banners/childInSchool.jpg"
          alt="Organization Banner"
          layout="fill"
          objectFit="cover"
          quality={75}
          className="z-0"
          priority
        />
        {/* Multi-layered Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/70 to-indigo-100/60 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Stats Section */}
          <motion.div 
            className="w-full lg:w-2/5"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Section Header */}
            <motion.div 
              className="text-center lg:text-left mb-12"
              variants={cardVariants}
            >
              <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                <TrendingUp className="w-4 h-4 text-white mr-2" />
                <span className="text-white font-semibold text-sm uppercase tracking-wide">
                  Our Impact
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Creating Measurable Change
              </h3>
            </motion.div>

            {/* Stats Cards */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  className={`${stat.bgColor} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 ${stat.borderColor} border-2 group relative overflow-hidden`}
                >
                  {/* Background Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="flex items-center space-x-4 relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl text-white shadow-lg`}>
                      {stat.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-1">
                        {inView && (
                          <motion.div
                            className="text-3xl lg:text-4xl font-bold text-gray-800"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                          >
                            {stat.title.includes("Funds") && "₹"}
                            <CountUp 
                              start={0} 
                              end={stat.number} 
                              duration={2.5} 
                              separator="," 
                              suffix={stat.suffix}
                            />
                          </motion.div>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 mt-1">
                        {stat.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="w-full lg:w-3/5"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mission Badge */}
            <motion.div 
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Target className="w-4 h-4 text-white mr-2" />
              <span className="text-white font-semibold text-sm uppercase tracking-wide">
                Empowering Lives Through Quality Education
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bring Smiles, Build Futures
            </motion.h1>

            {/* Description */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Bring Smile Foundation is a movement of hope and empowerment, transforming lives through education in Bihar&apos;s underprivileged regions, where poverty and discrimination often overshadow dreams.
              </p>
              
              {/* Additional Context */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-start space-x-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Our Mission</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We believe every child deserves access to quality education, regardless of their background. Through innovative programs and community partnerships, we&apos;re breaking barriers and creating pathways to success.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <Link href="/aboutUs">
              <motion.button
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { label: "Years Active", value: "10+" },
                { label: "Districts Covered", value: "25+" },
                { label: "Success Rate", value: "95%" }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                  <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;