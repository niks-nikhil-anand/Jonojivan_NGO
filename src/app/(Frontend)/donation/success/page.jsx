"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-p4/50 to-white p-4 font-inter relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-p1/20 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[60%] -right-[10%] w-[400px] h-[400px] rounded-full bg-p2/10 blur-[120px]"
          animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Main Card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-white/60 text-center"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-green-50 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
            </motion.svg>
            <motion.div
              className="absolute inset-0 rounded-full border-[3px] border-green-400"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.6, repeat: Infinity, ease: "easeOut" }}
            />
          </div>
        </div>

        <motion.h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Payment Successful
        </motion.h2>

        <motion.p
          className="text-lg text-gray-500 mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          A heartfelt thank you for your generous contribution. 
          Your receipt will be emailed to you momentarily.
        </motion.p>

        {/* Beautiful Thank You Note Section */}
        <motion.div
          className="text-left bg-gradient-to-br from-gray-50 to-white px-6 py-8 md:p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Decorative Left Border */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#2EF2FF] to-[#3C52D9] rounded-l-2xl opacity-80" />
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="sparkles">✨</span> Making a Difference
          </h3>
          
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              Your support means the world to us. You’ve just made a life-changing difference 
              for someone eager to learn, grow, and achieve their dreams.
            </p>
            <p>
              In a world where opportunities are scarce, you’ve just opened a door to a brighter future. 
              Your donation is more than just a contribution—it’s a beacon of hope.
            </p>
            <p className="font-medium text-gray-900 mt-2 pt-2">
              With all our hearts, thank you. ❤️
            </p>
          </div>
        </motion.div>

        {/* Circular Countdown Timer */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute top-0 left-0 w-12 h-12 transform -rotate-90">
              <circle
                cx="24" cy="24" r="22"
                stroke="currentColor" strokeWidth="3" fill="transparent"
                className="text-gray-100"
              />
              <motion.circle
                cx="24" cy="24" r="22"
                stroke="currentColor" strokeWidth="3" fill="transparent"
                className="text-s4"
                strokeDasharray={22 * 2 * Math.PI}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 22 * 2 * Math.PI }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </svg>
            <span className="text-sm font-semibold text-gray-700 absolute">{countdown}</span>
          </div>
          <p className="text-sm text-gray-400 font-medium">Taking you back home</p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Page;
