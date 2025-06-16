"use client"
import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Heart, 
  BookOpenCheck,
  School,
  Handshake,
  Users,
  HeartHandshake,
} from "lucide-react";

const CausesSection = () => {
const causes = [
  {
    title: "Girl Child Education",
    shortDesc: "Empowering girls to dream, learn, and lead",
    description:
      "Your donation empowers girls to rise above their circumstances through access to education, creating a future full of possibilities.",
    icon: <BookOpenCheck className="w-8 h-8" />,
    features: ["Educational Support", "Mentorship Programs", "Scholarships", "Safe Learning Spaces"],
    color: "from-pink-500 to-fuchsia-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    title: "Skill Development for Women",
    shortDesc: "Unlocking financial freedom through practical skills",
    description:
      "Equip women with in-demand skills and resources to achieve independence, uplift families, and transform communities.",
    icon: <Handshake className="w-8 h-8" />,
    features: ["Vocational Training", "Entrepreneurship", "Job Readiness", "Financial Literacy"],
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    title: "Tuition for Underprivileged Children",
    shortDesc: "Supporting academic success for every child",
    description:
      "Help children excel in their studies through personalized tuition classes, mentorship, and educational tools.",
    icon: <GraduationCap className="w-8 h-8" />,
    features: ["One-on-One Tutoring", "Study Materials", "Progress Tracking", "Mentorship"],
    color: "from-blue-500 to-sky-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Build a School",
    shortDesc: "Creating safe and inspiring learning spaces",
    description:
      "Your contribution helps construct and maintain schools that offer holistic, inclusive, and quality education.",
    icon: <School className="w-8 h-8" />,
    features: ["Infrastructure Development", "Inclusive Classrooms", "Community Engagement", "Smart Learning"],
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    title: "Empower Through Equality",
    shortDesc: "Championing gender equality and human rights",
    description:
      "Support our efforts to advance gender equality and empower women to lead and thrive in all aspects of life.",
    icon: <HeartHandshake className="w-8 h-8" />,
    features: ["Advocacy & Awareness", "Legal Aid", "Leadership Programs", "Safe Spaces"],
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
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

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-emerald-600 font-medium text-lg mb-4 tracking-wide">
            Making a Difference Together
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Our Impact Areas
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Transforming lives through targeted interventions that address the root causes of poverty and inequality
          </p>
        </motion.div>

        {/* Main Causes Cards */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {causes.map((cause, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group relative overflow-hidden p-6"
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${cause.color} rounded-2xl mb-6 text-white shadow-lg`}>
                {cause.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {cause.title}
                </h3>
                
                <p className="text-gray-600 font-medium mb-4 leading-relaxed">
                  {cause.shortDesc}
                </p>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {cause.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Key Initiatives:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cause.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 bg-gradient-to-r ${cause.color} rounded-full mr-2`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-3xl p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Your contribution can transform lives and build stronger communities. Join us in creating lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>Donate Now</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Volunteer</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CausesSection;