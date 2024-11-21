"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-black text-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <div>
          Helping today <span className="text-red-500">❤</span> Helping tomorrow
        </div>
        <div className="flex space-x-4">
          <span>Email: support@bringsmile.in</span>
          <span>Phone: (0312) 747-858</span>
          <span className="hidden sm:block">|</span>
          <span>Social network:</span>
          <div className="flex space-x-2">
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
          <button className="flex items-center px-4 py-2 border border-black rounded-full hover:bg-orange-500 hover:text-white transition">
            Donate Now <span className="ml-2 text-red-500">❤</span>
          </button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            className="block md:hidden text-xl"
          >
            MENU ☰
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
