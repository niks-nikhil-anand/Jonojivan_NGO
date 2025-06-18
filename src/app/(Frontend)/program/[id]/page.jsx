"use client";
import React, { useState, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Users,
  Target,
  Heart,
  Lightbulb,
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-green-100">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4 border border-red-100">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Error Loading Program
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      {/* Program Image */}
      {program?.image && (
        <div className="w-full h-56 sm:h-80 md:h-72 lg:h-[750px] overflow-hidden relative">
          <img
            src={program.image}
            alt={program.title || "Program"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              {program.whatWeDo && (
                <div className="">
                  <div className="max-w-4xl mx-auto">
                    <div className="prose prose-sm sm:prose-lg max-w-none">
                      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-6 sm:p-8 border-b border-green-100">
                        <div className="flex items-center mb-6 sm:mb-8">
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 sm:p-4 rounded-full mr-4 sm:mr-5 shadow-lg">
                            <CheckCircle className="h-5 w-5 sm:h-8 sm:w-8 text-green-600" />
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                            What We Do
                          </h3>
                        </div>

                        <div
                          className="text-gray-700 leading-relaxed text-sm sm:text-base prose prose-green max-w-none"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-6 sm:px-8 pb-8 sm:pb-12 mx-auto my-10">
            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-2xl p-6 sm:p-8 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-full mr-3 sm:mr-4 shadow-md">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-green-900">
                  Community Impact
                </h4>
              </div>
              <p className="text-green-800 text-sm sm:text-base leading-relaxed">
                Our programs are designed to create lasting positive change in
                the communities we serve, focusing on sustainable development
                and empowerment.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 rounded-2xl p-6 sm:p-8 border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-3 rounded-full mr-3 sm:mr-4 shadow-md">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-emerald-900">
                  Strategic Approach
                </h4>
              </div>
              <p className="text-emerald-800 text-sm sm:text-base leading-relaxed">
                We employ evidence-based strategies and collaborate with local
                stakeholders to ensure our initiatives are effective and
                culturally appropriate.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 via-pink-50 to-pink-100 rounded-2xl p-6 sm:p-8 border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-pink-100 to-pink-100 p-3 rounded-full mr-3 sm:mr-4 shadow-md">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-pink-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-pink-900">
                  Compassionate Care
                </h4>
              </div>
              <p className="text-pink-800 text-sm sm:text-base leading-relaxed">
                Every action we take is rooted in empathy and understanding,
                ensuring that we address not just immediate needs but also the
                underlying causes of challenges.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 via-green-50 to-teal-100 rounded-2xl p-6 sm:p-8 border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-teal-100 to-green-100 p-3 rounded-full mr-3 sm:mr-4 shadow-md">
                  <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-teal-900">
                  Innovation & Growth
                </h4>
              </div>
              <p className="text-teal-800 text-sm sm:text-base leading-relaxed">
                We continuously seek innovative solutions and foster an
                environment of learning and adaptation to maximize our positive
                impact and reach.
              </p>
            </div>
          </div>

          {/* Additional Call to Action */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl m-6 sm:m-8 p-8 sm:p-12 text-center text-white shadow-2xl border border-green-400">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Make a Difference?
              </h3>
              <p className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
                Your contribution can transform lives and build stronger
                communities. Join us in creating lasting change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]">
                  <Heart className="w-5 h-5" />
                  <span>Donate Now</span>
                </button>
                <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]">
                  <Users className="w-5 h-5" />
                  <span>Volunteer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-6 sm:py-8 mt-8 sm:mt-12 border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm sm:text-base">
            © 2024 Program Dashboard. {program?.title || "Program Details"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;