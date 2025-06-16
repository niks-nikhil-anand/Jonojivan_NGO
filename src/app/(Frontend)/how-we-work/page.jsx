"use client"
import React from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Eye, 
  Users, 
  TrendingUp, 
  Mail, 
  CheckCircle,
  ArrowRight,
  Settings,
  FileText,
  Target,
  Shield,
  Zap,
  Award,
  MonitorSpeaker
} from "lucide-react";

const HowWeWork = () => {
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

  const workingProcess = [
    {
      step: 1,
      title: "Choose Your Project",
      description: "Browse our various programs and select the project you want to support. Each project clearly outlines its goals, beneficiaries, and impact.",
      icon: <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-blue-500 to-sky-500",
      bgColor: "bg-blue-50/80",
      borderColor: "border-blue-200/60"
    },
    {
      step: 2,
      title: "Make Your Donation",
      description: "Donate securely for your chosen project. Every rupee is tracked from the moment it reaches us to ensure complete transparency.",
      icon: <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50/80",
      borderColor: "border-green-200/60"
    },
    {
      step: 3,
      title: "Administrative Tracking",
      description: "Our administrative officers immediately log your donation and assign it to the specific project you've chosen for proper utilization.",
      icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50/80",
      borderColor: "border-yellow-200/60"
    },
    {
      step: 4,
      title: "Volunteer Implementation",
      description: "Our dedicated volunteers ensure that 100% of your donation amount is utilized for the direct benefit of the intended beneficiary.",
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50/80",
      borderColor: "border-purple-200/60"
    },
    {
      step: 5,
      title: "Continuous Monitoring",
      description: "The entire process is continuously monitored by our administrative officers to ensure accountability and proper fund utilization.",
      icon: <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50/80",
      borderColor: "border-red-200/60"
    },
    {
      step: 6,
      title: "Impact Report",
      description: "You receive a detailed feedback report via email showing the real impact you've made in the life of a deprived person or family.",
      icon: <Mail className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50/80",
      borderColor: "border-indigo-200/60"
    }
  ];

  const principles = [
    {
      title: "100% Transparency",
      description: "Every donation is tracked and accounted for with complete transparency in our processes.",
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Direct Impact",
      description: "Your donations go directly to beneficiaries without any administrative deductions.",
      icon: <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Continuous Monitoring",
      description: "Our team ensures constant oversight throughout the implementation process.",
      icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Regular Updates",
      description: "Detailed feedback reports keep you informed about your donation's impact.",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const differentiators = [
    {
      title: "Project-Specific Allocation",
      description: "When you choose a project from our various programs, your donation is exclusively allocated to that specific initiative, ensuring your intended impact is achieved.",
      icon: <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
    },
    {
      title: "Volunteer-Led Implementation",
      description: "Our trained volunteers work directly with beneficiaries to ensure that the full amount reaches those in need, with zero administrative deductions.",
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
    },
    {
      title: "Real-Time Monitoring",
      description: "Our administrative officers maintain continuous oversight throughout the entire process, from donation receipt to final beneficiary impact.",
      icon: <MonitorSpeaker className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-600" />
    },
    {
      title: "Personalized Impact Reports",
      description: "You receive detailed feedback reports via email, complete with photos, stories, and data showing exactly how your donation transformed lives.",
      icon: <Mail className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
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
              Transparency, Accountability, and Maximum Impact - Every step of our process is designed to ensure your generosity creates lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Choose Your Project</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
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
                  Every donation we receive is tracked by our administrative officers for proper utilization. We believe in complete transparency and accountability, ensuring that your generosity creates the maximum possible impact in the lives of those who need it most.
                </p>
                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-xl border border-blue-100/50">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                    Your trust is our foundation. Every rupee is accounted for, every impact is measured, and every story is shared.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100/80 to-purple-100/80 rounded-2xl p-6 sm:p-8 text-center border border-blue-200/50">
                  <Eye className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Complete Transparency
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    From donation to impact, every step is monitored, documented, and reported back to you with complete honesty.
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
              From your donation to real-world impact - every step is transparent and accountable
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
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
                className={`${process.bgColor} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${process.borderColor} border-2 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Step Number */}
                <div className={`absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${process.color} text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg`}>
                  {process.step}
                </div>
                
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${process.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-white shadow-lg`}>
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
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${principle.color} rounded-lg sm:rounded-xl mb-3 sm:mb-4 text-white`}>
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
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                What Makes Us Different
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4">
                Our unique approach ensures maximum impact and complete transparency
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-br from-gray-50/80 to-blue-50/80 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100/50">
                  <div className="flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
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
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">Fund Utilization</div>
              <p className="text-sm sm:text-base text-gray-600">Every rupee goes directly to beneficiaries</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100/50">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">Monitoring</div>
              <p className="text-sm sm:text-base text-gray-600">Continuous oversight and tracking</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100/50 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Real</div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">Impact Reports</div>
              <p className="text-sm sm:text-base text-gray-600">Detailed feedback on your contribution</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 opacity-90" />
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Ready to Make a Transparent Impact?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl opacity-95 mb-6 sm:mb-8 leading-relaxed px-4">
              Join our transparent donation process and see exactly how your generosity transforms lives. Every donation is tracked, every impact is measured, and every story is shared.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>💖 Choose Your Project</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>💖 View Our Programs</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowWeWork;