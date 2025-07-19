import { Award, FileText, HeartCrack, CreditCard, Users } from "lucide-react";
import React from "react";

const VolunteerOpportunities = () => {
  const volunteerOpportunities = [
    {
      title: "Generate ID Card",
      description: "Generate personalized volunteer ID cards instantly.",
      icon: CreditCard,
      color: "from-sky-500 to-blue-500",
      bgColor: "from-sky-50 to-blue-50",
      borderColor: "border-sky-200",
    },
    {
      title: "Generate Appointment Letter",
      description: "Get your official volunteer appointment letter.",
      icon: FileText,
      color: "from-green-500 to-lime-500",
      bgColor: "from-green-50 to-lime-50",
      borderColor: "border-green-200",
    },
    {
      title: "Generate Certificate",
      description:
        "Download your verified certificate of appreciation or participation.",
      icon: Award,
      color: "from-yellow-500 to-amber-500",
      bgColor: "from-yellow-50 to-amber-50",
      borderColor: "border-yellow-200",
    },
    {
      title: "Donate Us",
      description: "Support our mission with your financial contribution.",
      icon: HeartCrack,
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200",
    },
  ];
  
  return (
    <div>
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
                  className={`group relative bg-gradient-to-br ${opportunity.bgColor} rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer border ${opportunity.borderColor}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Enhanced hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${opportunity.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
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
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${opportunity.color} opacity-100`}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* Become a Member Button */}
          <div className="text-center mt-12">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Users className="w-5 h-5 mr-3 relative z-10" />
              <span className="relative z-10">Become a Member</span>
              <svg
                className="w-4 h-4 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerOpportunities;