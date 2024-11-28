"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaChild, FaSchool, FaHandsHelping } from "react-icons/fa";  // Updated icons

const CausesSection = () => {
  const causes = [
    {
      title: "Empower Women & Girls",
      description:
        "Supporting education, gender equality, and women's empowerment to uplift marginalized women and girls.",
      icon: <FaHandsHelping size={28} />,
    },
    {
      title: "Support Children's Education",
      description:
        "Providing education, nutrition, and protection for marginalized children to break the cycle of poverty.",
      icon: <FaSchool size={28} />,
    },
    {
      title: "Aid Vulnerable Communities",
      description:
        "Your support helps vulnerable communities with essential resources to improve their lives.",
      icon: <FaChild size={28} />,
    },
  ];

  return (
    <div className="bg-[#FEF7EC] py-12 px-6 ">
  {/* Title Section */}
  <div className="text-center mb-10">
    <h3 className="text-sm text-[#FF0080] font-semibold uppercase mb-2">
      Benefits of Giving
    </h3>
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
      Benefits of Giving to Bring Smile
    </h2>
  </div>

  {/* Causes Cards */}
  <div className="flex flex-wrap justify-center gap-6 ">
    {causes.map((cause, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        className="bg-transparent shadow-md rounded-2xl p-6 text-center border border-[#F4B03E] w-full sm:w-80 md:w-72 lg:w-80 h-auto sm:h-80 "
      >
        <div className="flex justify-center items-center w-16 h-16 rounded-full bg-[#F4B03E] text-white mx-auto mb-6">
          {cause.icon}
        </div>
        <h4 className="text-xl font-semibold text-[#FF0080] mb-3">
          {cause.title}
        </h4>
        <p className="text-gray-600 text-sm">{cause.description}</p>
      </motion.div>
    ))}
  </div>
</div>

  );
};

export default CausesSection;
