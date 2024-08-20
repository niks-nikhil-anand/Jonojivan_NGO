"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';
import { AiFillApple, AiFillAndroid } from 'react-icons/ai';
import Image from 'next/image'; // Assuming you're using Next.js
import logo from '../../../../public/annimatedIcons/grocery.png';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-purple-900 text-white py-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start px-4 sm:px-6 lg:px-8">
        <div className="mb-6 lg:mb-0 lg:w-1/4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-purple-800 p-2 rounded">
                <Image src={logo} alt="Ready eCommerce" height={50} width={50} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Blush Belle</h4>
                <p className="text-sm">
                  The ultimate all-in-one solution for your eCommerce business worldwide
                </p>
              </div>
            </div>
          </motion.div>
          <div className="mt-4">
            <div className="flex items-center space-x-3 mb-2">
              <MdPhone className="h-6 w-6 text-white" />
              <span>01963953998</span>
            </div>
            <div className="flex items-center space-x-3">
              <MdEmail className="h-6 w-6 text-white" />
              <span>support@myblushbelle.com</span>
            </div>
          </div>
          <div className="flex mt-4 space-x-3">
            <motion.a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaLinkedin className="h-8 w-8 text-white bg-purple-800 p-2 rounded-full" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaYoutube className="h-8 w-8 text-white bg-purple-800 p-2 rounded-full" />
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-6 lg:mb-0 lg:w-1/4">
          <h4 className="font-bold text-lg mb-3">Quick Links</h4>
          <ul>
            <li className="mb-2 hover:underline cursor-pointer">Shops</li>
            <li className="mb-2 hover:underline cursor-pointer">Most Popular</li>
            <li className="mb-2 hover:underline cursor-pointer">Best Deal</li>
            <li className="mb-2 hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Company Info */}
        <div className="mb-6 lg:mb-0 lg:w-1/4">
          <h4 className="font-bold text-lg mb-3">Company</h4>
          <ul>
            <Link href={"/aboutUs"}>
            <li className="mb-2 hover:underline cursor-pointer">About us</li>
            </Link>
            <Link href={"/returnPolicy"}>
            <li className="mb-2 hover:underline cursor-pointer">Return Policy</li>
            </Link>
            <li className="mb-2 hover:underline cursor-pointer">Terms & Conditions</li>
           <Link href={"/privacyPolicy"}>
            <li className="mb-2 hover:underline cursor-pointer">Privacy Policy</li>
           </Link>

          </ul>
        </div>

        <div className="lg:w-1/4">
          <h4 className="font-bold text-lg mb-3">Download our app</h4>
          <div className="flex space-x-3">
            <motion.a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <AiFillApple className="h-12 w-12 text-white bg-purple-800 p-2 rounded-lg" />
            </motion.a>
            <motion.a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <AiFillAndroid className="h-12 w-12 text-white bg-purple-800 p-2 rounded-lg" />
            </motion.a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center border-t border-purple-700 pt-6 text-sm">
        © 2024 All rights reserved by Blush Belle
      </div>
    </div>
  );
}
