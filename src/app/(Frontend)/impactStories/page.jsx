"use client";
import React from "react";
import {
  Heart,
  User,
  MapPin,
  BookOpen,
  Sparkles,
  ArrowRight,
  Star,
  Award,
  Users,
} from "lucide-react";

const stories = [
  {
    name: "Priyanka Das",
    location: "Dibrugarh, Assam",
    story:
      "Priyanka’s parents worked in tea estates and couldn’t afford her education. Our evening school and science workshops gave her a fresh start. Now 22, she is pursuing a degree in Environmental Science and leads a local climate awareness campaign.",
    callToAction:
      "Your support can help more girls like Priyanka become leaders in their communities.",
    icon: Users,
  },
  {
    name: "Sneha Kalita",
    location: "Silchar, Assam",
    story:
      "Sneha spent her childhood helping her father at his small shop. Books were a distant dream until she joined our learning center. Today at 21, she runs a youth library and mentors young girls in creative writing.",
    callToAction:
      "Sponsor a girl like Sneha and empower her to inspire others through knowledge.",
    icon: Users,
  },
  {
    name: "Ritika Sharma",
    location: "Jorhat, Assam",
    story:
      "Ritika was expected to marry early, but our legal literacy program opened new doors for her. Now 23, she works as a paralegal, helping other women in her community understand and fight for their rights.",
    callToAction:
      "Support Ritika and others like her in becoming voices of justice.",
    icon: Users,
  },
  {
    name: "Ankita Deka",
    location: "Tezpur, Assam",
    story:
      "Ankita walked miles for water and missed school often. Our after-school initiative helped her catch up, especially in math. Now 22, she is studying civil engineering and designs water systems for remote villages.",
    callToAction:
      "Help girls like Ankita build a better future—one solution at a time.",
    icon: Users,
  },
  {
    name: "Komal Nath",
    location: "Nagaon, Assam",
    story:
      "Komal worked on her family’s farm and couldn’t attend regular school. After joining our outreach program, she discovered a passion for healthcare. At 21, she is now training to be a nurse and serves at local health camps.",
    callToAction:
      "Your donation can support healthcare heroes like Komal in rural communities.",
    icon: Users,
  },
  {
    name: "Pallavi Goswami",
    location: "Barpeta, Assam",
    story:
      "Pallavi's parents worked in a brick kiln, and she was pulled out of school early. Our education program helped her resume her studies. Now 23, she is pursuing journalism and runs a local podcast on youth issues.",
    callToAction:
      "Sponsor girls like Pallavi and help amplify voices that matter.",
    icon: Users,
  },
];

export default function BlueStoriesPage() {
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
          animation: pulseGlow 2s infinite;
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

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .shape {
          position: absolute;
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 51, 234, 0.1)
          );
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .shape:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape:nth-child(2) {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 15%;
          animation-delay: -5s;
        }

        .shape:nth-child(3) {
          width: 60px;
          height: 60px;
          bottom: 30%;
          left: 20%;
          animation-delay: -10s;
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0px) rotate(360deg);
          }
        }
      `}</style>

      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {/* Modern Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm pulse-glow">
                <Heart className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Stories of
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Transformation
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed px-4">
              Every child has a story waiting to be written. These are the
              stories of dreams realized, barriers broken, and futures
              transformed through the power of education and compassion.
            </p>
          </div>
        </div>

        {/* Modern Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-full blur-xl"></div>
      </header>

      {/* Stories Grid Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:gap-12">
            {stories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <div
                  key={index}
                  className="glass-card rounded-3xl shadow-2xl overflow-hidden slide-up hover-lift"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="p-6 sm:p-8 lg:p-12">
                    <div className="flex flex-col xl:flex-row xl:items-start xl:gap-12">
                      {/* Story Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full w-fit">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                              {story.name}
                            </h2>
                            <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                              <MapPin className="w-5 h-5" />
                              <span className="text-lg">{story.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-8">
                          <p className="text-gray-700 leading-relaxed text-lg lg:text-xl">
                            {story.story}
                          </p>
                        </div>

                        {/* Enhanced Call to Action */}
                        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-blue-200">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0 w-fit mx-auto sm:mx-0">
                              <Heart className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <p className="text-gray-800 font-medium text-lg lg:text-xl leading-relaxed mb-6">
                                {story.callToAction}
                              </p>
                              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 mx-auto sm:mx-0 hover-scale shadow-lg">
                                Sponsor a Child
                                <ArrowRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Story Visual Card */}
                      <div className="xl:w-64 flex-shrink-0 mt-8 xl:mt-0">
                        <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl p-8 text-center h-full">
                          <div className="bg-white p-6 rounded-full inline-block mb-6 shadow-lg">
                            <IconComponent className="w-12 h-12 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Success Story
                          </h3>
                          <p className="text-gray-600">
                            Transforming Lives Through Education
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Summary Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-100 p-6 rounded-full pulse-glow">
                <Sparkles className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-8">
              Your Impact Creates Stories
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-12 max-w-4xl mx-auto">
              These stories represent just a few of the thousands of lives
              transformed through education. Every donation, every sponsorship,
              every act of support creates a new chapter in a child&apos;s life
              story.
            </p>

            {/* Enhanced CTA Card */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-12 border border-blue-200 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Be Part of the Next Story
              </h3>
              <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                Join us in writing more stories of hope, dreams, and
                transformation. Together, we can ensure every child has the
                chance to create their own success story.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 mx-auto hover-scale shadow-lg">
                <Heart className="w-6 h-6" />
                Start Your Impact Today
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
