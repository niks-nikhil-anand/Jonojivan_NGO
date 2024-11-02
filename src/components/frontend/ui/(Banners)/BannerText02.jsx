import React from 'react';
import Banner from '../../../../../public/frontend/Banner/Group_910.avif';
import Image from 'next/image';

const BannerText02 = () => {
  return (
    <div className='flex flex-col md:flex-row items-center p-4 pb-10 md:p-8 mt-10'>
  {/* Text Section */}
  <div className='w-full md:w-1/2 mt-6 md:mt-0 md:mr-10 text-left  flex-col hidden md:flex'>
    <h1 className='text-3xl md:text-6xl font-bold text-[#D07021] mb-4'>
    Your Local Grocery, JonoJivan
    </h1>
    <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
    At JonoJivan Grocery, we bring you the freshest produce and quality ingredients sourced directly from local farms. Our commitment to sustainability and community ensures that you enjoy healthy choices while supporting local growers. Join us in celebrating good food and a vibrant lifestyle!
    </p>
  </div>

  {/* Image Section */}
  <div className='w-full md:w-1/2 mt-6 md:mt-0'>
    <Image
      src={Banner}
      alt='Banner Image'
      className='w-full h-auto object-cover rounded-lg'
    />
  </div>
  <div className='w-full md:w-1/2 mt-6 md:mt-0 md:mr-10 text-left  flex-col flex md:hidden'>
    <h1 className='text-3xl md:text-6xl font-bold text-[#D07021] mb-4'>
    Your Local Grocery, JonoJivan
    </h1>
    <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
    At JonoJivan Grocery, we bring you the freshest produce and quality ingredients sourced directly from local farms. Our commitment to sustainability and community ensures that you enjoy healthy choices while supporting local growers. Join us in celebrating good food and a vibrant lifestyle!
    </p>
  </div>
</div>

  );
};

export default BannerText02;
