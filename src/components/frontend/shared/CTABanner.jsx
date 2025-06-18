import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import CustomDonationForm from "../ui/CustomDonationForm";

const CTABanner = ({ heading, paragraph }) => {
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setIsDonationFormOpen(true);
  };


  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-12 text-center text-white overflow-hidden fade-in">
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {heading}
              {/* Because Every Child Deserves a Chance */}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              {paragraph}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
                onClick={handleDonateClick}
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </button>
              <Link href={"/aboutUs"}>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
      </div>
      {isDonationFormOpen && (
        <CustomDonationForm
          isOpen={isDonationFormOpen}
          setIsModalOpen={setIsDonationFormOpen}
        />
      )}
    </section>
  );
};

export default CTABanner;
