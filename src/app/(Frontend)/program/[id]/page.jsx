"use client";
import React, { useState, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Users,
  Target,
  Heart,
} from "lucide-react";
import Image from "next/image";
import DonationSection from "@/components/frontend/ui/DonationFormProgram";

const ProgramPage = () => {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const urlPath = window.location.pathname;
        const id = urlPath.split("/")[2];

        if (!id) {
          throw new Error("Program ID not found in URL");
        }

        const response = await fetch(`/api/admin/dashboard/program/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch program data");
        }

        const data = await response.json();
        console.log(data.data);
        setProgram(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Program
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
       {/* Program Image */}
      {program?.image && (
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <img 
            src={program.image} 
            alt={program.title || "Program"} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Program Title Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-4 sm:px-8 py-8 sm:py-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 sm:p-4 inline-block mb-4 sm:mb-6">
                <Target className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
                {program.title || "Program Details"}
              </h1>
              <p className="text-lg sm:text-xl text-indigo-100 leading-relaxed px-4">
                Discover our impactful initiative designed to create positive
                change
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="">
              {program.whatWeDo && (
                <div className="">
                  <div className="max-w-4xl mx-auto">
                    <div className="prose prose-sm sm:prose-lg max-w-none">
                      <div className="bg-gray-50  p-4 sm:p-8 border border-gray-200">
                        <div className="flex items-center mb-6 sm:mb-8">
                          <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                            What We Do
                          </h3>
                        </div>

                        <div
                          className="text-gray-700 leading-relaxed text-sm sm:text-base"
                          dangerouslySetInnerHTML={{ __html: program.whatWeDo }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1">
              {/* Donation Section - Integrated between Mission and What We Do */}
              <DonationSection program={program} />
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-8 pb-8 sm:pb-12 max-w-4xl mx-auto my-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200">
              <div className="flex items-center mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <h4 className="text-lg sm:text-xl font-semibold text-blue-900">
                  Community Impact
                </h4>
              </div>
              <p className="text-blue-800 text-sm sm:text-base">
                Our programs are designed to create lasting positive change in
                the communities we serve, focusing on sustainable development
                and empowerment.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-6 border border-green-200">
              <div className="flex items-center mb-3 sm:mb-4">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-2 sm:mr-3" />
                <h4 className="text-lg sm:text-xl font-semibold text-green-900">
                  Strategic Approach
                </h4>
              </div>
              <p className="text-green-800 text-sm sm:text-base">
                We employ evidence-based strategies and collaborate with local
                stakeholders to ensure our initiatives are effective and
                culturally appropriate.
              </p>
            </div>
          </div>

          {/* Additional Call to Action */}
          <div
            className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-3xl p-12 text-center text-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                Your contribution can transform lives and build stronger
                communities. Join us in creating lasting change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Donate Now</span>
                </button>
                <button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Volunteer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm sm:text-base">
            © 2024 Program Dashboard.  {program.title || "Program Details"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;
