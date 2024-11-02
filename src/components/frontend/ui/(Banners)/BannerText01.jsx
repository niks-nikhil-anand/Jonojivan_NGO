import React from 'react';
import Banner from '../../../../../public/frontend/Banner/Group_520.webp';
import Image from 'next/image';

const BannerText01 = () => {
  return (
    <div className='flex flex-col md:flex-row items-center p-4 md:p-8 mt-10'>
    {/* Image Section */}
    <div className='w-full md:w-1/2'>
      <Image
        src={Banner}
        alt='Banner Image'
        className='w-full h-auto object-cover rounded-lg'
      />
    </div>
  
    {/* Text Section */}
    <div className='w-full md:w-1/2 mt-6 md:mt-0 md:ml-10 text-left flex flex-col'>
      <h1 className='text-3xl md:text-6xl font-bold text-[#D07021] mb-4'>
      Discover Freshness at JonoJivan
      </h1>
      <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
      We believe in providing the freshest and highest-quality groceries to our community. Our commitment to local sourcing and sustainability ensures that every product you purchase meets the highest standards. Shop with us for an exceptional grocery experience that prioritizes your health and well-being.
      </p>
    </div>
  </div>
  
  );
};

export default BannerText01;
