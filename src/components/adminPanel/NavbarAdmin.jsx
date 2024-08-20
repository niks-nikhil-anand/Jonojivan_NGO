"use client"
import React, { useState } from 'react';
import { FaUserCircle, FaTachometerAlt, FaCog } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import { HiMoon, HiSun } from 'react-icons/hi'; // Import icons for dark mode toggle

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <nav className={`bg-gray-800 text-white ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} transition-colors duration-300`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-lg font-bold">Admin Panel</div>

        {/* Hamburger Menu for Mobile View */}
        <div className="block lg:hidden">
          <button className="text-2xl">
            <IoIosMenu />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-4">
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Settings</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Profile</a>
        </div>

        {/* Dark Mode Toggle */}
        

        {/* User Profile Icon */}
        <div className="flex items-center">
        <button
          onClick={toggleDarkMode}
          className="text-2xl ml-4"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <HiSun /> : <HiMoon />}
        </button>
          <FaUserCircle className="text-2xl ml-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
