import React from 'react';
import Image from 'next/image';
import Banner1 from '../../../../public/frontend/WhoWeAre/Banner1.webp';
import Banner2 from '../../../../public/frontend/WhoWeAre/Banner2.webp';
import Banner3 from '../../../../public/frontend/WhoWeAre/Banner3.webp';
import Banner4 from '../../../../public/frontend/WhoWeAre/Banner4.webp';
import { MdDirections } from "react-icons/md";


const banners = [
  { src: Banner1, label: 'Clean Ingredients' , description: 'By combining the best of nature’s nutrients with science-backed formulas, we create clean, effective supplements tailored to your unique needs.' , heading: 'We Test' },
  { src: Banner2, label: 'By Enthusiasts , For Enthusiasts' , description: 'By combining the best of nature’s nutrients with science-backed formulas, we create clean, effective supplements tailored to your unique needs.' , heading: 'Our Standards' },
  { src: Banner3, label: 'Based on the Heart Of Utah' , description: 'By combining the best of nature’s nutrients with science-backed formulas, we create clean, effective supplements tailored to your unique needs.' , heading: 'Our Home'},
  { src: Banner4, label: 'Greatness Guaranteed' , description: 'By combining the best of nature’s nutrients with science-backed formulas, we create clean, effective supplements tailored to your unique needs.' , heading: 'Money Back Guarantee'},
];

const WhoWeAre = () => {
  return (
    <div className="flex flex-col mt-5">
      <h2 className="text-xl md:text-4xl mb-4 text-center font-bold text-red-500">Who We Are</h2>
      <div className="flex gap-5 hover:cursor-pointer justify-center px-2 py-3 flex-wrap">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative h-[18rem] w-[14rem] sm:h-[22rem] sm:w-[18rem] md:h-[28rem] md:w-[22rem] overflow-hidden rounded-3xl group" // Added group class for hover effect
          >
            <Image
              src={banner.src}
              alt={banner.label}
              className="object-fill w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105" // Scale image on hover
            />
            <p className="absolute top-10 left-0 right-0 text-center text-red-500 text-lg sm:text-xl md:text-2xl font-medium p-1">
              {banner.label}
            </p>

            {/* Hover effect - black overlay with text and button */}
            <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
              <p className="mb-4 text-center font-semibold">{banner.heading}</p>
              <p className="mb-4 text-center">{banner.description}</p>
              <button className="text-black bg-white px-3 py-2 rounded-2xl text-lg font-bold mt-[4rem] flex items-center justify-center gap-2">
                  Learn More
                  <MdDirections className="text-xl" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhoWeAre;
