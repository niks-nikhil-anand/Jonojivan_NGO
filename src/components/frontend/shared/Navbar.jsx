'use client';
import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose, MdSearch, MdShoppingCart, MdFavoriteBorder } from 'react-icons/md'; 
import { FaUser } from 'react-icons/fa'; 
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../../../../public/annimatedIcons/grocery.png';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Shops', href: '/shops' },
  { name: 'Most Popular', href: '/most-popular' },
  { name: 'Best Deal', href: '/best-deal' },
  { name: 'Contact Us', href: '/contactUs' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', closeMenu);
    } else {
      document.removeEventListener('click', closeMenu);
    }

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative w-full h-full bg-white text-black shadow-md">
      <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Menu Button for Mobile View */}
        <div className="lg:hidden flex items-center space-x-2">
          <MdMenu onClick={toggleMenu} className="h-6 w-6 cursor-pointer text-black" />
        </div>
        {/* Logo */}
        <div className="inline-flex items-center space-x-2 flex-shrink-0">
          <Image src={logo} alt="Blush Belle Logo" width={30} height={30} />
          <Link href="/" className="font-bold text-black">Blush Belle</Link>
        </div>
        {/* Desktop Menu Items */}
        <div className="hidden lg:flex items-center flex-grow space-x-4 ml-10">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-black hover:bg-gray-200 px-4 py-2 rounded-md">
              {item.name}
            </Link>
          ))}
        </div>
        {/* Search Bar and Authentication Buttons */}
        <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-64 rounded-md bg-white py-2 px-4 text-sm text-black placeholder-gray-500 shadow-lg focus:outline-none"
            />
            <MdSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
          <Link href="/sign-in">
            <button className="bg-black text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-gray-800">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-white text-black border border-black py-2 px-4 rounded-md text-sm font-semibold hover:bg-gray-800">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-4 ml-4">
          <Link href="/wishlist">
            <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
              <MdFavoriteBorder className="h-6 w-6 text-black" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
            </motion.div>
          </Link>
          <Link href="/cart">
            <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
              <MdShoppingCart className="h-6 w-6 text-black" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-y-0 left-0 z-50 origin-left transform p-2 transition lg:hidden"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="divide-y-2 divide-gray-600 rounded-lg bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2">
                  <Image src={logo} alt="Blush Belle Logo" width={30} height={30} />
                  <span className="font-bold">Blush Belle</span>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="sr-only">Close menu</span>
                    <MdClose className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <Link key={item.name} href={item.href} className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold text-black hover:bg-gray-200">
                      <span className="ml-3 text-base font-medium">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="border-t border-gray-600 pt-2 my-4">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-md bg-white py-2 px-4 text-sm text-black placeholder-gray-500 shadow-lg focus:outline-none"
                  />
                  <MdSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </motion.div>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-gray-600">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 font-bold text-lg">
                  <FaUser className="h-6 w-6 text-black" />
                  <span>Accounts</span>
                </div>
                <Link href="/sign-in">
                  <button className="w-full rounded-md bg-black text-white py-2 px-4 text-sm font-semibold hover:bg-gray-800">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="w-full rounded-md bg-white text-black border border-black py-2 px-4 text-sm font-semibold hover:bg-gray-800">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-600 ">
              <Link href="/wishlist">
                <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
                  <MdFavoriteBorder className="h-6 w-6 text-black" />
                  <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
                </motion.div>
              </Link>
              <Link href="/cart">
                <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
                  <MdShoppingCart className="h-6 w-6 text-black" />
                  <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
