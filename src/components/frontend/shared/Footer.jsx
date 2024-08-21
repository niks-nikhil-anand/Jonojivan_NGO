"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';
import { AiFillApple, AiFillAndroid } from 'react-icons/ai';
import { IoLogoTwitter } from 'react-icons/io';
import Image from 'next/image'; // Assuming you're using Next.js
import logo from '../../../../public/annimatedIcons/grocery.png';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-black text-white py-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start px-4 sm:px-6 lg:px-8">
        <div className="mb-6 lg:mb-0 lg:w-1/4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-purple-800 p-2 rounded">
                <Image src={logo} alt="Blush Belle" height={50} width={50} />
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
            <motion.li
              className="mb-2 hover:underline cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Shops
            </motion.li>
            <motion.li
              className="mb-2 hover:underline cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Most Popular
            </motion.li>
            <Link href={"/blogs"}>
              <motion.li
                className="mb-2 hover:underline cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Blogs
              </motion.li>
            </Link>
            <motion.li
              className="mb-2 hover:underline cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Contact
            </motion.li>
          </ul>
        </div>

        {/* Company Info */}
        <div className="mb-6 lg:mb-0 lg:w-1/4">
          <h4 className="font-bold text-lg mb-3">Company</h4>
          <ul>
            <Link href={"/aboutUs"}>
              <motion.li
                className="mb-2 hover:underline cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                About us
              </motion.li>
            </Link>
            <Link href={"/returnPolicy"}>
              <motion.li
                className="mb-2 hover:underline cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Return Policy
              </motion.li>
            </Link>
            <Link href={"/termsAndConditions"}>
              <motion.li
                className="mb-2 hover:underline cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Terms & Conditions
              </motion.li>
            </Link>
            <Link href={"/privacyPolicy"}>
              <motion.li
                className="mb-2 hover:underline cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Privacy Policy
              </motion.li>
            </Link>
          </ul>
        </div>

        {/* Share Our Website */}
        <div className="lg:w-1/4">
          <h4 className="font-bold text-lg mb-3">Share Our Website</h4>
          <div className="flex space-x-3">
            <motion.a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaInstagram className="h-12 w-12 text-white bg-purple-800 p-2 rounded-full" />
            </motion.a>
            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaFacebookF className="h-12 w-12 text-white bg-purple-800 p-2 rounded-full" />
            </motion.a>
            <motion.a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaWhatsapp className="h-12 w-12 text-white bg-purple-800 p-2 rounded-full" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <IoLogoTwitter className="h-12 w-12 text-white bg-purple-800 p-2 rounded-full" />
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
