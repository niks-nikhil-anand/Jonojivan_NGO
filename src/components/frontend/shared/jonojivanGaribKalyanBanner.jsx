import React from 'react';
import { motion } from 'framer-motion';
import { HandHeart } from 'lucide-react';

const JonojivanGaribKalyanBanner = ({ 
  title = "Jonojivan Garib Kalyan",
  subtitle = "Join the Jonojivan Foundation's Garib Kalyan initiative — a compassionate effort to distribute donated funds directly to those in need.",
  badgeText = "Garib Kalyan Yojana",
  showIcon = true,
  customClass = ""
}) => {
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8">
      <motion.div 
        className={`relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-2xl sm:rounded-3xl shadow-2xl ${customClass}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
      <style jsx>{`
        .pulse-glow {
          animation: pulseGlow 3s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .floating-shapes::before,
        .floating-shapes::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .floating-shapes::before {
          width: 300px;
          height: 300px;
          top: -150px;
          right: -150px;
          animation-delay: 0s;
        }

        .floating-shapes::after {
          width: 200px;
          height: 200px;
          bottom: -100px;
          left: -100px;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #a7f3d0, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-badge {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="floating-shapes"></div>
      
      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {showIcon && (
            <motion.div 
              className="flex justify-center mb-3 sm:mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white/20 p-4 sm:p-6 rounded-full backdrop-blur-sm pulse-glow">
                <HandHeart className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </motion.div>
          )}
          
          <motion.h1 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block gradient-text">
              {title}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 mb-6 sm:mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
          
          {badgeText && (
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="glass-badge px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
                <p className="text-white font-semibold text-sm sm:text-base">
                  {badgeText}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-t-2xl sm:rounded-t-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 rounded-b-2xl sm:rounded-b-3xl"></div>
      </motion.div>
    </div>
  );
};

export default JonojivanGaribKalyanBanner;