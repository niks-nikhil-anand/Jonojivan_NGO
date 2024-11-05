"use client";
import React, { useState } from 'react';
import { FaUserCircle, FaHome, FaCog, FaUser } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import { HiMoon, HiSun } from 'react-icons/hi'; 
import Image from 'next/image';
import logo from '../../../public/logo/logo.png';


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-lime-700 text-white transition-colors duration-300 shadow-lg">
  <div className="container mx-auto flex justify-between items-center p-4">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <Image src={logo} alt="Logo" className="w-[45px]" />
      <span className="text-lg font-bold">Admin Panel</span>
    </div>

    {/* Hamburger Menu for Mobile View */}
    <div className="block lg:hidden">
      <button className="text-2xl hover:text-yellow-400 transition-transform transform hover:scale-110 duration-200">
        <IoIosMenu />
      </button>
    </div>

    {/* Navigation Links */}
    <div className="hidden lg:flex space-x-6">
      <a
        href="#"
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300 shadow-md"
      >
        <FaHome className="text-lg" />
        <span>Dashboard</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300 shadow-md"
      >
        <FaCog className="text-lg" />
        <span>Settings</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300 shadow-md"
      >
        <FaUser className="text-lg" />
        <span>Profile</span>
      </a>
    </div>

    {/* Dark Mode Toggle and User Profile Icon */}
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleDarkMode}
        className="text-2xl hover:text-yellow-400 transition-transform transform hover:scale-110 duration-200"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <HiSun /> : <HiMoon />}
      </button>
      <FaUserCircle className="text-2xl text-gray-800 transition-transform transform hover:scale-110 duration-200" />
    </div>
  </div>
</nav>

  );
};

export default Navbar;
