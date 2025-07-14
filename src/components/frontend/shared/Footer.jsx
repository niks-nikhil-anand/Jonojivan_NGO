import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Heart,
  Users,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-indigo-500 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo & Contact Info - Takes more space */}
          <div className="lg:col-span-5 space-y-8">
            {/* Enhanced Logo */}
            <div className="group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur-md transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    JonoJivan
                  </h1>
                  <p className="text-sm text-gray-300 font-medium tracking-wider">
                    Empowering Lives • Building Futures
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
              <p className="text-gray-300 leading-relaxed">
                Dedicated to transforming communities through sustainable development, 
                education, and empowerment initiatives across rural India.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Heart className="h-5 w-5 text-red-400 mr-2" />
                Get in Touch
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a
                    href="mailto:info@jonojivan.org"
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    info@jonojivan.org
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group">
                  <Phone className="h-5 w-5 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a
                    href="tel:+919435266783"
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    +91 94352 66783
                  </a>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/50">
                  <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Uttar Khatowal, PO- Uttar Khatowal<br />
                    PS- Rupahihat, Nagaon, Assam<br />
                    Pin- 782124
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Useful Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Users className="h-5 w-5 text-blue-400 mr-2" />
                Our Work
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "/how-we-work", label: "How We Work" },
                  { href: "/impactStories", label: "Impact Stories" },
                  { href: "/aboutUs", label: "About Us" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { href: "/volunteer", label: "Volunteer" },
                  { href: "/contactUs", label: "Contact Us" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 md:block hidden">
              <h3 className="text-lg font-semibold text-white">Take Action</h3>
              <div className="space-y-4">
                <a
                  href="/donate"
                  className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-center group"
                >
                  <span className="flex items-center justify-center">
                    <Heart className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                    Donate Now
                  </span>
                </a>
                
                <a
                  href="/volunteer"
                  className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-center group border border-slate-600 hover:border-slate-500"
                >
                  <span className="flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                    Join Us
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
              {[
                { href: "/returnPolicy", label: "Return Policy" },
                { href: "/privacyPolicy", label: "Privacy Policy" },
                { href: "/termsAndConditions", label: "Terms of Use" },
                { href: "/shippingPolicy", label: " Shipping Policy" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors hover:underline"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-sm text-gray-500">
                © 2024 Jonojivan Foundation. All Rights Reserved.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Made with ❤️ for a better tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;