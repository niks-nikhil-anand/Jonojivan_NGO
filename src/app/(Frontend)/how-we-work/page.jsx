"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Heart,
  FileText,
  Shield,
  Eye,
  Zap,
  Award,
  HandHeart,
  Search,
  CheckCircle,
  Users,
  BarChart3,
  MessageCircle,
  Target,
  Clock,
  TrendingUp,
  UserCheck,
  Handshake,
} from "lucide-react";
import CTABanner from "@/components/frontend/shared/CTABanner";

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const workingProcess = [
  {
    step: "1",
    title: "You Choose Your Cause",
    description:
      "Browse our verified projects and select the cause that resonates most with your heart and values.",
    icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-white/95",
    borderColor: "border-green-200",
  },
  {
    step: "2",
    title: "We Verify Every Need",
    description:
      "Our field team conducts thorough verification of beneficiaries and requirements before any fund allocation.",
    icon: <Search className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-white/95",
    borderColor: "border-green-200",
  },
  {
    step: "3",
    title: "Funds Are Allocated",
    description:
      "Your donation is immediately allocated to the verified project with complete documentation and tracking.",
    icon: <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-white/95",
    borderColor: "border-green-200",
  },
  {
    step: "4",
    title: "Direct Implementation",
    description:
      "Our trusted partners and volunteers work directly with beneficiaries to implement the solution effectively.",
    icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-white/95",
    borderColor: "border-green-200",
  },
  {
    step: "5",
    title: "Progress Monitoring",
    description:
      "Every step is monitored and documented with photos, videos, and progress reports for complete transparency.",
    icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-white/95",
    borderColor: "border-green-200",
  },
  {
    step: "6",
    title: "Impact Shared with You",
    description:
      "Receive detailed reports, photos, and stories showing exactly how your generosity created positive change.",
    icon: <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    color: "from-green-500 to-green-600",
    bgColor: "bg-white/95",
    borderColor: "border-green-200",
  },
];

const principles = [
  {
    title: "Transparency",
    description: "Complete visibility into fund utilization",
    icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Accountability",
    description: "Every rupee tracked and accounted for",
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Efficiency",
    description: "Maximum impact with minimal overhead",
    icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Trust",
    description: "Building lasting relationships with donors",
    icon: <HandHeart className="w-5 h-5 sm:w-6 sm:h-6" />,
    color: "from-green-500 to-green-600",
  },
];

const differentiators = [
  {
    title: "Real-Time Tracking",
    description:
      "Track your donation's journey from contribution to impact with our advanced monitoring system.",
    icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />,
  },
  {
    title: "Zero Administration Costs",
    description:
      "100% of your donation goes directly to beneficiaries. Our administrative costs are covered separately.",
    icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />,
  },
  {
    title: "Verified Beneficiaries",
    description:
      "Every recipient is personally verified by our field team to ensure authenticity and genuine need.",
    icon: <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />,
  },
  {
    title: "Impact Documentation",
    description:
      "Receive photos, videos, and detailed reports showing the exact impact of your contribution.",
    icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />,
  },
];

export default function HowWeWork() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
              <Settings className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              How We Work
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed opacity-95 px-2">
              Transparency, Accountability, and Maximum Impact - Every step of
              our process is designed to ensure your generosity creates lasting
              change.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Choose Your Project</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View Our Programs</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {/* Commitment Section */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100/50">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                Our Commitment to Transparency
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Every donation we receive is tracked by our administrative
                  officers for proper utilization. We believe in complete
                  transparency and accountability, ensuring that your generosity
                  creates the maximum possible impact in the lives of those who
                  need it most.
                </p>
                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl border border-green-100/50">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                    Your trust is our foundation. Every rupee is accounted for,
                    every impact is measured, and every story is shared.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 rounded-2xl p-6 sm:p-8 text-center border border-green-200/50">
                  <Eye className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Complete Transparency
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    From donation to impact, every step is monitored,
                    documented, and reported back to you with complete honesty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6-Step Process */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Our 6-Step Process
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From your donation to real-world impact - every step is
              transparent and accountable
            </p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {workingProcess.map((process, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                className={`${process.bgColor} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${process.borderColor} border-2 group relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Step Number */}
                <div
                  className={`absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${process.color} text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg`}
                >
                  {process.step}
                </div>

                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${process.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-white shadow-lg`}
                >
                  {process.icon}
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                    {process.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Core Principles */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Our Core Principles
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              The foundation of trust that guides every aspect of our work
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100/50"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${principle.color} rounded-lg sm:rounded-xl mb-3 sm:mb-4 text-white`}
                >
                  {principle.icon}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100/50">
            <div className="text-center mb-8 sm:mb-12">
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-[#e91e63] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                What Makes Us Different
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">
                Our unique approach ensures maximum impact and complete
                transparency
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-br from-gray-50/80 to-green-50/80 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100/50"
                >
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Impact Tracking Stats */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              Your Impact, Tracked & Verified
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Real numbers, real impact, real transparency
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100/50">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                Fund Utilization
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Every rupee goes directly to beneficiaries
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100/50">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                Monitoring
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Continuous oversight and tracking
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100/50 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#e91e63] to-pink-600 bg-clip-text text-transparent mb-2">
                Real
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                Impact Reports
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Detailed feedback on your contribution
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <CTABanner
          heading={"Join Us in Making a Lasting Impact"}
          paragraph={
            "Together, we’re embracing innovation and fresh approaches to solve evolving challenges and create real, lasting change."
          }
        />
      </div>
    </div>
  );
}
