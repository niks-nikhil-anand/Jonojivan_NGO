import React from 'react';
import banner from '../../../../public/frontend/Banners/OrganizationInfo.jpg';
import Image from 'next/image';

const ChildSponsorshipSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-10 md:py-10 px-6 md:px-16 bg-white">
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 pr-6 md:pr-10 mb-8 md:mb-0">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight text-center md:text-left">
          What is the Child Sponsorship Program of Bring Smile Foundation?
        </h2>
        <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed text-center md:text-left">
          The Child Sponsorship Program is your opportunity to be a life-changing force for a child who dreams of a brighter future. At Bring Smile Foundation, we connect compassionate individuals like you with children from underprivileged backgrounds who lack access to basic education.
        </p>
        <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed text-center md:text-left">
          When you sponsor a child, you provide them with:
        </p>
        <div className="space-y-4 text-lg text-gray-700 text-center md:text-left">
          <p className="flex items-center justify-center md:justify-start">
            <span className="text-green-600 mr-3">✔</span>
            Quality education for one year.
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <span className="text-green-600 mr-3">✔</span>
            School supplies, including books, stationery, uniforms, and a bag.
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <span className="text-green-600 mr-3">✔</span>
            A safe and nurturing learning environment.
          </p>
        </div>
        <div className="flex justify-center md:justify-start mt-8">
          <button className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out">
            Sponsor a Child Now
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <Image 
          src={banner} 
          alt="Organization Banner" 
          className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" 
          layout="responsive" 
          width={1200} 
          height={800} 
        />
      </div>
    </section>
  );
};

export default ChildSponsorshipSection;
