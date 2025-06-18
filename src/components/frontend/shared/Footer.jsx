import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo & Contact Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
            <div className="flex items-center">
              <div className="w-80 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo/logo.jpg"
                  alt="Plan to Empower Logo"
                  width={400}
                  height={90}
                  className="w-80 h-20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-pink-500 flex-shrink-0" />
                <a
                  href="mailto:support@plantoempowerfoundation.org"
                  className="hover:text-pink-500 transition-colors break-all"
                >
                  support@plantoempowerfoundation.org
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-pink-500 flex-shrink-0" />
                <a
                  href="tel:+919599322679"
                  className="hover:text-pink-500 transition-colors"
                >
                  +91 95993 22679
                </a>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Singhi Kalan, PO- Ara, District- Bhojpur, Bihar, Pin- 802301.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button className="bg-[#e91e63] hover:bg-[#d81b60] text-white font-semibold   px-6 py-2 rounded-md shadow-md w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95">
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
                  href="/ourProgram"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
                >
                  Our Programs
                </a>
              </li>
              <li>
                <a
                  href="/how-we-work"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
                >
                  How we work
                </a>
              </li>
              <li>
                <a
                  href="/impactStories"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
                >
                  Impact Stories
                </a>
              </li>
              <li>
                <a
                  href="/aboutUs"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
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
                  href="/how-we-work"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
                >
                  How We Work
                </a>
              </li>
              <li>
                <a
                  href="/Campaign"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
                >
                  News & Updates
                </a>
              </li>
              <li>
                <a
                  href="/contactUs"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/donate-now"
                  className="text-sm text-gray-300 hover:text-pink-500 transition-colors hover:underline block"
                >
                  Donate Now
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/PlanToEmpowerFoundation"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <Facebook className="text-sm w-4 h-4" />
              </a>
              <a
                href="https://x.com/plantoempowerfoundation"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <Twitter className="text-sm w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/PlanToEmpowerFoundation"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <Instagram className="text-sm w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/plantoempowerfoundation/"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <Linkedin className="text-sm w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 lg:pt-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                Committed to empowering communities through education,
                opportunity, and lasting social impact.{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-sm">
              <a
                href="/returnPolicy"
                className="text-gray-400 hover:text-pink-500 transition-colors hover:underline"
              >
                Return Policy
              </a>
              <a
                href="/privacyPolicy"
                className="text-gray-400 hover:text-pink-500 transition-colors hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/termsAndConditions"
                className="text-gray-400 hover:text-pink-500 transition-colors hover:underline"
              >
                Terms of Use
              </a>
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
