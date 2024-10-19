"use client";
import React from 'react';
import banner1 from '../../../../../public/frontend/Banner/EvergreenMod-Desktop.webp';

const ProductBanner = () => {

  return (
    <div
      className="relative w-full h-[110vh] overflow-hidden"
      style={{
        backgroundImage: `url(${banner1.src})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 opacity-50" />
      <div className="absolute md:top-1/2 top-[10rem] md:right-[3rem] transform -translate-y-1/2  p-5">
        <h1 className="text-3xl md:text-6xl text-[#D07021]">Proud to
        </h1>
        <h1 className="text-3xl md:text-4xl ml-5 text-[#D07021]">Bare it all.</h1>
        <p className="mt-10 text-lg md:text-xl w-[15rem] md:w-[40rem] lg:w-[40rem] text-blue-400 ">
        As a Utah based company, we're proud to show every seed, every extract, every mineral, and every detail of our rigorous testing process because we've got nothing to hide.
        </p>
      </div>
    </div>
  );
}

export default ProductBanner;
