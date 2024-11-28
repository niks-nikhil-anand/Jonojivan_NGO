"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import logo from '../../../../public/logo/SmileNoBg.png'
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 text-sm">
        <div className="text-center sm:text-left">
          Helping today <span className="text-red-500">❤</span> Helping tomorrow
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-4 mt-2 sm:mt-0">
          <span className="hidden sm:block">Email: support@bringsmile.in</span>
          <span className="hidden sm:block">Phone: (0312) 747-858</span>
          <span className="hidden sm:block">|</span>
          <span className="hidden md:block">Social network:</span>
          <div className="md:flex hidden  space-x-2">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaYoutube />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-yellow-400"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="flex justify-between items-center px-6  bg-white text-black">
              <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Starting state
          animate={{ opacity: 1, scale: 1 }}  // Final state
          transition={{ duration: 0.5, ease: "easeInOut" }} // Animation timing
          whileHover={{ scale: 1.1 }} // Hover effect
          className="flex items-center space-x-3"
        >
          <Link href={"/"}>
            <Image src={logo} alt="BringSmile Logo" width={70} height={70} />
          </Link>
        </motion.div>
        <ul className="hidden md:flex space-x-6 font-medium">
            {[
              { href: "/", label: "HOME" },
              { href: "/aboutUs", label: "ABOUT US" },
              { href: "/contactUs", label: "CONTACT US" },
              { href: "#", label: "EVENTS" },
              { href: "#", label: "CAUSES" },
            ].map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1, color: "#FF0080" }} // Framer Motion animation
                transition={{ duration: 0.3 }} // Smooth transition
              >
                <Link
                  href={item.href}
                  className="hover:text-[#FF0080] hover:underline transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        <div className="flex items-center space-x-4">
         <button className="hidden sm:flex items-center px-4 py-2 border border-black rounded-full transition hover:bg-[#FF0080] hover:text-white">
        Donate Now <span className="ml-2 text-red-500">❤</span>
      </button>

          <motion.button
            whileHover={{ scale: 1.2 }}
            className="block md:hidden text-xl"
            onClick={handleMenuToggle}
          >
            MENU ☰
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed inset-0 bg-white text-black z-50 p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={handleMenuToggle}
              className="text-2xl hover:text-red-500"
            >
              <IoClose />
            </button>
          </div>
          <ul className="flex flex-col space-y-4 text-lg font-medium">
            <Link href={"/"}>
            <li className="hover:text-orange-500">HOME</li>
            </Link>
            <Link href={"/aboutUs"}>
            <li className="hover:text-orange-500">ABOUT US</li>
            </Link>
            <li className="hover:text-orange-500">UPCOMING EVENTS</li>
            <li className="hover:text-orange-500">DONATION CAMPAIGNS</li>
            <li className="hover:text-orange-500">BECOME A VOLUNTEER</li>
            <li className="text-orange-500 font-bold">CONTACT US</li>
            <li className="hover:text-orange-500">FAQ&apos;S</li>
          </ul>
          <div className="mt-auto flex flex-wrap justify-between pt-6 border-t border-gray-300 text-sm">
            <a href="#" className="hover:text-orange-500">
              Ongoing Events →
            </a>
            <Link href={"/termsAndConditions"} className="hover:text-orange-500">
              Terms & Conditions →
            </Link>
            <Link href={"/returnPolicy"} className="hover:text-orange-500">
              Refund and Returns Policy →
            </Link>
            <Link href={"/privacyPolicy"} className="hover:text-orange-500">
              Privacy Policy →
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
