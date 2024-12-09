"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import tuition from "../../../../../public/frontend/AboutUs/tuition.png";
import main from "../../../../../public/frontend/AboutUs/main.jpg";
import image1 from "../../../../../public/frontend/AboutUs/image1.jpg";
import image2 from "../../../../../public/frontend/AboutUs/image2.jpg";
import image3 from "../../../../../public/frontend/AboutUs/image3.jpg";
import image4 from "../../../../../public/frontend/AboutUs/image4.jpg";
import school from "../../../../../public/frontend/AboutUs/school.png";
import student from "../../../../../public/frontend/AboutUs/student.png";
import woman from "../../../../../public/frontend/AboutUs/woman.png";
import GenderEquality from "../../../../../public/frontend/AboutUs/GenderEquality.png";

const CausesSection = () => {
  return (
    <div className="bg-[#f7f8fc] py-12 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center">
        {/* Left Section */}
        <motion.div
  className="w-full md:w-1/2 mb-8 md:mb-0 flex flex-col items-center"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <Image
    src={main}
    alt="Volunteers serving food"
    className="rounded-7xl"
    layout="responsive"
    width={500}
    height={400}
  />
  {/* Small Images */}
  <div className="flex justify-center space-x-4 mt-6">
    {[image1, image2, image3, image4].map((image, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
       <Image
            src={image}
            alt={`Small image ${index + 1}`}
            width={120}  // Adjust width as needed
            height={80}  // Adjust height to make it rectangular
            className="rounded-7xl border-1 border-gray-200 shadow-lg hover:shadow-2xl hover:border-[#ff3b3f] transition-all duration-300 cursor-pointer 
              sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-36 lg:h-28"
          />

      </motion.div>
    ))}
  </div>
</motion.div>


        {/* Right Section */}
        <motion.div
  className="w-full md:w-1/2 px-4 flex flex-col justify-center items-start"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <h2 className="text-3xl font-bold text-[#1d1d1f] mb-6 leading-tight">
    Mission in Motion: Discover{" "}
    <span className="text-[#ff5a5f]">Our Charitable Purpose</span>
  </h2>
  <p className="text-lg text-[#3d3d3f] mb-8">
    This future is within your reach. Donate today, and be the force that
    transforms lives.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
    {[
      {
        icon: student,
        title: "Girl Child Education",
        description:
          "Your donation empowers girls to dream, rise above circumstances, and build a life filled with possibilities.",
      },
      {
        icon: woman,
        title: "Skill Development for Women",
        description:
          "Equip women with skills to achieve financial independence and break cycles of poverty.",
      },
      {
        icon: tuition,
        title: "Tuition Classes for Quality Education",
        description:
          "Help underprivileged children excel in their studies with personalized academic support.",
      },
      {
        icon: school,
        title: "Building a School",
        description:
          "Create safe, inspiring spaces where children can learn, grow, and dream big.",
      },
      {
        icon: GenderEquality,
        title: "Women Empowerment & Gender Equality",
        description:
          "Support women and girls to fight for their rights and unlock their full potential.",
      },
    ].map((cause, index) => (
      <div
        key={index}
        className="flex items-start space-x-4 p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition"
      >
        <Image src={cause.icon} alt={cause.title} width={50} height={50}/>
        <div>
          <h4 className="text-lg font-semibold text-[#1d1d1f] mb-2">
            {cause.title}
          </h4>
          <p className="text-sm text-[#6c757d]">{cause.description}</p>
        </div>
      </div>
    ))}
  </div>


</motion.div>

      </div>
    </div>
  );
};

export default CausesSection;
