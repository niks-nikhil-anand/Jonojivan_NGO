"use client"
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../../../public/logo/Smile.png";
import Image from "next/image";


const images = [
  "/frontend/footerImage/image1.jpg",
  "/frontend/footerImage/image2.jpg",
  "/frontend/footerImage/image3.jpg",
  "/frontend/footerImage/image4.jpg",
  "/frontend/footerImage/image5.webp",
  "/frontend/footerImage/image6.jpg",
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Address */}
        <div>
        <div className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </div>
          <p>Email: support@bringsmile.org</p>
          <p>Tel: +41 22 345 66 77</p>
          <p>F-13/17, Jogabai Extension, Okhla</p>
          <p>New Delhi- 110025.</p>
          <button className="mt-4 underline">GET DIRECTIONS</button>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Our Programs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Impact Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Image Grid */}
        <div>
          <h2 className="text-lg font-bold mb-4">Get In Touch</h2>
          <motion.div
            className="grid grid-cols-3 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Footer Image ${index + 1}`}
                className="h-20 w-20 object-cover"
              />
            ))}
          </motion.div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-yellow-500">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="hover:text-yellow-500">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-yellow-500">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-yellow-500">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <div className="text-sm space-x-4">
          <a href="#" className="hover:underline">
            Blog & News
          </a>
          <a href="#" className="hover:underline">
            FAQs
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
        </div>
        <p className="text-gray-500 mt-4">
        BringSmile Foundation © 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
