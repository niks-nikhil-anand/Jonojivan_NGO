import React from 'react';
import Image from 'next/image';
import Banner1 from '../../../../public/frontend/WhoWeAre/Banner1.webp';
import Banner2 from '../../../../public/frontend/WhoWeAre/Banner2.webp';
import Banner3 from '../../../../public/frontend/WhoWeAre/Banner3.webp';
import Banner4 from '../../../../public/frontend/WhoWeAre/Banner4.webp';

const banners = [
  { src: Banner1, label: 'Clean Ingredients' },
  { src: Banner2, label: 'By Enthusiasts , For Enthusiasts' },
  { src: Banner3, label: 'Based on the Heart Of Utah' },
  { src: Banner4, label: 'Graetness Guaranteed' },
];

const WhoWeAre = () => {
  return (
    <div className="flex flex-col mt-5">
    <h2 className="text-xl md:text-4xl mb-4 text-center font-bold text-red-500">Who We Are</h2>
    <div className="flex gap-5 hover:cursor-pointer justify-center px-2 py-3 flex-wrap">
      {banners.map((banner, index) => (
        <div
          key={index}
          className="relative h-[18rem] w-[14rem] sm:h-[22rem] sm:w-[18rem] md:h-[28rem] md:w-[22rem] overflow-hidden rounded-3xl"
        >
          <Image
            src={banner.src}
            alt={banner.label}
            className="object-fill w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
          <p className="absolute top-10 left-0 right-0 text-center bg-opacity-50 text-red-500 text-lg sm:text-xl md:text-2xl font-medium p-1">
            {banner.label}
          </p>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default WhoWeAre;
