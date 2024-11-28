import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const images = [
    "/frontend/footerImage/image1.jpg",
    "/frontend/footerImage/image2.jpg",
    "/frontend/footerImage/image3.jpg",
    "/frontend/footerImage/image4.jpg",
    "/frontend/footerImage/image5.webp",
    "/frontend/footerImage/image6.jpg",
  ];

  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Know about <span className="text-[#FF0080]">Bring Smile Foundation</span>
          </motion.h2>
          <ul className="space-y-2">
            <li>
              <Link
                href={"/"}
                className="hover:text-yellow-500"
                whileHover={{ scale: 1.1 }}
              >
                HOME
              </Link>
            </li>
            
            <li>
              <Link
                href={"/aboutUs"}
                className="hover:text-yellow-500"
                whileHover={{ scale: 1.1 }}
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                href={"/contactUs"}
                className="hover:text-yellow-500"
                whileHover={{ scale: 1.1 }}
              >
                CONTACT US
              </Link>
            </li>
            <li>
              <motion.a
                href="#"
                className="hover:text-yellow-500"
                whileHover={{ scale: 1.1 }}
              >
                EVENTS
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                className="hover:text-yellow-500"
                whileHover={{ scale: 1.1 }}
              >
                DONATE
              </motion.a>
            </li>
          </ul>
          <p className="mt-4 text-sm md:text-base text-gray-400">support@bringsmile.in</p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4">NEW HIGHLIGHTS</h3>
          <div className="space-y-4">
            <div className="flex space-x-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWpUocakbrozKWu46pKtUHlv3h9gYOg6HyOA&s"
                alt="Highlight 1"
                className="w-14 h-14 md:w-16 md:h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-bold text-sm md:text-base">Sees boom in younger volunteers</h4>
                <p className="text-xs md:text-sm text-gray-400">September 14, 2024</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMyAVcM5573bNCm7iwR-DgTnFLgxD3GMR2JA&s"
                alt="Highlight 2"
                className="w-14 h-14 md:w-16 md:h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-bold text-sm md:text-base">
                  Breaking Barriers: Empowering Women in Sports
                </h4>
                <p className="text-xs md:text-sm text-gray-400">June 11, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-4">NEW HIGHLIGHTS</h3>
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Highlight ${index + 1}`}
                className="w-full h-12 md:h-16 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm md:text-base">
            © All rights reserved 2024 <span className="font-bold text-[#FF0080]">BringSmile Foundation</span>
          </p>
          <div className="flex space-x-4 items-center">
            <Link
              href={"/privacyPolicy"}
              className="bg-white text-black px-3 py-1 text-xs md:text-sm rounded shadow hover:bg-[#FF0080] hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
             href={"/returnPolicy"}
              className="bg-white text-black px-3 py-1 text-xs md:text-sm rounded shadow hover:bg-[#FF0080] hover:text-white"
            >
              Refund and Returns Policy
            </Link>
            <Link
              href={"/termsAndConditions"}
              className="bg-white text-black px-3 py-1 text-xs md:text-sm rounded shadow hover:bg-[#FF0080] hover:text-white"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
