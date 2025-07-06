"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Target,
  BookOpen,
  Handshake,
  Eye,
  Scale,
  TrendingUp,
  Globe,
  Building,
  UserCheck,
  Lightbulb,
  Truck,
  ShoppingCart,
  AlertTriangle,
  Check,
} from "lucide-react";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const focusAreas = [
    {
      title: "Human Rights Advocacy",
      description:
        "We work to incorporate and protect human rights as outlined in the Human Rights Act 1998, ensuring equal rights and dignity for all individuals in our communities.",
      icon: <Scale className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-white/95",
      borderColor: "border-blue-200",
    },
    {
      title: "Anti-Corruption Initiatives",
      description:
        "We expose corruption in tender processes and public procurement, implementing both preventive and reactive measures to ensure transparency and accountability.",
      icon: <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-white/95",
      borderColor: "border-blue-200",
    },
  ];

  const impacts = [
    "Exposing tender fixing and saving millions in public funds",
    "Implementing preventive anti-corruption measures across sectors",
    "Protecting human rights and ensuring equal access to justice",
    "Monitoring e-commerce practices for consumer protection",
    "Building transparent governance systems in communities",
  ];

  const values = [
    {
      title: "Transparency",
      description:
        "We believe in open governance and accountability in all public and private sectors.",
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Human Rights",
      description:
        "We champion the protection of fundamental human rights for all individuals.",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Justice",
      description:
        "We work to ensure equal access to justice and fair treatment for all.",
      icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Innovation",
      description: "We use modern approaches to combat corruption and protect rights.",
      icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700 text-white py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
              <Shield className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Jonojivan Foundation
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed opacity-95 px-2">
              Protecting Human Rights, Fighting Corruption, and Ensuring Transparency in E-commerce and Logistics
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Support Our Mission</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Partner With Us</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {/* About Section */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100/50">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                About Our Mission
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Jonojivan Foundation is dedicated to upholding human rights, fighting corruption, and ensuring transparency across various sectors. Our work is grounded in the principles of the Human Rights Act 1998, which aims to incorporate fundamental rights into law and practice.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  We operate as an anti-corruption body that exposes tender fixing, saves public funds, and implements comprehensive anti-bribery measures. Our scope includes both preventive strategies and reactive responses to corruption in e-commerce, logistics, and public procurement.
                </p>
                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100/50">
                  <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                    Our anti-corruption efforts vary in scope and strategy, but all are unified by our commitment to transparency, accountability, and the protection of fundamental human rights.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 rounded-2xl p-6 sm:p-8 text-center border border-blue-200/50">
                  <Target className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Fighting Corruption & Protecting Rights
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    We expose corruption in tender processes while ensuring that human rights are protected and incorporated into all aspects of governance and business operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Our Focus Areas
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive Approach to Rights Protection and Anti-Corruption
            </p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                className={`${area.bgColor} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${area.borderColor} border-2 group relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${area.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-white shadow-lg`}
                >
                  {area.icon}
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                    {area.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100/50">
            <div className="text-center mb-8 sm:mb-12">
              <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                The Impact of Our Work
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">
                Creating transparency and protecting rights across multiple sectors
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Measurable Results
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {impacts.map((impact, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-100/50">
                <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Our Methodology
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                  We implement both preventive and reactive anti-corruption measures. Our preventive approach includes transparency initiatives, while our reactive measures involve investigating and exposing corruption when it occurs.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  In e-commerce and logistics, we monitor practices to ensure fair operations and protect consumer rights, while maintaining oversight of public procurement processes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Our Mission & Values
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
              Incorporating human rights principles while fighting corruption across all sectors
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl mb-6 sm:mb-8 border border-gray-100/50">
            <div className="max-w-4xl mx-auto text-center">
              <Building className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Our mission is to ensure the rights contained in the European Convention on Human Rights are incorporated into practice while combating corruption through comprehensive anti-bribery measures. We work to create transparent systems in e-commerce, logistics, and public procurement that protect both individual rights and public resources.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100/50"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${value.color} rounded-lg sm:rounded-xl mb-3 sm:mb-4 text-white`}
                >
                  {value.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-xl">
            <Check className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              Building a Transparent Future
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed opacity-95">
              At Jonojivan Foundation, we combine human rights advocacy with anti-corruption efforts to create transparent systems that protect both individual rights and public resources across e-commerce, logistics, and governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Join Our Mission</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Learn More</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;