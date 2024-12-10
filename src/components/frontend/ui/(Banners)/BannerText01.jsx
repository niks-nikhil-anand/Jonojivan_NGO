"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import tuition from "../../../../../public/frontend/AboutUs/tuition.png";
import main from "../../../../../public/frontend/AboutUs/main.jpg";
import school from "../../../../../public/frontend/AboutUs/school.png";
import student from "../../../../../public/frontend/AboutUs/student.png";
import woman from "../../../../../public/frontend/AboutUs/woman.png";
import GenderEquality from "../../../../../public/frontend/AboutUs/GenderEquality.png";

const CausesSection = () => {
  return (
    <div className="bg-[#f7f8fc] py-12 px-4">
      <div className="max-w-screen-xl mx-auto relative">
        <motion.div
          className="w-full px-4 flex flex-col justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-2xl font-bold text-[#1d1d1f] mb-6 leading-tight text-center">
            Mission in Motion: Discover{" "}
            <span className="text-[#ff5a5f]">Our Charitable Purpose</span>
          </h2>
          <p className="text-lg text-[#3d3d3f] mb-8 text-center">
            This future is within your reach. Donate today, and be the force that
            transforms lives.
          </p>

          <div className="grid gap-6 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md bg-white hover:shadow-lg hover:scale-105 transition transform duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={cause.icon}
                  alt={cause.title}
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <h4 className="text-lg font-semibold text-[#1d1d1f] mb-2">
                  {cause.title}
                </h4>
                <p className="text-sm text-[#6c757d]">{cause.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CausesSection;
