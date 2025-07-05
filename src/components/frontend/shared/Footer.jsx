import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo & Contact Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
                  <div className="relative bg-blue-600 p-2 rounded-full shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <h1 className="font-bold text-2xl text-blue-400">
                    JonoJivan
                  </h1>
                  <p className="text-xs text-gray-400 font-medium tracking-wide">
                    Empowering Lives
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:info@jonojivan.org"
                  className="hover:text-blue-400 transition-colors break-all"
                >
                  info@jonojivan.org
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+919435266783"
                  className="hover:text-blue-400 transition-colors"
                >
                  +91 94352 66783
                </a>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Uttar Khatowal, PO- Uttar Khatowal, PS- Rupahihat, Nagaon, Assam, Pin- 782124
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-md w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95">
                DONATE NOW
              </button>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-lg font-semibold text-white">Useful Links</h2>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a
                  href="/programs"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  Our Programs
                </a>
              </li>
              <li>
                <a
                  href="/how-we-work"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  How we work
                </a>
              </li>
              <li>
                <a
                  href="/impactStories"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  Impact Stories
                </a>
              </li>
              <li>
                <a
                  href="/aboutUs"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a
                  href="/volunteer"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  Volunteer
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  News & Updates
                </a>
              </li>
              <li>
                <a
                  href="/contactUs"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="text-sm text-gray-300 hover:text-blue-400 transition-colors hover:underline block"
                >
                  Donate Now
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-sm">
              <a
                href="/return-policy"
                className="text-gray-400 hover:text-blue-400 transition-colors hover:underline"
              >
                Return Policy
              </a>
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-blue-400 transition-colors hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-blue-400 transition-colors hover:underline"
              >
                Terms of Use
              </a>
            </div>
            <p className="text-sm text-gray-500 text-center sm:text-right">
              Jonojivan Foundation © 2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;