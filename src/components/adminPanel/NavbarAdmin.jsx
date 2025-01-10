"use client";
import React, { useState } from 'react';
import {  FaHome } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import { HiMoon, HiSun } from 'react-icons/hi'; 
import Image from 'next/image';
import { motion } from 'framer-motion';
import logo from '../../../public/logo/Smile.png';
import { toast } from 'react-hot-toast';
import { MdOutlineLogout } from "react-icons/md";  // Import the logout icon
import { useRouter } from 'next/navigation';




const Navbar = () => {
  const router = useRouter();

  

    const handleLogout = async () => {
      toast.loading('Logging out...', { id: 'logout' });
      try {
        const response = await fetch('/api/admin/auth/logout', {
          method: 'POST',
        });
        const data = await response.json();
        if (response.ok) {
          toast.success('Logged out successfully!', { id: 'logout' });
          router.push('/');
        } else {
          toast.error(`Logout failed: ${data.message}`, { id: 'logout' });
        }
      } catch (error) {
        toast.error(`Logout failed: ${error.message}`, { id: 'logout' });
      }
    };


  return (
    <nav className="bg-gray-50 dark:bg-gray-800 text-white transition-colors duration-300 shadow-lg">
  <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Heading */}
        <div className="flex items-center space-x-3">
          <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full shadow-md" />
          <h1 className="text-xl font-bold text-black">Bring Smile Admin Panel</h1>
        </div>

    {/* Hamburger Menu for Mobile View */}
    <div className="block lg:hidden">
      <button className="text-2xl hover:text-yellow-400 transition-transform transform hover:scale-110 duration-200">
        <IoIosMenu />
      </button>
    </div>

    <div className="flex items-center space-x-4">
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-300 shadow-md"
          >
            <MdOutlineLogout className="text-lg text-white" aria-hidden="true" />
            <span className="text-lg text-white">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

