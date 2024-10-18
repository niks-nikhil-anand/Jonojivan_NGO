"use client";
import React, { useState, useEffect } from 'react';
import banner1 from '../../../../../public/frontend/Banner/Banner1.webp';
import banner2 from '../../../../../public/frontend/Banner/Banner12.webp'; 

const Banner1 = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative w-full h-[110vh] overflow-hidden"
      style={{
        backgroundImage: `url(${isMobile ? banner2.src : banner1.src})`, // Use banner2 for mobile, banner1 for desktop
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 opacity-50" />
      <div className="absolute md:top-1/2 top-[10rem] md:left-[3rem] transform -translate-y-1/2 text-blue-400 p-5">
        <h1 className="text-3xl md:text-6xl">Wellness</h1>
        <h1 className="text-3xl md:text-4xl ml-5">by Nature</h1>
        <p className="mt-10 text-lg md:text-xl w-[20rem] md:w-[40rem] lg:w-[50rem]">
          Zhou Nutrition started with a small group of runners, yogis, athletes, and outdoor enthusiasts all striving for greatness in our own unique ways.
        </p>
      </div>
    </div>
  );
}

export default Banner1;
