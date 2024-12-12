import React from "react";
import banner from '../../../../public/frontend/Banners/ourMissionBanner.jpg'
import Image from "next/image";


const EmpoweringCommunities = () => {
  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Empowering Communities Across Bihar
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            At Bring Smile, we are committed to making a tangible difference in
            the lives of underserved communities.
          </p>
        </div>

        {/* Section 1 */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left underline">
            Our Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Focus Area 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                Bloomfield International School, Ara
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Our flagship project, Bloomfield International School, provides
                high-quality education to children from marginalized
                communities. We offer a safe, nurturing, and empowering
                environment for success academically, socially, and emotionally.
              </p>
            </div>
            {/* Focus Area 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                Skill Development Programs for Women
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                We provide skill development programs to empower women and
                girls, enabling them to become financially independent and
                confident leaders in their communities.
              </p>
            </div>
            {/* Focus Area 3 */}
            <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                Outreach and Community Support
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                We work directly with families and local communities to raise
                awareness about education, gender equality, and women’s rights,
                ensuring accessibility and impact.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            The Impact of Our Work in Bihar
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm md:text-base">
            <li>
              Girls are going to school, breaking traditional barriers to
              education.
            </li>
            <li>
              Women are gaining financial independence through vocational
              training.
            </li>
            <li>
              Communities are transforming with a growing understanding of
              education and equality.
            </li>
          </ul>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Together, we can expand our reach, touch more lives, and continue to
            build a future where every child and woman has the opportunity to
            thrive.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10 relative bg-blue-500 text-white rounded-lg overflow-hidden p-6 min-h-[200px] md:min-h-[200px] lg:min-h-[300px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={banner}
          alt="Our Mission Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Join Us in Making a Lasting Impact in Bihar
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="#"
            className="bg-white text-blue-500 py-2 px-6 text-sm md:text-base rounded-lg shadow hover:bg-gray-100 transition"
          >
            💖 Donate Now
          </a>
          <a
            href="#"
            className="bg-white text-blue-500 py-2 px-6 text-sm md:text-base rounded-lg shadow hover:bg-gray-100 transition"
          >
            💖 Partner With Us
          </a>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default EmpoweringCommunities;
