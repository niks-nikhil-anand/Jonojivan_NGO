"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaHandshake, FaBullseye, FaUsers } from 'react-icons/fa';


export default function AboutPageOne() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-purple-400 to-pink-400 h-[70vh] flex justify-center items-center text-center text-white relative px-4">
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            className="bg-white text-purple-700 px-4 py-2 rounded-full shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold">About BringSmile Foundation</p>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-5xl font-bold"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Spreading Smiles, Transforming Lives
          </motion.h1>
          <p className="text-base md:text-lg max-w-3xl">
            At BringSmile Foundation, we’re committed to uplifting communities by
            providing essential resources, fostering education, and promoting
            sustainable development. Together, we can build a brighter and happier
            future for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-16 lg:px-32 py-12 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-2/3"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-4">
              Empowering Communities, One Step at a Time
            </h2>
            <p className="text-gray-700 mb-4">
              BringSmile Foundation works tirelessly to bridge the gap between
              resources and the underprivileged. From education and healthcare
              initiatives to providing daily essentials, our mission is to bring
              hope and happiness to those in need.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-4">
              Supporting Healthier Lifestyles
            </h2>
            <p className="text-gray-700">
              With the support of our community and partners, we strive to address
              pressing social challenges through innovative and sustainable
              solutions. Every smile we bring is a step closer to achieving our
              vision of a harmonious world.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <img
              src="https://media.licdn.com/dms/image/D4D12AQGXSoD7D9yi-w/article-cover_image-shrink_720_1280/0/1685390160086?e=2147483647&v=beta&t=QoQpKIjoPcdk7v3kIbOs13-3iw4KCKtRr92_6q-6YOY"
              alt="Community Service"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="flex flex-col items-center text-center bg-white p-6 shadow-md rounded-lg">
            <FaHandshake className="text-blue-500 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Integrity
            </h3>
            <p className="text-gray-600">
              We uphold the highest standards of integrity in everything we do.
            </p>
          </div>

          {/* Value 2 */}
          <div className="flex flex-col items-center text-center bg-white p-6 shadow-md rounded-lg">
            <FaBullseye className="text-red-500 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Commitment
            </h3>
            <p className="text-gray-600">
              Our commitment is to deliver exceptional results with passion.
            </p>
          </div>

          {/* Value 3 */}
          <div className="flex flex-col items-center text-center bg-white p-6 shadow-md rounded-lg">
            <FaUsers className="text-green-500 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Collaboration
            </h3>
            <p className="text-gray-600">
              We believe in fostering strong collaborations with our clients.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Join Us Section */}
      <section className="bg-gray-50 py-12">
      <div className="px-6 md:px-16 lg:px-32">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700">
            Contact Us to Make a Difference
          </h2>
          <p className="text-gray-700 mt-4">
            Get in touch with us today. Together, we can create lasting change and support communities around the world.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Contact Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-full bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#6C63FF] bg-[#FFDEDE] mb-4 text-center py-2 rounded">
              Our Contact Information
            </h2>
            <div className="space-y-4">
              {/* Operation Office */}
              <motion.div
                className="bg-white shadow-lg rounded-lg border border-gray-300 p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-1">Operation Office</h3>
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-[#FF6F61] mt-1" size={20} />
                      <p className="text-gray-600 text-sm">
                        F-13/17, Jogabai Extension, Okhla, New Delhi- 110025.
                      </p>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-1">Email Address</h3>
                    <div className="flex items-start gap-2">
                      <MdAttachEmail className="text-[#FF6F61] mt-1" size={20} />
                      <p className="text-gray-600 text-sm">contact@bringsmile.in</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-1">Phone</h3>
                    <div className="flex items-start gap-2">
                      <FaPhoneAlt className="text-[#FF6F61] mt-1" size={20} />
                      <p className="text-gray-600 text-sm">+91 9891989151</p>
                    </div>
                  </div>

                  {/* Registered Office */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-1">Registered Office</h3>
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-[#FF6F61] mt-1" size={20} />
                      <p className="text-gray-600 text-sm">
                        Singhi Kalan, PO- Ara, District- Bhojpur, Bihar, Pin- 802301.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </div>
  );
}
