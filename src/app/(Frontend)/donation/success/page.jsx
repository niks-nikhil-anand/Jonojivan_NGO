"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation' // Import useRouter from Next.js

const Page = () => {
  const router = useRouter() // Initialize useRouter hook

  
  useEffect(() => {
    // Redirect to homepage after 2 seconds
    const timer = setTimeout(() => {
      router.push('/') // Redirect to homepage
    }, 5000)

    // Cleanup timeout when the component is unmounted
    return () => clearTimeout(timer)
  }, [router])


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {/* Container for the success message */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Tick Icon with animation */}
        <motion.div
          className="bg-green-500 p-4 rounded-full text-white mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        
        {/* Success message */}
        <motion.h2
          className="text-2xl font-semibold text-green-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Payment Completed
        </motion.h2>
        
        {/* Description */}
        <motion.p
          className="text-gray-600 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Your payment has been successfully processed. Thank you for your purchase!
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Page
