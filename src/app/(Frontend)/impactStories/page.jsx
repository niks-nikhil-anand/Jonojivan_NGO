"use client"
import React from 'react';
import {
  BookOpen, 
  GraduationCap, 
  School, 
  Users, 
  UserCheck, 
  Building,
  Target,
  ArrowRight,
  Sparkles,
  Globe,
  Award,
  Smile,
  HandHeart,
  Heart,
  Presentation 
} from 'lucide-react';


const BringSmile = () => {
  const impactStats = [
    { icon: Smile, number: "10,000+", label: "Children Educated", color: "text-yellow-500" },
    { icon: Users, number: "500+", label: "Girls Empowered", color: "text-pink-500" },
    { icon: School, number: "25+", label: "Schools Supported", color: "text-blue-500" },
    { icon: Globe, number: "50+", label: "Communities Reached", color: "text-green-500" }
  ];

  const programCards = [
    {
      icon: School,
      title: "Running Schools for Holistic Learning",
      description: "Our flagship initiative, Bloomfield International School, empowers students with quality education and a supportive environment.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: UserCheck,
      title: "Educating Girls, Empowering Communities",
      description: "We break barriers for girls, ensuring they thrive and uplift entire communities.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: HandHeart,
      title: "Providing Tuition Classes",
      description: "Our personalized tuition programs bridge learning gaps and boost confidence.",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: GraduationCap,
      title: "Skill Development Programs",
      description: "We provide vocational training and life skills for independence and self-reliance.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Building,
      title: "Safe and Inclusive Learning Environments",
      description: "We create spaces where children feel safe, valued, and inspired to learn.",
      gradient: "from-orange-500 to-amber-500"
    }
  ];

 const impactPoints = [
  {
    icon: Smile,
    text: "Millions of children are still waiting for their chance to learn.",
    color: "text-yellow-500",
  },
  {
    icon: Presentation,
    text: "Thousands of girls are waiting for the opportunity to dream big.",
    color: "text-green-500",
  },
  {
    icon: HandHeart,
    text: "Every donation helps us bring hope to those in need.",
    color: "text-blue-500",
  },
  {
    icon: Heart,
    text: "Your support creates lasting change and brighter futures for many.",
    color: "text-red-500",
  },
];


  const actionItems = [
    {
      icon: Heart,
      title: "Donate Now",
      description: "Sponsor a child's education for just ₹26,000 a year.",
      color: "text-red-500"
    },
    {
      icon: Presentation,
      title: "Partner With Us",
      description: "Help us expand our programs and reach more children.",
      color: "text-green-500"
    },
    {
      icon: BookOpen,
      title: "Spread the Word",
      description: "Share our story and inspire others.",
      color: "text-yellow-500"
    },
    {
      icon: GraduationCap,
      title: "Join Our Mission",
      description: "Make education accessible to every child.",
      color: "text-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforming Lives Through
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Education
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              At Plan to Empower, we unlock potential, inspire dreams, and empower futures. Together, we're building a world where every child has access to quality education.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </header>

      {/* Impact Stats */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center slide-up hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-50 p-3 rounded-full">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Education Matters */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Why Education Matters</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Education is the most powerful tool for breaking the cycle of poverty. It equips children with skills, courage, and knowledge to build brighter futures. We refuse to let barriers like poverty and gender discrimination silence their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* How We Make a Difference */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">How We Make a Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through innovative programs and dedicated support, we're creating pathways to success for children and communities across the region.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programCards.map((card, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover-lift slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${card.gradient}`}></div>
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className={`bg-gradient-to-r ${card.gradient} p-4 rounded-full`}>
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-emerald-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 fade-in">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <Award className="w-10 h-10 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                The Impact of Your Support
              </h2>
              <p className="text-lg text-gray-600">
               Supporting Plan to Empower means changing lives through education. Together, we can transform countless futures and make dreams a reality.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {impactPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-md">
                    <point.icon className={`w-6 h-6 ${point.color}`} />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed pt-2">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action Items Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-3xl shadow-xl p-8 lg:p-12 fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Join Us in Building a Brighter Future
              </h2>
              <p className="text-lg text-gray-600">
                There are many ways you can make a difference in the lives of children and communities.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group slide-up hover-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-gray-50 p-3 rounded-full group-hover:bg-emerald-50 transition-colors duration-300">
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
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
                Because Every Child Deserves a Chance
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Education is more than a right—it's a lifeline to a brighter tomorrow. Join us in making this vision a reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BringSmile;