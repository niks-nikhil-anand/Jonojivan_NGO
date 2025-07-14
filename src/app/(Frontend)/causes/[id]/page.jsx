"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import banner from "../../../../../public/frontend/Banners/ourMissionBanner.jpg";
import Image from "next/image";
import Loader from "@/components/loader/loader";
import { Award, Globe, Heart, Users } from "lucide-react";
import CallToAction from "@/components/frontend/ui/CallToAction";

const Page = () => {
  const [idFromURL, setIdFromURL] = useState("");
  const [data, setData] = useState(null); // State to store API response
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlPath = window.location.pathname;
        const id = urlPath.split("/")[2];
        setIdFromURL(id);

        // Fetch data from the API
        const response = await fetch(`/api/admin/dashboard/campaign/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg p-4">Error: {error}</div>
    );
  }

  const impactStats = [
    { icon: Users, number: "10,000+", label: "Lives Impacted" },
    { icon: Globe, number: "50+", label: "Communities Served" },
    { icon: Award, number: "25+", label: "Programs Running" },
    { icon: Heart, number: "5,000+", label: "Volunteers" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto "
    >
      <div className="min-h-screen ">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20"></div>
          <div className="relative px-4 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16 mx-auto max-w-7xl">
            <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-4 sm:p-8 lg:p-12 border border-white/20">
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                  {data.title}
                </h1>
              </div>

              {data.image && (
                <div className="relative mb-6 sm:mb-8 lg:mb-12 group">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl object-cover shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6 text-center">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium px-2 sm:px-4">
                  {data.description}
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2 sm:px-4">
                  {data.description}
                </p>
              </div>
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg text-gray-700 max-w-3xl mx-auto mt-6 sm:mt-8 px-2 sm:px-4"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-3 sm:mb-4">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-10 max-w-7xl mx-auto">
        <CallToAction />
      </div>
    </motion.div>
  );
};

export default Page;
