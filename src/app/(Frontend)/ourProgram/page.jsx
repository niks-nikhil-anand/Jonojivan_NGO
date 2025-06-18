"use client";
import React from "react";
import {
  BookOpen,
  GraduationCap,
  School,
  Users,
  UserCheck,
  Building2,
  Target,
  ArrowRight,
  Sparkles,
  Globe,
  Award,
  Smile,
  HandHeart,
  Heart,
  Presentation,
  TrendingUp,
  Star,
  CheckCircle,
} from "lucide-react";
import CTABanner from "@/components/frontend/shared/CTABanner";

const OurProgram = () => {
  const impactStats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Children Educated",
      color: "text-green-600",
    },
    {
      icon: Heart,
      number: "500+",
      label: "Girls Empowered",
      color: "text-green-600",
    },
    {
      icon: School,
      number: "25+",
      label: "Schools Supported",
      color: "text-green-600",
    },
    {
      icon: Globe,
      number: "50+",
      label: "Communities Reached",
      color: "text-green-600",
    },
  ];

  const programCards = [
    {
      icon: School,
      title: "Running Schools for Holistic Learning",
      description:
        "Our flagship initiative, Bloomfield International School, empowers students with quality education and a supportive environment.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: UserCheck,
      title: "Educating Girls, Empowering Communities",
      description:
        "We break barriers for girls, ensuring they thrive and uplift entire communities.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: HandHeart,
      title: "Providing Tuition Classes",
      description:
        "Our personalized tuition programs bridge learning gaps and boost confidence.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: GraduationCap,
      title: "Skill Development Programs",
      description:
        "We provide vocational training and life skills for independence and self-reliance.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Building2,
      title: "Safe and Inclusive Learning Environments",
      description:
        "We create spaces where children feel safe, valued, and inspired to learn.",
      gradient: "from-green-500 to-green-600",
    },
  ];

  const impactPoints = [
    {
      icon: Users,
      text: "Millions of children are still waiting for their chance to learn.",
      color: "text-green-600",
    },
    {
      icon: Presentation,
      text: "Thousands of girls are waiting for the opportunity to dream big.",
      color: "text-green-600",
    },
    {
      icon: HandHeart,
      text: "Every donation helps us bring hope to those in need.",
      color: "text-green-600",
    },
    {
      icon: Heart,
      text: "Your support creates lasting change and brighter futures for many.",
      color: "text-green-600",
    },
  ];

  const actionItems = [
    {
      icon: Heart,
      title: "Donate Now",
      description: "Sponsor a child's education for just ₹26,000 a year.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Presentation,
      title: "Partner With Us",
      description: "Help us expand our programs and reach more children.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: BookOpen,
      title: "Spread the Word",
      description: "Share our story and inspire others.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: GraduationCap,
      title: "Join Our Mission",
      description: "Make education accessible to every child.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          transition: transform 0.4s ease;
        }
        .hover-scale:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
        .hover-glow:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
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
      `}</style>

      {/* Hero Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-full border border-white/20">
                <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Transforming Lives Through
              <span className="block bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent mt-2">
                Education
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
              At Plan to Empower, we unlock potential, inspire dreams, and
              empower futures. Together, we&apos;re building a world where every
              child has access to quality education.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 lg:w-60 h-32 sm:h-48 lg:h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </header>

      {/* Impact Stats */}
      <section className="py-12 sm:py-16 -mt-8 sm:-mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-6 text-center slide-up hover-scale hover-glow transition-all duration-300 border border-gray-100/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="bg-green-50 p-2 sm:p-3 rounded-full">
                    <stat.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`}
                    />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {stat.number}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Education Matters */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="fade-in">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full border-2 border-green-200">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
              Why Education Matters
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto px-2">
              Education is the most powerful tool for breaking the cycle of
              poverty. It equips children with skills, courage, and knowledge to
              build brighter futures. We refuse to let barriers like poverty and
              gender discrimination silence their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* How We Make a Difference */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              How We Make a Difference
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              Through innovative programs and dedicated support, we&apos;re
              creating pathways to success for children and communities across
              the region.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programCards.map((card, index) => (
              <div
                key={index}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100/50 hover-lift slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${card.gradient}`}></div>
                <div className="p-6 sm:p-8">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div
                      className={`bg-gradient-to-r ${card.gradient} p-3 sm:p-4 rounded-full shadow-lg`}
                    >
                      <card.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center group-hover:text-green-600 transition-colors duration-300 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50/80 to-emerald-50/80">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 fade-in hover-glow border border-green-100/50">
            <div className="text-center mb-8 sm:mb-10">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-green-100 p-3 sm:p-4 rounded-full border-2 border-green-200">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                The Impact of Your Support
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
                Supporting Plan to Empower means changing lives through
                education. Together, we can transform countless futures and make
                dreams a reality.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {impactPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-green-50/50 transition-colors duration-300 slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 bg-white p-2 sm:p-3 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300 border border-green-100/50">
                    <point.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${point.color}`}
                    />
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed pt-1 sm:pt-2">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action Items Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 fade-in border border-green-100/50">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Join Us in Building a Brighter Future
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
                There are many ways you can make a difference in the lives of
                children and communities.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 group slide-up hover-scale hover-glow border border-green-100/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`flex-shrink-0 ${item.bgColor} p-2 sm:p-3 rounded-full group-hover:scale-110 transition-transform duration-300 border border-green-200/50`}
                    >
                      <item.icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <CTABanner
        heading={"Fighting Poverty with Health, Nutrition & Hope"}
        paragraph={
          "Poverty steals health long before birth. At Plan to Empower, we work to improve nutrition, hygiene, and access to basic healthcare—ensuring vulnerable families in remote communities have a fair chance at a healthier future."
        }
      />
    </div>
  );
};

export default OurProgram;
