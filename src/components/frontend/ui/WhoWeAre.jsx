import React from 'react';
import Image from 'next/image';
import Banner1 from '../../../../public/frontend/WhoWeAre/Banner1.webp';
import Banner2 from '../../../../public/frontend/WhoWeAre/Banner2.webp';
import Banner3 from '../../../../public/frontend/WhoWeAre/Banner3.webp';
import Banner4 from '../../../../public/frontend/WhoWeAre/Banner4.webp';
import { MdDirections } from "react-icons/md";


const banners = [
  { 
    src: Banner1, 
    label: 'Grocery Store At the Center of the City', 
    description: 'Discover the freshest produce and high-quality groceries, conveniently located at the heart of the city for all your shopping needs.', 
    heading: 'Your Grocery Destination' 
  },
  { 
    src: Banner2, 
    label: 'We Provide You the Best Quality Products', 
    description: 'Our commitment to quality ensures that you receive only the finest products, sourced from trusted suppliers and designed to meet your expectations.', 
    heading: 'Quality You Can Trust' 
  },
  { 
    src: Banner3, 
    label: 'Feed Your Family the Best!', 
    description: 'Nourish your loved ones with our range of wholesome, nutritious food options that cater to every family member’s needs.', 
    heading: 'Healthy Meals for Happy Families' 
  },
  { 
    src: Banner4, 
    label: 'Greatness Guaranteed', 
    description: 'We stand behind our products with a promise of excellence; if you’re not satisfied, we’ll make it right.', 
    heading: 'Satisfaction Guaranteed' 
  },
];


const WhoWeAre = () => {
  return (
    <div className="flex flex-col mt-5 md:mt-11">
  <h2 className="text-xl sm:text-2xl md:text-4xl mb-4 text-center font-bold text-red-500">
    Who We Are
  </h2>
  <div className="flex gap-5 hover:cursor-pointer justify-center px-2 py-3 flex-wrap">
    {banners.map((banner, index) => (
      <div
        key={index}
        className="relative h-[20rem] w-[20rem] sm:h-[18rem] sm:w-[14rem] md:h-[22rem] md:w-[18rem] lg:h-[28rem] lg:w-[22rem] overflow-hidden rounded-3xl group"
      >
        <Image
          src={banner.src}
          alt={banner.label}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
        />
        <p className="absolute top-10 left-0 right-0 text-center text-white text-base sm:text-lg md:text-xl font-medium p-1 bg-gray-500 px-2 py-4">
          {banner.label}
        </p>

        {/* Hover effect - black overlay with text and button */}
        <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
          <p className="mb-2 text-center text-sm sm:text-base md:text-lg font-semibold">
            {banner.heading}
          </p>
          <p className="mb-4 text-center text-xs sm:text-sm md:text-base">
            {banner.description}
          </p>
          <button className="text-xs sm:text-sm md:text-base text-black bg-white px-2 sm:px-3 py-1 sm:py-2 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2">
            Learn More
            <MdDirections className="text-lg sm:text-xl" />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  

  );
};

export default WhoWeAre;
