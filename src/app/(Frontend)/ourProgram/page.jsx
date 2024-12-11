import React from 'react';
import { FaSchool, FaChalkboardTeacher, FaHandsHelping, FaUserGraduate, FaBuilding } from 'react-icons/fa';

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
      <section className="py-12 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-6">The Impact of Your Support</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-6">
          Supporting Bring Smile means changing lives through education. Together, we can transform countless futures and make dreams a reality.
        </p>
        <ul className="list-disc list-inside text-center">
          <li>Millions of children are still waiting for their chance to learn.</li>
          <li>Thousands of girls are waiting for the opportunity to dream big.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Join Us in Building a Brighter Future</h2>
        <div className="space-y-4">
          <p className="text-lg">💖 Donate Now: Sponsor a child’s education for just ₹26,000 a year.</p>
          <p className="text-lg">💖 Partner With Us: Help us expand our programs and reach more children.</p>
          <p className="text-lg">💖 Spread the Word: Share our story and inspire others.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-lg">Because Every Child Deserves a Chance</p>
        <p className="mt-2">Education is more than a right—it’s a lifeline to a brighter tomorrow.</p>
      </footer>
    </div>
  );
};

export default BringSmile;