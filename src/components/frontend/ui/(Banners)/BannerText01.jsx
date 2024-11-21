import React from 'react';
import Image from 'next/image';
import CompositeImage from '../../../../../public/frontend/Banner/Group_520.webp'; // Path to your composite image

const CausesSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 ">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <Image
          src={CompositeImage}
          alt="Composite of multiple images"
          className="rounded-lg object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-left mt-8 md:mt-0 md:pl-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
        YOUR SMALL DONATION{' '}
          <span className="text-[#D07021]">CAN MAKE A DIFFERENCE.</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        Your contributions help us serve India’s most marginalized children and ensure that they are able to go to school, get proper nutrition and healthcare, and stay protected from abuse and exploitation. We cannot do the work that we do without your support, and it’ll need each and every one of us to come together to ensure happier childhoods for children everywhere!
        </p>
      </div>
    </div>
  );
};

export default CausesSection;
