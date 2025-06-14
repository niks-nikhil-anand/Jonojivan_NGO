"use client"
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Heart, 
  Users, 
  Target,
  BookOpen,
  Handshake,
  Shield,
  GraduationCap,
  TrendingUp,
  Globe,
  Building,
  UserCheck,
  Lightbulb
} from "lucide-react";

const AboutPage = () => {
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

  const focusAreas = [
    {
      title: "Bloomfield International School, Ara",
      description: "Our flagship project provides high-quality education to children from marginalized communities. We offer a safe, nurturing, and empowering environment for success academically, socially, and emotionally.",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "from-blue-500 to-sky-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Skill Development Programs for Women",
      description: "We provide skill development programs to empower women and girls, enabling them to become financially independent and confident leaders in their communities.",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Outreach and Community Support",
      description: "We work directly with families and local communities to raise awareness about education, gender equality, and women's rights, ensuring accessibility and impact.",
      icon: <Users className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    }
  ];

  const impacts = [
    "Girls are going to school, breaking traditional barriers to education",
    "Women are gaining financial independence through vocational training",
    "Communities are transforming with a growing understanding of education and equality",
    "Vulnerable families are becoming financially independent through skill development",
    "Children are breaking free from the cycle of poverty and illiteracy"
  ];

  const values = [
    {
      title: "Education First",
      description: "We believe education is the foundation of empowerment and social change.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Gender Equality",
      description: "We champion equal rights and opportunities for women and girls.",
      icon: <Shield className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Community Focus",
      description: "We work directly with communities to create lasting change.",
      icon: <Heart className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500"
    },
    {
      title: "Innovation",
      description: "We adapt new techniques and approaches for greater impact.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Plan to Empower
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              We seek to safeguard the rights of women and children through advocacy, education, and empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>Donate Now</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Handshake className="w-5 h-5" />
                <span>Partner With Us</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* About Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                About Our Mission
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Plan to Empower is a non-profit organization dedicated to promoting child welfare and women&apos;s rights in India. We work to ensure that families thrive in environments that are safe, healthy, nurturing, and productive.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We at Plan to Empower work to make a world of happiness, tolerance, social equality, dignity and security where poverty and illiteracy has no role to play. We work to educate children, empower women by educating them and making them financially independent, eradicate poverty and achieve a socially balanced lifeline.
                </p>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <Heart className="w-8 h-8 text-blue-600" />
                  <p className="text-gray-700 font-medium">
                    Our team works days and nights to have a happy and balanced world around us, providing equal opportunities to all. We work like dedicated professionals but from the core of our heart.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
                  <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Empowering People Out of Poverty
                  </h3>
                  <p className="text-gray-700">
                    We put women and girls at the center because today they are in the most desperate and vulnerable condition and lack very basic necessities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Focus Areas */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering Communities Across Bihar Through Targeted Interventions
            </p>
          </div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8"
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
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
                className={`${area.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${area.borderColor} border-2 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${area.color} rounded-2xl mb-6 text-white shadow-lg`}>
                  {area.icon}
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {area.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-12">
              <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                The Impact of Our Work
              </h2>
              <p className="text-xl text-gray-600">
                Creating lasting change in communities across Bihar
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Transforming Lives
                </h3>
                <div className="space-y-4">
                  {impacts.map((impact, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <Globe className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Our Approach
                </h3>
                <p className="text-gray-700 mb-4">
                  We work with girls and women in rural areas, urban slums, factories, and businesses to uplift their livelihoods. In our skill centers, we facilitate and train women and girls to learn different skills and provide assistance to make them financially independent.
                </p>
                <p className="text-gray-700">
                  Together, we can expand our reach, touch more lives, and continue to build a future where every child and woman has the opportunity to thrive.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To reach the un-reached, underprivileged, deprived and disadvantaged people in rural and urban India
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8">
            <div className="max-w-4xl mx-auto text-center">
              <Building className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed">
                The mission of Plan to Empower is to reach the un-reached, underprivileged, deprived and disadvantaged people in the rural and urban population of India, who are either totally unsaved, underserved or at best inappropriately served with regards to health, education & other needs for better living.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl mb-4 text-white`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold mb-4">
              Join Us in Making a Lasting Impact
            </h3>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              The world changes, problems become more complicated every day. We are learning from new techniques, approaches and innovations that can enhance our ability to create greater impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>💖 Donate Now</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Handshake className="w-5 h-5" />
                <span>💖 Partner With Us</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;