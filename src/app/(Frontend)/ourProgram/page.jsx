import React from 'react';
import banner from '../../../../public/frontend/Banners/ourMissionBanner.jpg'
import Image from 'next/image';
import { 
  FaHeart, 
  FaBookOpen, 
  FaGraduationCap, 
  FaSchool, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaHandsHelping, 
  FaRegSmileBeam, 
  FaBuilding 
} from 'react-icons/fa';



const BringSmile = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Transforming Lives Through Education</h1>
        <p className="text-lg">At Bring Smile, we unlock potential, inspire dreams, and empower futures.</p>
      </header>

      {/* Why Education Matters */}
      <section className="py-12 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-6">Why Education Matters</h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          Education is the most powerful tool for breaking the cycle of poverty. It equips children with skills, courage, and knowledge to build brighter futures. We refuse to let barriers like poverty and gender discrimination silence their dreams.
        </p>
      </section>

      {/* How We Make a Difference */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">How We Make a Difference</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white shadow rounded flex flex-col items-center text-center">
            <FaSchool className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Running Schools for Holistic Learning</h3>
            <p>Our flagship initiative, Bloomfield International School, empowers students with quality education and a supportive environment.</p>
          </div>
          <div className="p-6 bg-white shadow rounded flex flex-col items-center text-center">
            <FaChalkboardTeacher className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Educating Girls, Empowering Communities</h3>
            <p>We break barriers for girls, ensuring they thrive and uplift entire communities.</p>
          </div>
          <div className="p-6 bg-white shadow rounded flex flex-col items-center text-center">
            <FaHandsHelping className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Providing Tuition Classes</h3>
            <p>Our personalized tuition programs bridge learning gaps and boost confidence.</p>
          </div>
          <div className="p-6 bg-white shadow rounded flex flex-col items-center text-center">
            <FaUserGraduate className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Skill Development Programs</h3>
            <p>We provide vocational training and life skills for independence and self-reliance.</p>
          </div>
          <div className="p-6 bg-white shadow rounded flex flex-col items-center text-center">
            <FaBuilding className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-4">Safe and Inclusive Learning Environments</h3>
            <p>We create spaces where children feel safe, valued, and inspired to learn.</p>
          </div>
        </div>
      </section>


{/* Impact Section */}
<div className="mt-12 p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-lg shadow-lg">
  <h2 className="text-3xl font-bold text-blue-600 mb-4">
    The Impact of Your Support
  </h2>
  <p>
    Supporting Bring Smile means changing lives through education. Together, we can transform countless futures and make dreams a reality.
  </p>
  <ul className="space-y-6 text-gray-700 py-5">
    <li className="flex items-center gap-4">
      <FaRegSmileBeam className="text-yellow-500 text-xl" />
      <span className="text-lg">Millions of children are still waiting for their chance to learn.</span>
    </li>
    <li className="flex items-center gap-4">
      <FaChalkboardTeacher className="text-green-500 text-xl" />
      <span className="text-lg">Thousands of girls are waiting for the opportunity to dream big.</span>
    </li>
    <li className="flex items-center gap-4">
      <FaHandsHelping className="text-blue-500 text-xl" />
      <span className="text-lg">Every donation helps us bring hope to those in need.</span>
    </li>
    <li className="flex items-center gap-4">
      <FaHeart className="text-red-500 text-xl" />
      <span className="text-lg">Your support creates lasting change and brighter futures for many.</span>
    </li>
  </ul>
</div>







      {/* Donation Information */}
<div className="mt-12 p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-lg shadow-lg">
  <h2 className="text-3xl font-bold text-blue-600 mb-4">
    Join Us in Building a Brighter Future
  </h2>
  <ul className="space-y-6 text-gray-700">
    <li className="flex items-center gap-4">
      <FaHeart className="text-red-500 text-xl" />
      <span className="text-lg"> Donate Now: Sponsor a child’s education for just ₹26,000 a year.</span>
    </li>
    <li className="flex items-center gap-4">
      <FaChalkboardTeacher className="text-green-500 text-xl" />
      <span className="text-lg">Partner With Us: Help us expand our programs and reach more children.</span>
    </li>
    <li className="flex items-center gap-4">
      <FaBookOpen className="text-yellow-500 text-xl" />
      <span className="text-lg"> Spread the Word: Share our story and inspire others.</span>
    </li>
    <li className="flex items-center gap-4">
      <FaGraduationCap className="text-blue-500 text-xl" />
      <span className="text-lg">Join Our Mission: Make education accessible to every child.</span>
    </li>
  </ul>
</div>

      
      <div className="relative m-12 text-center rounded-lg shadow-md">
          {/* Banner Image */}
          <Image
            src={banner}
            alt="Our Mission Banner"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority
          />
          {/* Content Overlay */}
          <div className="relative bg-blue-600 bg-opacity-75 p-8 rounded-lg text-white">
            <h2 className="text-2xl font-bold">
            Because Every Child Deserves a Chance
            </h2>
            <p className="mt-4">
            Education is more than a right—it’s a lifeline to a brighter tomorrow.
            </p>
            <button className="mt-6 bg-white text-blue-600 py-3 px-6 rounded-lg shadow hover:bg-gray-200 transition duration-300">
              Donate Now
            </button>
          </div>
        </div>
    </div>
  );
};

export default BringSmile;