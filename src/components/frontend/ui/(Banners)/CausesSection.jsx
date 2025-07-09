"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Handshake,
  GraduationCap,
  School,
  HeartHandshake,
  Scale,
  Shield,
  Rocket,
  Venus,
  Tractor,
  Leaf,
  HeartPulse,
  Heart,
  Users,
} from "lucide-react";

import CallToAction from "../CallToAction";

const CausesSection = () => {
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const causes = [
    {
      title: "Youth Empowerment",
      shortDesc: "Unleashing potential through skills and leadership",
      description:
        "We empower young individuals through skill development, leadership programs, job placement, and advocacy—nurturing a generation of confident, capable, and responsible leaders.",
      icon: <Rocket className="w-8 h-8" />,
      features: [
        "Skill Development",
        "Leadership Programs",
        "Job Placement Assistance",
        "Youth Advocacy",
      ],
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Women Empowerment",
      shortDesc: "Fostering financial, legal, and health independence",
      description:
        "Support women's financial independence, access to education, legal rights, and health awareness—paving the way for gender equity and self-sufficient communities.",
      icon: <Venus className="w-8 h-8" />,
      features: [
        "Economic Independence",
        "Education & Training",
        "Health & Wellness",
        "Legal Awareness",
      ],
      color: "from-pink-500 to-fuchsia-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
    },
    {
      title: "Rural Empowerment",
      shortDesc: "Transforming rural lives with opportunities",
      description:
        "Enhance the quality of rural life by supporting agriculture, developing infrastructure, enabling diverse income opportunities, and building strong, self-reliant communities.",
      icon: <Tractor className="w-8 h-8" />,
      features: [
        "Agricultural Support",
        "Infrastructure Development",
        "Community Development",
        "Income Generation",
      ],
      color: "from-green-600 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Environmental Help",
      shortDesc: "Protecting our planet for future generations",
      description:
        "Join us in conserving nature through restoration projects, promoting sustainable living, spreading climate awareness, and implementing effective waste management systems.",
      icon: <Leaf className="w-8 h-8" />,
      features: [
        "Conservation Projects",
        "Sustainable Practices",
        "Climate Change Awareness",
        "Waste Management",
      ],
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      title: "Education Empowerment",
      shortDesc: "Opening doors to learning and opportunity",
      description:
        "Help us ensure inclusive, equitable, and quality education for all by supporting schools, teacher training, adult literacy, and education for children with disabilities.",
      icon: <GraduationCap className="w-8 h-8" />,
      features: [
        "Access to Quality Education",
        "Teacher Training",
        "Adult Literacy Programs",
        "Inclusive Education",
      ],
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      title: "Health Empowerment",
      shortDesc: "Promoting wellness, prevention, and mental health",
      description:
        "Support healthcare access in underserved regions, educate communities on preventive health, and promote physical and mental well-being for all.",
      icon: <HeartPulse className="w-8 h-8" />,
      features: [
        "Healthcare Access",
        "Health Education",
        "Disease Prevention and Control",
        "Mental Health Support",
      ],
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
    {
      title: "Skill Development for Women",
      shortDesc: "Unlocking financial freedom through practical skills",
      description:
        "Equip women with in-demand skills and resources to achieve independence, uplift families, and transform communities.",
      icon: <Handshake className="w-8 h-8" />,
      features: [
        "Vocational Training",
        "Entrepreneurship",
        "Job Readiness",
        "Financial Literacy",
      ],
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
      features: [
        "One-on-One Tutoring",
        "Study Materials",
        "Progress Tracking",
        "Mentorship",
      ],
      color: "from-blue-500 to-sky-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Empower Through Equality",
      shortDesc: "Championing gender equality and human rights",
      description:
        "Support our efforts to advance gender equality and empower women to lead and thrive in all aspects of life.",
      icon: <HeartHandshake className="w-8 h-8" />,
      features: [
        "Advocacy & Awareness",
        "Legal Aid",
        "Leadership Programs",
        "Safe Spaces",
      ],
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
    {
      title: "Human Rights Protection",
      shortDesc: "Defending fundamental human rights for all",
      description:
        "Incorporating human rights principles into community development, ensuring dignity and justice for every individual in accordance with international standards.",
      icon: <Scale className="w-8 h-8" />,
      features: [
        "Rights Awareness",
        "Legal Support",
        "Community Advocacy",
        "Policy Reform",
      ],
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      title: "Anti-Corruption Initiatives",
      shortDesc: "Building transparency and accountability",
      description:
        "Promoting transparency and fighting corruption through preventive measures, community education, and accountability frameworks.",
      icon: <Shield className="w-8 h-8" />,
      features: [
        "Transparency Programs",
        "Whistleblower Protection",
        "Community Monitoring",
        "Ethical Training",
      ],
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
  ];

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
          <p className="text-blue-600 font-medium text-lg mb-4 tracking-wide">
            Making a Difference Together
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
            Jonojivan Foundation Impact Areas
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
            Transforming lives through targeted interventions that address the
            root causes of poverty and inequality
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
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group relative overflow-hidden p-6"
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${cause.color} rounded-2xl mb-6 text-white shadow-lg`}
              >
                {cause.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
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
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Key Initiatives:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cause.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${cause.color} rounded-full mr-2`}
                        ></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <CallToAction/>
      </div>
      
    </div>
  );
};

export default CausesSection;
