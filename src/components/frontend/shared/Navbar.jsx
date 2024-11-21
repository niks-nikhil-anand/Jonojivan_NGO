"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 text-sm">
        <div className="text-center sm:text-left">
          Helping today <span className="text-red-500">❤</span> Helping tomorrow
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-4 mt-2 sm:mt-0">
          <span className="hidden sm:block">Email: support@bringsmile.in</span>
          <span className="hidden sm:block">Phone: (0312) 747-858</span>
          <span className="hidden sm:block">|</span>
          <span className="hidden md:block">Social network:</span>
          <div className="md:flex hidden  space-x-2">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white text-black">
        <motion.div whileHover={{ scale: 1.1 }} className="text-2xl font-bold">
          BringSmile<span className="text-orange-500">.</span>
        </motion.div>
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="hover:text-orange-500"
            >
              HOME
            </motion.a>
          </li>
          <li>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="hover:text-orange-500"
            >
              ABOUT US
            </motion.a>
          </li>
          <li>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="hover:text-orange-500"
            >
              CONTACT US
            </motion.a>
          </li>
          <li>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="hover:text-orange-500"
            >
              EVENTS
            </motion.a>
          </li>
          <li>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="#"
              className="hover:text-orange-500"
            >
              CAUSES
            </motion.a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <button className="hidden sm:flex items-center px-4 py-2 border border-black rounded-full hover:bg-orange-500 hover:text-white transition">
            Donate Now <span className="ml-2 text-red-500">❤</span>
          </button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            className="block md:hidden text-xl"
            onClick={handleMenuToggle}
          >
            MENU ☰
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed inset-0 bg-white text-black z-50 p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={handleMenuToggle}
              className="text-2xl hover:text-red-500"
            >
              <IoClose />
            </button>
          </div>
          <ul className="flex flex-col space-y-4 text-lg font-medium">
            <li className="hover:text-orange-500">HOME</li>
            <li className="hover:text-orange-500">ABOUT US</li>
            <li className="hover:text-orange-500">UPCOMING EVENTS</li>
            <li className="hover:text-orange-500">DONATION CAMPAIGNS</li>
            <li className="hover:text-orange-500">BECOME A VOLUNTEER</li>
            <li className="text-orange-500 font-bold">CONTACT US</li>
            <li className="hover:text-orange-500">FAQ&apos;S</li>
          </ul>
          <div className="mt-auto flex flex-wrap justify-between pt-6 border-t border-gray-300 text-sm">
            <a href="#" className="hover:text-orange-500">
              Ongoing Events →
            </a>
            <a href="#" className="hover:text-orange-500">
              Terms & Conditions →
            </a>
            <a href="#" className="hover:text-orange-500">
              Our Portfolio →
            </a>
            <a href="#" className="hover:text-orange-500">
              Privacy Policy →
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
