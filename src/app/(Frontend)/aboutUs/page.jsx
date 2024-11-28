"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

export default function AboutPageOne() {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-[#FEE440] to-[#F4B03E] h-[60vh] flex justify-center items-center relative px-4">
          <div className="flex flex-col space-y-6 pb-8 pt-10 md:pt-20">
            <motion.div
              className="mx-auto max-w-max rounded-full border-2 border-white bg-yellow-50 p-1 px-3 shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-center text-xs font-semibold text-yellow-800 md:text-sm">
                About BringSmile Foundation
              </p>
            </motion.div>
            <motion.p
              className="text-center text-lg font-bold text-yellow-900 md:text-4xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Spreading Smiles, Transforming Lives
            </motion.p>
            <p className="mx-auto max-w-2xl text-sm text-center text-yellow-700 md:text-lg">
              The BringSmile Foundation is dedicated to uplifting communities by
              providing essential resources, fostering education, and supporting
              sustainable development. Together, we aim to create a brighter and
              happier future for everyone.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 px-4 md:px-16 lg:px-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="flex flex-col gap-4 md:w-2/3">
              <p className="text-lg font-bold text-yellow-800 md:text-2xl">
                Empowering Communities, One Step at a Time
              </p>
              <p className="text-sm text-yellow-700 md:text-base">
                BringSmile Foundation works tirelessly to bridge the gap between
                resources and the underprivileged. From education and healthcare
                initiatives to providing daily essentials, our mission is to bring
                hope and happiness to those in need.
              </p>
              <p className="text-lg font-bold text-yellow-800 md:text-2xl">
                Supporting Healthier Lifestyles
              </p>
              <p className="text-sm text-yellow-700 md:text-base">
                With the support of our community and partners, we strive to
                address pressing social challenges through innovative and
                sustainable solutions. Every smile we bring is a step closer to
                achieving our vision of a harmonious world.
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <img
                src="https://media.licdn.com/dms/image/D4D12AQGXSoD7D9yi-w/article-cover_image-shrink_720_1280/0/1685390160086?e=2147483647&v=beta&t=QoQpKIjoPcdk7v3kIbOs13-3iw4KCKtRr92_6q-6YOY"
                className="max-w-full rounded-lg object-cover"
                alt="Grocery and fresh products"
              />
            </div>
          </motion.div>

          <hr className="mt-5" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between md:gap-8"
          >
            {/* Left Section */}
            <div className="md:w-2/3 space-y-4">
              <p className="text-sm font-semibold text-yellow-600 md:text-base">
                Join the Movement &rarr;
              </p>
              <h1 className="text-xl font-bold text-yellow-700 md:text-3xl">
                Together, We Can Make a Difference
              </h1>
              <p className="text-sm text-yellow-600 md:text-base">
                At BringSmile Foundation, we believe in the power of collective
                effort. By supporting our cause, you can help transform lives,
                spread joy, and create lasting change in communities across the
                globe.
              </p>
              <div className="w-full md:w-2/3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuK-0ynvWi2_RiXGxkib-5iWYiDSyjVhNsxg&s"
                  className="w-full rounded-lg object-cover shadow"
                  alt="Convenient grocery shopping"
                />
              </div>
            </div>

            {/* Contact Card */}
            <motion.div
              className="flex-1 bg-white shadow-lg rounded-lg border border-gray-200 p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Contact Us
              </h2>
              <div className="space-y-4">
                {/* Operation Office */}
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    Operation Office
                  </h3>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-yellow-500 mt-1" size={20} />
                    <p className="text-gray-600 text-sm">
                      F-13/17, Jogabai Extension, Okhla, New Delhi- 110025.
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    Email Address
                  </h3>
                  <div className="flex items-start gap-2">
                    <MdAttachEmail className="text-yellow-500 mt-1" size={20} />
                    <p className="text-gray-600 text-sm">contact@bringsmile.in</p>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    Phone
                  </h3>
                  <div className="flex items-start gap-2">
                    <FaPhoneAlt className="text-yellow-500 mt-1" size={20} />
                    <p className="text-gray-600 text-sm">+91 9891989151</p>
                  </div>
                </div>

                {/* Registered Office */}
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-1">
                    Registered Office
                  </h3>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-yellow-500 mt-1" size={20} />
                    <p className="text-gray-600 text-sm">
                      Singhi Kalan, PO- Ara, District- Bhojpur, Bihar, Pin- 802301.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
