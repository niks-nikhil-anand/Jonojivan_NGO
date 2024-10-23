'use client';
import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose, MdSearch, MdFavoriteBorder, MdShoppingCart } from 'react-icons/md'; 
import { FaChevronDown, FaUser } from 'react-icons/fa'; 
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo from '../../../../public/annimatedIcons/grocery.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/users/userDetails/cookies');
        const data = await response.json();
        setUserDetails(data[0]);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('.navbar-menu')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const menuItems = [
    { name: 'Home', href: `/users/${userDetails?._id}/cart` },
    { name: 'Shops', href: `/users/${userDetails?._id}/cart` },
    { name: 'Most Popular', href: `/users/${userDetails?._id}/cart` },
    { name: 'Best Deal', href: '/best-deal' },
    { name: 'Contact Us', href: '/contactUs' },
  ];

  return (
    <div className="relative w-full h-full bg-white text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="lg:hidden flex items-center space-x-2">
          <MdMenu onClick={toggleMenu} className="h-7 w-7 cursor-pointer text-black" />
        </div>
        {/* Logo */}
        <div className="inline-flex items-center space-x-2 flex-shrink-0">
          <Image src={logo} alt="Blush Belle Logo" width={30} height={30} />
          <Link href={`/users/${userDetails?._id}`} className="font-bold text-black">Blush Belle</Link>
        </div>
        <div className="lg:hidden flex items-center space-x-4 ml-4">
          <Link href={`/users/${userDetails?._id}/cart`}>
            <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
              <MdFavoriteBorder className="h-7 w-7 text-black" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
            </motion.div>
          </Link>
          <Link href={`/users/${userDetails?._id}/cart`}>
            <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
              <MdShoppingCart className="h-7 w-7 text-black" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
            </motion.div>
          </Link>
        </div>
        
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="inline-flex items-center text-sm font-semibold text-black hover:text-gray-600">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex items-center space-x-4 relative">
          <motion.div
            className="relative w-72"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md bg-gray-200 py-2 px-4 text-sm text-black placeholder-gray-500 shadow-lg focus:outline-none"
            />
            <MdSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-600" />
          </motion.div>
          {userDetails && (
            <div className="relative">
              <div
                className="inline-flex items-center space-x-2 text-black cursor-pointer"
                onClick={toggleDropdown}
              >
                <FaUser className="h-6 w-6" />
                <span className="text-sm font-semibold">{userDetails.fullName}</span>
                <FaChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                      <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                      <Link href="/coupons" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Coupons</Link>
                      <Link href="/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notifications</Link>
                      <Link href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <div className="hidden lg:flex items-center space-x-4 ml-4">
            <Link href={`/users/${userDetails?._id}/cart`}>
              <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
                <MdFavoriteBorder className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
              </motion.div>
            </Link>
            <Link href={`/users/${userDetails?._id}/cart`}>
              <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
                <MdShoppingCart className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 left-0 z-40 bg-white shadow-lg"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4">
              <MdClose onClick={toggleMenu} className="h-7 w-7 text-black cursor-pointer" />
              <div className="mt-4">
                <ul className="space-y-4">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="block text-lg font-semibold text-black hover:text-gray-600">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {userDetails && (
                <div className="mt-4 space-y-2">
                  <Link href="/profile" className="block text-sm text-black hover:text-gray-600">My Profile</Link>
                  <Link href="/orders" className="block text-sm text-black hover:text-gray-600">Orders</Link>
                  <Link href="/wishlist" className="block text-sm text-black hover:text-gray-600">Wishlist</Link>
                  <Link href="/coupons" className="block text-sm text-black hover:text-gray-600">Coupons</Link>
                  <Link href="/notifications" className="block text-sm text-black hover:text-gray-600">Notifications</Link>
                  <Link href="#" onClick={handleLogout} className="block text-sm text-black hover:text-gray-600">Logout</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
