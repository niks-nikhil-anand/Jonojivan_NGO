"use client";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";
import logo from "../../../../public/logo/logo.jpg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Logo & Contact Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center"
            >
              <Image src={logo} alt="Plan to Empower Logo" width={220} height={90} className="sm:w-48 sm:h-24" />
            </motion.div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-[#e91e63] flex-shrink-0" />
                <a href="mailto:support@plantoempowerfoundation.org" className="hover:text-[#e91e63] transition-colors break-all">
                  support@plantoempowerfoundation.org
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-[#e91e63] flex-shrink-0" />
                <a href="tel:+919599322679" className="hover:text-[#e91e63] transition-colors">
                  +91 95993 22679
                </a>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-[#e91e63] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Singhi Kalan, PO- Ara, District- Bhojpur, Bihar, Pin- 802301.</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-2">
              <Button className="bg-[#e91e63] hover:bg-[#d81b60] text-white shadow-md w-full sm:w-auto">
                GET DIRECTIONS
              </Button>
            </motion.div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-lg font-semibold text-white">Useful Links</h2>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link 
                  href="/ourProgram" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link 
                  href="/ourMission" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link 
                  href="/impactStories" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link 
                  href="/aboutUs" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link 
                  href="/how-we-work" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  How We Work
                </Link>
              </li>
              <li>
                <Link 
                  href="/Campaign" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  News & Updates
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/donate-now" 
                  className="text-sm text-gray-300 hover:text-[#e91e63] transition-colors hover:underline block"
                >
                  Donate Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link 
                  href="https://www.facebook.com/PlanToEmpowerFoundation" 
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-[#e91e63] hover:text-white transition-colors"
                >
                  <FaFacebookF className="text-sm" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link 
                  href="https://x.com/plantoempowerfoundation" 
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-[#e91e63] hover:text-white transition-colors"
                >
                  <FaTwitter className="text-sm" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link 
                  href="https://www.instagram.com/PlanToEmpowerFoundation" 
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-[#e91e63] hover:text-white transition-colors"
                >
                  <FaInstagram className="text-sm" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link 
                  href="https://www.linkedin.com/in/plantoempowerfoundation/" 
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-[#e91e63] hover:text-white transition-colors"
                >
                  <FaLinkedin className="text-sm" />
                </Link>
              </motion.div>
            </div>
            
            <div className="pt-2 lg:pt-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                Empowering communities through sustainable development and social change.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-sm">
              <Link 
                href="/returnPolicy" 
                className="text-gray-400 hover:text-[#e91e63] transition-colors hover:underline"
              >
                Return Policy
              </Link>
              <Link 
                href="/privacyPolicy" 
                className="text-gray-400 hover:text-[#e91e63] transition-colors hover:underline"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/termsAndConditions" 
                className="text-gray-400 hover:text-[#e91e63] transition-colors hover:underline"
              >
                Terms of Use
              </Link>
            </div>
            <p className="text-sm text-gray-500 text-center sm:text-right">
              Plan to Empower Foundation © 2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;