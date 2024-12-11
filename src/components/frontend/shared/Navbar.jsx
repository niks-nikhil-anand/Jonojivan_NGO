"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaCheckSquare,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../../../../public/logo/Smile.png";
import Image from "next/image";
import Link from "next/link";
import CustomDonationForm from "../ui/CustomDonationForm";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Functions to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.div>
      {/* Top Info Bar */}
      <div className="bg-gray-100 justify-between items-center px-6 py-2 text-sm text-gray-600 hidden md:flex">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <FaCreditCard />
            <span className="hover:underline cursor-pointer">Multiple Payment Options</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckSquare />
            <Link href={"/termsAndConditions"}>
            <span className="hover:underline cursor-pointer">Terms Conditions</span>
            </Link>
          </div>
        </div>
        <div className="flex space-x-6 items-center">
          <div className="hidden sm:flex">All information available in the news</div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt />
            <span>Jogabai Extension, Okhla, New Delhi</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope />
            <span>contact@bringsmile.org</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className="bg-gray-800 text-white flex items-center justify-between px-8 py-4 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={logo} alt="Logo" width={50} height={50} />
        </motion.div>

        {/* Links (Desktop Navbar) */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {[
            { href: "/", label: "HOME" },
            { href: "/causes", label: "CAUSES" },
            { href: "/aboutUs", label: "ABOUT US" },
            { href: "/Faqs", label: "FAQs" },
            { href: "/blog", label: "BLOG" },
            { href: "/contactUs", label: "CONTACT" },
          ].map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className="text-gray-300 hover:text-teal-400 hover:underline transition duration-300"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Donate Button (Desktop) */}
        <div className="hidden sm:block">
          <motion.button
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
          >
            DONATE NOW
          </motion.button>
        </div>

        {isModalOpen && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CustomDonationForm setIsModalOpen={setIsModalOpen} />
        </motion.div>
      )}

        {/* Mobile Menu Icon */}
        <div
          className="text-white text-2xl md:hidden cursor-pointer"
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Full Screen Mobile Navbar */}
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-[90vh] bg-gray-800 z-50 flex flex-col p-6 space-y-6"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile Close Button */}
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={handleMobileMenuToggle}
            >
              <FaTimes />
            </button>

            {/* Menu Links */}
            <ul className="text-white text-lg space-y-6 font-medium">
              {[
                 { href: "/", label: "HOME" },
                 { href: "/causes", label: "CAUSES" },
                 { href: "/aboutUs", label: "ABOUT US" },
                 { href: "/Faqs", label: "FAQs" },
                 { href: "/blog", label: "BLOG" },
                 { href: "/contactUs", label: "CONTACT" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-300 hover:underline cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Donate Button (Mobile) */}
            <div className="w-full flex justify-center">
              <button className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded shadow-lg">
                DONATE NOW
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </motion.div>
  );
};

export default Navbar;
