import React from 'react';
import Banner from '../../../../../public/frontend/Banner/Group_910.webp';
import Image from 'next/image';

const BannerText02 = () => {
  return (
    <div className='flex flex-col md:flex-row items-center p-4 pb-10 md:p-8 mt-10'>
  {/* Text Section */}
  <div className='w-full md:w-1/2 mt-6 md:mt-0 md:mr-10 text-left  flex-col hidden md:flex'>
    <h1 className='text-3xl md:text-6xl font-bold text-[#D07021] mb-4'>
      Utah Born. Utah Made.
    </h1>
    <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
      Zhou HQ is located in Salt Lake City, tucked away in Utah’s Wasatch Mountain Range. Our passion for all things outdoors fuels everything we do. We design supplements to help us feel our best, so we can keep enjoying the beauty around us.
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
      Utah Born. Utah Made.
    </h1>
    <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
      Zhou HQ is located in Salt Lake City, tucked away in Utah’s Wasatch Mountain Range. Our passion for all things outdoors fuels everything we do. We design supplements to help us feel our best, so we can keep enjoying the beauty around us.
    </p>
  </div>
</div>

  );
};

export default BannerText02;
