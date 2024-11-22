"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

export default function AboutPageOne() {
  return (
    <div>
      <div className="flex flex-col gap-10">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-[#FEE440] to-[#F4B03E] h-[60vh] flex justify-center items-center relative px-5">
          <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
            <motion.div
              className="mx-auto max-w-max rounded-full border-2 border-white bg-yellow-50 p-1 px-3 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-center text-xs font-semibold leading-normal text-yellow-800 md:text-sm">
                About BringSmile Foundation
              </p>
            </motion.div>
            <motion.p
              className="text-center text-xl font-bold text-yellow-900 md:text-5xl md:leading-10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Spreading Smiles, Transforming Lives
            </motion.p>
            <p className="mx-auto max-w-4xl text-sm text-center text-yellow-700 md:text-xl">
              The BringSmile Foundation is dedicated to uplifting communities by
              providing essential resources, fostering education, and supporting
              sustainable development. Together, we aim to create a brighter and
              happier future for everyone.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10 px-6 md:px-20 lg:px-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-16 flex flex-col md:flex-row gap-10 items-center"
          >
            <div className="flex flex-col gap-6 md:w-2/3">
              <p className="text-xl font-bold text-yellow-800 md:text-4xl">
                Empowering Communities, One Step at a Time
              </p>
              <p className="text-base text-yellow-700 md:text-xl">
                BringSmile Foundation works tirelessly to bridge the gap between
                resources and the underprivileged. From education and healthcare
                initiatives to providing daily essentials, our mission is to bring
                hope and happiness to those in need.
              </p>
              <p className="text-xl font-bold text-yellow-800 md:text-4xl">
                Supporting Healthier Lifestyles
              </p>
              <p className="text-base text-yellow-700 md:text-xl">
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
            className="flex flex-col items-center gap-6 py-8 px-4 md:flex-row md:justify-between md:gap-8"
          >
            {/* Left Section */}
            <div className="md:w-2/3 space-y-6">
              <p className="text-sm font-semibold text-yellow-600 md:text-lg">
                Join the Movement &rarr;
              </p>
              <h1 className="text-3xl font-bold text-yellow-700 md:text-4xl">
                Together, We Can Make a Difference
              </h1>
              <p className="text-base text-yellow-600 md:text-lg">
                At BringSmile Foundation, we believe in the power of collective
                effort. By supporting our cause, you can help transform lives,
                spread joy, and create lasting change in communities across the
                globe.
              </p>
              <div className="w-full md:w-1/2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuK-0ynvWi2_RiXGxkib-5iWYiDSyjVhNsxg&s"
                  className="w-full rounded-lg object-cover shadow-md"
                  alt="Convenient grocery shopping"
                />
              </div>
            </div>

            {/* Contact Card */}
            <div className="mt-8 max-w-sm w-full rounded-lg bg-yellow-50 shadow-lg p-6 border border-yellow-200">
              <h2 className="text-lg font-semibold text-yellow-900 mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-yellow-800">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center bg-yellow-200 rounded-full p-2">
                    <FaMapMarkerAlt className="h-5 w-5 text-yellow-700" />
                  </div>
                  <p className="text-base">
                    F-13/17, Jogabai Extention, Okhla, New Delhi- 110025.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center bg-yellow-200 rounded-full p-2">
                    <FaPhoneAlt className="h-5 w-5 text-yellow-700" />
                  </div>
                  <p className="text-base">+91 9891989151</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center bg-yellow-200 rounded-full p-2">
                    <MdAttachEmail className="h-5 w-5 text-yellow-700" />
                  </div>
                  <p className="text-base">contact@bringsmile.in</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
