"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const Page = () => {
  const router = useRouter(); // Initialize useRouter hook
  const [countdown, setCountdown] = useState(5); // State to track the countdown

  useEffect(() => {
    // Set up the countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Clear the interval when countdown reaches 1
          router.push("/"); // Redirect to homepage
        }
        return prev - 1; // Decrement the countdown
      });
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      {/* Container for the success message */}
      <motion.div
        className="bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col items-center justify-center w-full max-w-md md:max-w-lg lg:max-w-7xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Tick Icon with continuous animation */}
        <motion.div
          className="bg-green-500 p-4 rounded-full text-white mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }} // Pulsating animation
          transition={{
            duration: 1.5,
            repeat: Infinity, // Loop the animation infinitely
            repeatType: "loop",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-10 h-10 md:w-12 md:h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* Success message */}
        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-green-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Payment Completed
        </motion.h2>

        {/* Payment Description */}
        <motion.p
          className="text-sm md:text-base lg:text-lg text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Your payment has been successfully processed. Thank you for your
          donation!
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          className="text-sm md:text-base lg:text-lg text-gray-700 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Redirecting to the homepage in{" "}
          <span className="font-semibold text-green-600">{countdown}</span>{" "}
          seconds...
        </motion.div>

        {/* Thank You Section */}
        <motion.div
          className="bg-gray-100 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm w-full mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
            Thank You for Your Generosity!
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4">
            Your support means the world to us. You’ve just made a life-changing
            difference in the life of a girl, a woman, or a child who will now
            have the chance to learn, grow, and achieve their dreams.
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4">
            In a world where opportunities are scarce, you’ve just opened a door
            to a brighter future for someone in need. Your donation is more than
            just a contribution—it’s a beacon of hope, a spark that will ignite
            the potential of those who were once held back by circumstances
            beyond their control.
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4">
            Every book, every lesson, every opportunity they now have is because
            of YOU. Because of your heart, your compassion, and your belief in
            their potential. You’ve made it possible for them to dream, to learn,
            and to rise.
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold mt-6">
            Together, we are changing lives. Together, we are building a better
            tomorrow.
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold mt-6">
            With all our hearts, thank you. ❤️
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
