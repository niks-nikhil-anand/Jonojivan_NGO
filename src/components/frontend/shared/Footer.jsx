"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../../../public/logo/Smile.png";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/frontend/footerImage/image1.jpg",
  "/frontend/footerImage/image2.jpg",
  "/frontend/footerImage/image3.jpg",
  "/frontend/footerImage/image4.jpg",
  "/frontend/footerImage/image5.jpg",
  "/frontend/footerImage/image6.jpg",
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Logo & Address */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={50} height={50} />
            <h1 className="text-xl font-semibold">BringSmile Foundation</h1>
          </div>
          <p>Email: <a href="mailto:support@bringsmile.org" className="hover:underline">support@bringsmile.org</a></p>
          <p>Tel: <a href="tel:+9195993 22679" className="hover:underline">+91 95993 22679</a></p>
          <p>Singhi Kalan, PO- Ara, District- Bhojpur, Bihar, Pin- 802301.</p>
          <button className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition">GET DIRECTIONS</button>
        </div>

        {/* Useful Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">Our Programs</a>
            </li>
            <li>
              <Link href={"/ourMission"} className="hover:underline">Our Mission</Link>
            </li>
            <li>
              <Link href={"/blog"} className="hover:underline">Impact Stories</Link>
            </li>
            <li>
              <Link href={"/aboutUs"} className="hover:underline">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Image Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Get In Touch</h2>
          <motion.div
        className="grid grid-cols-3 gap-4  sm:grid-cols-2 xs:grid-cols-1 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Footer Image ${index + 1}`}
            width={200}
            height={200}
            className="rounded-lg shadow-lg object-cover"
          />
        ))}
      </motion.div>

        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-xl hover:text-yellow-500 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="text-xl hover:text-yellow-500 transition">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl hover:text-yellow-500 transition">
            <FaInstagram />
          </a>
          <a href="#" className="text-xl hover:text-yellow-500 transition">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <div className="text-sm space-x-4">
          <Link href={"/returnPolicy"} className="hover:underline">Return Policy</Link>
          <Link href={"/privacyPolicy"} className="hover:underline">Privacy Policy</Link>
          <Link href={"/termsAndConditions"} className="hover:underline">Terms of Use</Link>
        </div>
        <p className="text-gray-500 mt-4">BringSmile Foundation © 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
