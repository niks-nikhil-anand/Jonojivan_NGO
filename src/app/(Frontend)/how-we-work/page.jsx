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
      icon: <Heart className="w-8 h-8" />,
      color: "from-blue-500 to-sky-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      step: 2,
      title: "Make Your Donation",
      description: "Donate securely for your chosen project. Every rupee is tracked from the moment it reaches us to ensure complete transparency.",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      step: 3,
      title: "Administrative Tracking",
      description: "Our administrative officers immediately log your donation and assign it to the specific project you've chosen for proper utilization.",
      icon: <FileText className="w-8 h-8" />,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      step: 4,
      title: "Volunteer Implementation",
      description: "Our dedicated volunteers ensure that 100% of your donation amount is utilized for the direct benefit of the intended beneficiary.",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      step: 5,
      title: "Continuous Monitoring",
      description: "The entire process is continuously monitored by our administrative officers to ensure accountability and proper fund utilization.",
      icon: <Eye className="w-8 h-8" />,
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      step: 6,
      title: "Impact Report",
      description: "You receive a detailed feedback report via email showing the real impact you've made in the life of a deprived person or family.",
      icon: <Mail className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ];

  const principles = [
    {
      title: "100% Transparency",
      description: "Every donation is tracked and accounted for with complete transparency in our processes.",
      icon: <Eye className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Direct Impact",
      description: "Your donations go directly to beneficiaries without any administrative deductions.",
      icon: <ArrowRight className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Continuous Monitoring",
      description: "Our team ensures constant oversight throughout the implementation process.",
      icon: <Settings className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Regular Updates",
      description: "Detailed feedback reports keep you informed about your donation's impact.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const differentiators = [
    {
      title: "Project-Specific Allocation",
      description: "When you choose a project from our various programs, your donation is exclusively allocated to that specific initiative, ensuring your intended impact is achieved.",
      icon: <Target className="w-8 h-8 text-green-600" />
    },
    {
      title: "Volunteer-Led Implementation",
      description: "Our trained volunteers work directly with beneficiaries to ensure that the full amount reaches those in need, with zero administrative deductions.",
      icon: <Users className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Real-Time Monitoring",
      description: "Our administrative officers maintain continuous oversight throughout the entire process, from donation receipt to final beneficiary impact.",
      icon: <MonitorSpeaker className="w-8 h-8 text-yellow-600" />
    },
    {
      title: "Personalized Impact Reports",
      description: "You receive detailed feedback reports via email, complete with photos, stories, and data showing exactly how your donation transformed lives.",
      icon: <Mail className="w-8 h-8 text-purple-600" />
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
              <Settings className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How We Work
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Transparency, Accountability, and Maximum Impact - Every step of our process is designed to ensure your generosity creates lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>Choose Your Project</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
                <span>View Our Programs</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Commitment Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
                Our Commitment to Transparency
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every donation we receive is tracked by our administrative officers for proper utilization. We believe in complete transparency and accountability, ensuring that your generosity creates the maximum possible impact in the lives of those who need it most.
                </p>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <p className="text-gray-700 font-medium">
                    Your trust is our foundation. Every rupee is accounted for, every impact is measured, and every story is shared.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center">
                  <Eye className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Complete Transparency
                  </h3>
                  <p className="text-gray-700">
                    From donation to impact, every step is monitored, documented, and reported back to you with complete honesty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6-Step Process */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Our 6-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From your donation to real-world impact - every step is transparent and accountable
            </p>
          </div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8"
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
                className={`${process.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${process.borderColor} border-2 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Step Number */}
                <div className={`absolute top-6 right-6 w-10 h-10 bg-gradient-to-r ${process.color} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg`}>
                  {process.step}
                </div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${process.color} rounded-2xl mb-6 text-white shadow-lg`}>
                  {process.icon}
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {process.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Core Principles */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Core Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              The foundation of trust that guides every aspect of our work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${principle.color} rounded-xl mb-4 text-white`}>
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {principle.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-12">
              <Zap className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What Makes Us Different
              </h2>
              <p className="text-xl text-gray-600">
                Our unique approach ensures maximum impact and complete transparency
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
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
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Your Impact, Tracked & Verified
            </h2>
            <p className="text-xl text-gray-600">
              Real numbers, real impact, real transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-xl font-semibold text-gray-800 mb-2">Fund Utilization</div>
              <p className="text-gray-600">Every rupee goes directly to beneficiaries</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-xl font-semibold text-gray-800 mb-2">Monitoring</div>
              <p className="text-gray-600">Continuous oversight and tracking</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Real</div>
              <div className="text-xl font-semibold text-gray-800 mb-2">Impact Reports</div>
              <p className="text-gray-600">Detailed feedback on your contribution</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-4xl font-bold mb-4">
              Ready to Make a Transparent Impact?
            </h3>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Join our transparent donation process and see exactly how your generosity transforms lives. Every donation is tracked, every impact is measured, and every story is shared.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>💖 Choose Your Project</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FileText className="w-5 h-5" />
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