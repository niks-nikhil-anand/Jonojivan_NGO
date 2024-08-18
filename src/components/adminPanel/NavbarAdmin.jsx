"use client"
import React, { useState } from 'react';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FcSettings } from "react-icons/fc";
import { motion } from "framer-motion";

const NavbarAdmin = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Admin Panel</div>
      <div className="text-xl font-bold">Flying Alpha</div>
      <button onClick={toggleSidebar} className="md:hidden block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="hidden md:flex items-center gap-6">
        <motion.button
          onClick={toggleDarkMode}
          className="p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? (
            <MdLightMode className="w-8 h-8 text-yellow-400" />
          ) : (
            <MdDarkMode className="w-8 h-8 text-blue-400" />
          )}
        </motion.button>
        <motion.button
          className="p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IoIosNotifications className="w-8 h-8 text-red-400" />
        </motion.button>
        <motion.button
          className="p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FcSettings className="w-8 h-8" />
        </motion.button>
        <div className="relative group">
          <motion.button
            className="p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CgProfile className="w-8 h-8 text-green-400" />
          </motion.button>
          <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-20">
            <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
            <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
            <a href="#" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
