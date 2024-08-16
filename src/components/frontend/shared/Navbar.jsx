'use client';
import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md'; 
import { FaHome, FaChevronRight } from 'react-icons/fa'; 
import Link from 'next/link';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/aboutUs' },
  { name: 'Contact', href: '/contactUs' },
  { name: 'Properties', href: '/projects' },
  { name: 'News', href: '/news' },
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
    <div className="relative w-full h-full bg-gray-800 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <FaHome size={30} />
          </span>
          <Link href="/" className="font-bold text-white">Flying Alpha</Link>
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
        <div className="hidden space-x-2 lg:block">
          <Link href="/admin">
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-semibold text-white bg-black border border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign In
            </button>
          </Link>
          <Link href="/becomePartner">
            <motion.button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              Become Partner
            </motion.button>
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
                    <span>
                      <FaHome size={30} />
                    </span>
                    <span className="font-bold">Flying Alpha</span>
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
                <div className="mt-2 space-y-2">
                  <div className="border-t border-gray-600 pt-2">
                    <Link href="/admin">
                      <button
                        type="button"
                        className="w-full rounded-md border border-white px-3 py-2 text-sm font-semibold text-white bg-gray-800 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Sign In
                      </button>
                    </Link>
                  </div>
                  <Link href="/becomePartner">
                    <motion.button
                      type="button"
                      className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      Become Partner
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
