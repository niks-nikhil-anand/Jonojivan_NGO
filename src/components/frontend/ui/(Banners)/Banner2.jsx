"use client"
import React from 'react';
import banner1 from '../../../../../public/frontend/Banner/Banner2.webp';
import banner2 from '../../../../../public/frontend/Banner/Banner12.webp'; 


const Banner2 = () => {
  return (
    <div
      className="relative w-full h-[110vh] overflow-hidden "
      style={{
        backgroundImage: `url(${banner1.src})`, // Default background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 opacity-50" />
      <div className="absolute md:top-1/2 top-[10rem] md:right-[3rem] transform -translate-y-1/2  p-5">
        <h1 className="text-3xl md:text-7xl text-[#D07021]">Greatness</h1>
        <h1 className="text-3xl md:text-4xl ml-5 text-[#D07021]">by Nature</h1>
        <p className="mt-10 text-lg md:text-xl w-[20rem] md:w-[40rem] lg:w-[50rem] text-white">
        By combining the best of nature’s nutrients with science-backed formulas, we create clean, effective supplements tailored to your unique needs.
        </p>
      </div>

     
    </div>
  );
}

export default Banner2;
