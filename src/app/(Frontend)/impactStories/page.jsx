 "use client"
import React from 'react';
import { Heart, User, MapPin, BookOpen, Sparkles, ArrowRight, Star, Award, Users } from 'lucide-react';

const stories = [
  {
    name: "Ruksana Begum",
    location: "Dibrugarh, Assam",
    story:
      "Ruksana's parents worked in tea gardens and couldn’t afford school. Our program enrolled her in evening classes and science workshops. Now 22, she’s pursuing a degree in Environmental Science and leads a local climate awareness group.",
    callToAction:
      "Your support can help more children like Ruksana become champions for their communities.",
    icon: Users,
  },
  {
    name: "Meher Jahan",
    location: "Silchar, Assam",
    story:
      "Meher grew up helping at her father's tea stall, with no access to books. Our learning center introduced her to reading and writing. Today at 21, she runs a youth library and mentors other girls through creative writing.",
    callToAction:
      "Sponsor a child like Meher and empower them to write their own future.",
    icon: Users,
  },
  {
    name: "Farzana Khatun",
    location: "Jorhat, Assam",
    story:
      "Farzana faced early marriage pressure, but our intervention gave her a new path. After joining our legal literacy program, she is now a 23-year-old paralegal helping women understand their rights.",
    callToAction:
      "Your support can help girls like Farzana become defenders of justice.",
    icon: Users,
  },
  {
    name: "Latifa Bano",
    location: "Tezpur, Assam",
    story:
      "Latifa fetched water instead of going to school. Our after-school initiative nurtured her math skills. Today, at 22, she’s studying civil engineering and helps install clean water systems in nearby villages.",
    callToAction:
      "Support girls like Latifa in building a better world with their knowledge.",
    icon: Users,
  },
  {
    name: "Nazeera Rahman",
    location: "Nagaon, Assam",
    story:
      "Nazeera worked on her parents’ farm and missed school. Our health and education outreach reconnected her with learning. Now 21, she’s training as a nurse and volunteers at rural health camps.",
    callToAction:
      "Your contribution can bring healthcare and hope through girls like Nazeera.",
    icon: Users,
  },
  {
    name: "Salma Yasmin",
    location: "Barpeta, Assam",
    story:
      "Salma's family worked in brick kilns, with no access to education. Our program helped her resume schooling and build confidence. Now a 23-year-old journalism student, she runs a local podcast for youth voices.",
    callToAction:
      "Sponsor change-makers like Salma and amplify unheard stories.",
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
          0%, 100% {
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
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
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
              Every child has a story waiting to be written. These are the stories of dreams realized,
              barriers broken, and futures transformed through the power of education and compassion.
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
              every act of support creates a new chapter in a child's life
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