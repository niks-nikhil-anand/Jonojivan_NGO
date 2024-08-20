'use client';
import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose, MdSearch } from 'react-icons/md'; 
import { FaChevronRight, FaUser } from 'react-icons/fa'; 
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

  const toggleMenu = () => {
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
    <div className="relative w-full h-full bg-purple-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Image src={logo} alt="Flying Alpha Logo" width={30} height={30} />
          <Link href="/" className="font-bold text-white">Blush Belle</Link>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="inline-flex items-center text-sm font-semibold text-white hover:text-gray-300">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
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
      className="w-full rounded-md bg-white py-2 px-4 text-sm text-black placeholder-gray-500 shadow-lg focus:outline-none"
    />
    <MdSearch className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
  </motion.div>
  <Link href={"/auth/register"}>
    <motion.div
      className="inline-flex items-center space-x-2 text-white cursor-pointer hover:text-gray-300"
      whileHover={{ scale: 1.05 }}
    >
       <FaUser className="h-6 w-6  " />
     
      <span className="text-sm font-semibold">Login/Register</span>
     
    </motion.div>
  </Link>
</div>
        <div className="lg:hidden">
          <MdMenu onClick={(e) => { e.stopPropagation(); toggleMenu(); }} className="h-6 w-6 cursor-pointer text-white" />
        </div>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-y-0 left-0 z-50 origin-left transform p-2 transition lg:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="divide-y-2 divide-gray-600 rounded-lg bg-gray-800 text-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Image src={logo} alt="Flying Alpha Logo" width={30} height={30} />
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
                <div className="mt-2 space-y-2">
                  <div className="border-t border-b mb-5 border-gray-600 py-4 pl-4">
                    <Link href="/auth/register">
                      <div className="inline-flex items-center space-x-2 text-white cursor-pointer mx-auto hover:text-gray-300">
                        <FaUser className="h-6 w-6" />
                        <span className="text-sm font-semibold">Login/Register</span>
                      </div>
                    </Link>
                  </div>
                  
                </div>
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link key={item.name} href={item.href} className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold text-white hover:bg-gray-700">
                        <span className="ml-3 text-base font-medium">
                          {item.name}
                        </span>
                        <span>
                          <FaChevronRight className="ml-3 h-4 w-4" />
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="border-t border-gray-600 pt-2 my-4 ">
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
