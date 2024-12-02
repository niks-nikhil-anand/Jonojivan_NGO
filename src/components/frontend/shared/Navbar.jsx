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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.div>
      {/* Top Info Bar */}
      <div className="bg-gray-100 justify-between items-center px-4 py-2 text-sm text-gray-600 hidden md:flex">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <FaCreditCard />
            <span className="hover:underline cursor-pointer">Payment Options</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCheckSquare />
            <span className="hover:underline cursor-pointer">Terms Conditions</span>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="hidden sm:flex">All information available in the news</div>
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt />
            <span>Malibu 453 blv</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaEnvelope />
            <span>info@charity.com</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-gray-800 text-white flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </div>

        {/* Links (Desktop Navbar) */}
        <ul className="hidden md:flex space-x-8">
          <li className="hover:text-gray-300 hover:underline cursor-pointer">HOME</li>
          <li className="hover:text-gray-300 hover:underline cursor-pointer">CAUSES</li>
          <li className="hover:text-gray-300 hover:underline cursor-pointer">GIVE</li>
          <li className="hover:text-gray-300 hover:underline cursor-pointer">ABOUT US</li>
          <li className="hover:text-gray-300 hover:underline cursor-pointer">PAGES</li>
          <li className="hover:text-gray-300 hover:underline cursor-pointer">SHOP</li>
          <li className="hover:text-gray-300 hover:underline cursor-pointer">BLOG</li>
          <li className="hover:text-gray-300 hover:underline cursor-pointer">CONTACT</li>
        </ul>

        {/* Donate Button (Desktop) */}
        <div className="hidden sm:block">
          <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded">
            DONATE NOW
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={handleMobileMenuToggle}
          >
            {isMobileMenuOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Navbar */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-[90vh] bg-gray-800 z-50 flex flex-col items-start justify-start p-6 space-y-6"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Close Button */}
          <button
            className="absolute top-6 right-6 text-white"
            onClick={handleMobileMenuToggle}
          >
            <FaTimes size={24} />
          </button>

          {/* Menu Links */}
          <ul className="text-white text-xl space-y-4 font-medium">
            <li className="hover:text-gray-300 hover:underline cursor-pointer">HOME</li>
            <li className="hover:text-gray-300 hover:underline cursor-pointer">CAUSES</li>
            <li className="hover:text-gray-300 hover:underline cursor-pointer">GIVE</li>
            <li className="hover:text-gray-300 hover:underline cursor-pointer">ABOUT US</li>
            <li className="hover:text-gray-300 hover:underline cursor-pointer">PAGES</li>
            <li className="hover:text-gray-300 hover:underline cursor-pointer">SHOP</li>
            <li className="hover:text-gray-300 hover:underline cursor-pointer">BLOG</li>
            <li className="hover:text-gray-300 hover:underline cursor-pointer">CONTACT</li>
          </ul>

          {/* Donate Button (Mobile) */}
          <div className="w-full flex justify-center">
            <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded">
              DONATE NOW
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
