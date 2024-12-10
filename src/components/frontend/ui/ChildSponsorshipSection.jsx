import React from 'react';
import banner from '../../../../public/frontend/Banners/OrganizationInfo.jpg';
import Image from 'next/image';

const ChildSponsorshipSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-8 md:py-10 px-6 md:px-16 bg-white">
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 pr-6 md:pr-10 mb-8 md:mb-0">
  <p className="text-xs sm:text-sm md:text-lg font-semibold text-[#28a745] mb-2  md:text-left">
    GIFT A SMILE
  </p>
  <h2 className="text-xl sm:text-xl md:text-4xl font-bold text-[#ff5a5f] mb-4 sm:mb-6 leading-tight r md:text-left">
    What is the Child Sponsorship Program of Bring Smile Foundation?
  </h2>
  <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed  md:text-left">
  Every child deserves the chance to learn, grow, and dream—yet millions, especially in underserved communities, face barriers to education. At Bring Smile, we are committed to breaking these barriers by providing children with access to quality education and the tools they need to succeed.
  </p>
  <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed  md:text-left">
  By sponsoring a child, you don’t just provide education—you open the door to a brighter future.
  </p>
  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#ff5a5f] mb-4 md:text-left">
  Why Sponsor a Child?
</h3>
  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-gray-700 text-center md:text-left">
    <p className="flex items-center justify-start md:justify-start">
      <span className="text-[#ff5a5f] mr-3">✔</span>
      Tuition Fees
    </p>
    <p className="flex items-center justify-center md:justify-start">
      <span className="text-[#ff5a5f] mr-3">✔</span>
      Books and Learning Materials
    </p>
    <p className="flex items-center justify-center md:justify-start">
      <span className="text-[#ff5a5f] mr-3">✔</span>
      Uniforms and School Supplies.
    </p>
    <p className="flex items-center justify-center md:justify-start">
      <span className="text-[#ff5a5f] mr-3">✔</span>
      Health and Well-being Support
    </p>
  </div>
  
  <div className="flex justify-center md:justify-start mt-6 md:mt-8">
    <button className="px-6 py-3 bg-[#ff5a5f] text-white text-sm sm:text-lg font-semibold rounded-lg shadow-md hover:bg-[#e14a4e] transition duration-300 ease-in-out">
      Sponsor a Child Now
    </button>
  </div>
</div>


      <div className="w-full md:w-1/2 relative">
        <div className="absolute bg-black bg-opacity-75 p-4 sm:p-6 text-white bottom-[-2rem] sm:bottom-[-2.5rem] left-[-2rem] z-10 rounded-lg shadow-lg w-[14rem] sm:w-[15rem] flex items-center justify-center">
          <span className="text-center text-sm sm:text-lg font-semibold">Be the Spark That Ignites a Future.</span>
        </div>

        <Image 
          src={banner} 
          alt="Organization Banner" 
          className="w-full h-full object-cover shadow-lg" 
          layout="responsive" 
          width={1200} 
          height={800} 
        />
      </div>
    </section>
  );
};

export default ChildSponsorshipSection;
