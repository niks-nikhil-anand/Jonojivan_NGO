"use client";
import React from "react";
import {
  Heart,
  Users,
  MapPin,
  Award,
  Mail,
  Phone,
  Target,
  Globe,
  HandHeart,
  IdCard,
  FileText,
  Award as AwardIcon,
  HeartCrack,
  Crown,
  Building2,
  Map,
  Landmark,
  Shield,
  UserCheck,
} from "lucide-react";

import VolunteerRegistrationForm from "@/components/frontend/shared/VolunteerForm";

const committees = [
  {
    name: "Executive Committee",
    location: "National Level",
    description:
      "The highest governing body of Jonojivan Foundation, responsible for strategic decision-making, policy formulation, and overall organizational leadership.",
    icon: Crown,
  },
  {
    name: "National Committee",
    location: "Pan-India",
    description:
      "Coordinates nationwide initiatives, implements national policies, and ensures unified approach across all regional operations.",
    icon: Building2,
  },
  {
    name: "State Committee",
    location: "State Level",
    description:
      "Manages state-wide programs, coordinates with government bodies, and oversees district-level activities within their jurisdiction.",
    icon: Map,
  },
  {
    name: "Mandal Committee",
    location: "Regional Level",
    description:
      "Facilitates regional coordination, implements state policies at grassroots level, and manages inter-district collaboration.",
    icon: MapPin,
  },
  {
    name: "District Committee",
    location: "District Level",
    description:
      "Executes district-wide programs, coordinates with local authorities, and supervises tehsil and block level operations.",
    icon: Landmark,
  },
  {
    name: "Tehsil Committee",
    location: "Tehsil Level",
    description:
      "Manages tehsil-specific initiatives, bridges gap between district and block committees, and ensures local implementation.",
    icon: Shield,
  },
  {
    name: "Block Committee",
    location: "Block Level",
    description:
      "Implements ground-level programs, directly serves communities, and reports progress to higher committees.",
    icon: Users,
  },
  {
    name: "Board of Guardians",
    location: "Advisory Body",
    description:
      "Provides guidance and oversight, ensures ethical practices, and supports the foundation's mission with their expertise.",
    icon: Heart,
  },
  {
    name: "Member",
    location: "Community Level",
    description:
      "Active participants in foundation activities, volunteers in various programs, and grassroots supporters of the cause.",
    icon: UserCheck,
  },
  {
    name: "Chairman",
    location: "Leadership Role",
    description:
      "Provides visionary leadership, represents the foundation publicly, and guides strategic direction for organizational growth.",
    icon: Award,
  },
];

const volunteerOpportunities = [
  {
    title: "Generate ID Card",
    description: "Generate personalized volunteer ID cards instantly.",
    icon: IdCard,
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Generate Appointment Letter",
    description: "Get your official volunteer appointment letter.",
    icon: FileText,
    color: "from-green-500 to-lime-500",
  },
  {
    title: "Generate Certificate",
    description:
      "Download your verified certificate of appreciation or participation.",
    icon: AwardIcon,
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Donate Us",
    description: "Support our mission with your financial contribution.",
    icon: HeartCrack,
    color: "from-rose-500 to-pink-500",
  },
];

export default function JonojivanVolunteerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        .slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          transition: all 0.4s ease;
        }
        .hover-scale:hover {
          transform: scale(1.02);
          transition: all 0.3s ease;
        }
        .pulse-glow {
          animation: pulseGlow 3s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          }
        }

        .glass-card {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm pulse-glow">
                <HandHeart className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">Join</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Jonojivan Foundation
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4 mb-8">
              Transform lives through education and empowerment. Volunteer with
              us to create lasting change in the lives of children and women
              across Assam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-3 mx-auto sm:mx-0">
                <Heart className="w-5 h-5" />
                Volunteer Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-3 mx-auto sm:mx-0">
                <Globe className="w-5 h-5" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>


       <section className=" bg-white">
        <VolunteerRegistrationForm />
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Volunteer Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from various roles that match your skills and passion for
              making a difference
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {volunteerOpportunities.map((opportunity, index) => {
              const IconComponent = opportunity.icon;

              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedRole(opportunity.title)}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${opportunity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="p-5 relative z-10">
                    {/* Icon */}
                    <div
                      className={`bg-gradient-to-r ${opportunity.color} p-3 rounded-lg w-fit mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-1">
                      {opportunity.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {opportunity.description}
                    </p>

                    {/* Action button */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                        Learn More
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${opportunity.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

     

      {/* Success Stories Carousel */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Jonojivan Foundation Structure
            </h2>
            <p className="text-xl text-gray-600">
              Our organized committees working together for social
              transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committees.slice(0, 9).map((committee, index) => {
              const IconComponent = committee.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {committee.name}
                      </h3>
                      <p className="text-blue-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {committee.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {committee.description.substring(0, 150)}...
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Have questions about volunteering? We&apos;d love to hear from you!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                  <p className="text-blue-600">volunteer@jonojivan.org</p>
                </div>
              </div>
              <p className="text-gray-700">
                Send us your questions or schedule a call to learn more about
                our programs
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                  <a href="tel:+919435266783" className="text-green-600">
                    +91 9435266783
                  </a>
                </div>
              </div>
              <p className="text-gray-700">
                Speak directly with our volunteer coordinator for immediate
                assistance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
