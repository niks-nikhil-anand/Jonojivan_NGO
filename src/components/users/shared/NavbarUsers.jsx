'use client';
import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose, MdSearch, MdFavoriteBorder, MdShoppingCart } from 'react-icons/md'; 
import { FaChevronDown, FaUser } from 'react-icons/fa'; 
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

  return (
    <div className="relative w-full h-full bg-white text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <div className="lg:hidden flex items-center space-x-2">
          <MdMenu onClick={toggleMenu} className="h-7 w-7 cursor-pointer text-black" />
        </div>
        {/* Logo */}
        <div className="inline-flex items-center space-x-2 flex-shrink-0 ">
          <Image src={logo} alt="Blush Belle Logo" width={30} height={30} />
          <Link href="/" className="font-bold text-black">Blush Belle</Link>
        </div>
        <div className="lg:hidden flex items-center space-x-4 ml-4">
          <Link href="/auth/login">
            <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
              <MdFavoriteBorder className="h-7 w-7 text-black" />
              <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
            </motion.div>
          </Link>
          <Link href="/auth/login">
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
                className="inline-flex items-center space-x-2 text-black cursor-pointer hover:text-gray-300"
                onClick={toggleDropdown}
              >
                <FaUser className="h-6 w-6" />
                <span className="text-sm font-semibold">{userDetails.fullName}</span>
                <FaChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
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
                    <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          <div className="hidden lg:flex items-center space-x-4 ml-4">
            <Link href="/auth/signIn">
              <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
                <MdFavoriteBorder className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
              </motion.div>
            </Link>
            <Link href="/auth/signIn">
              <motion.div className="relative cursor-pointer" whileHover={{ scale: 1.05 }}>
                <MdShoppingCart className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1">0</span>
              </motion.div>
            </Link>
          </div>
        </div>
       
        {isMenuOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 z-50 origin-left transform p-2 transition lg:hidden navbar-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="divide-y-2 divide-gray-400 rounded-lg bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5">
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
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <MdClose className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link key={item.name} href={item.href} className="-m-3 p-3 block rounded-md hover:bg-gray-100">
                        <span className="text-base font-semibold text-black">{item.name}</span>
                      </Link>
                    ))}
                    {userDetails && (
                      <div>
                        <button
                          className="flex w-full items-center justify-between rounded-md p-3 text-black hover:bg-gray-100"
                          onClick={toggleDropdown}
                        >
                          <div className="flex items-center space-x-2">
                            <FaUser className="h-6 w-6" />
                            <span className="text-sm font-semibold">{userDetails.fullName}</span>
                          </div>
                          <FaChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isDropdownOpen && (
                          <motion.div
                            className="mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="py-1">
                              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                              <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                              <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                              <Link href="/coupons" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Coupons</Link>
                              <Link href="/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notifications</Link>
                              <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                    )}
                  </nav>
                  <div className="flex items-center justify-between px-5 py-3 border-t border-gray-600 mt-7">
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
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
