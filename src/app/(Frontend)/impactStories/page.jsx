"use client"
import React from "react";
import {
  BookOpen,
  GraduationCap,
  Heart,
  Sparkles,
  User,
  MapPin,
  ArrowRight,
  Smile,
} from "lucide-react";

const ImpactStories = () => {
  const stories = [
    {
      name: "Shaziya",
      location: "Ara, Bihar",
      story: "Shaziya's laughter once echoed only within the four walls of her small, dimly lit home. Born into a family struggling to make ends meet, her dreams of going to school were buried under the weight of poverty and societal expectations. But Shaziya's life changed when Bring Smile Foundation stepped in. Through our Child Sponsorship Program, Shaziya was enrolled at Bloomfield International School. Today, Shaziya is not just a student—she's a role model. She dreams of becoming a teacher, so she can inspire other girls in her community to believe in themselves.",
      callToAction: "Your support can rewrite more stories like Shaziya's. Sponsor a child today and bring a lifetime of smiles.",
    },
    {
      name: "Anamika",
      location: "Bhojpur, Bihar",
      story: "Anamika grew up in a small village where girls rarely set foot in classrooms. Her father, a daily wage laborer, struggled to feed the family, and education was considered a luxury they couldn't afford. When Bring Smile Foundation discovered Anamika's situation, her story became our mission. Through our Child Sponsorship Program, she was given the opportunity to join Bloomfield International School. Today, she not only attends school but excels in her studies, dreaming of becoming a doctor to serve her community.",
      callToAction: "You can be the turning point in a child's story, just like Anamika's. Sponsor a child and help them create a future filled with hope and possibilities.",
    },
    {
      name: "Priya",
      location: "Ara, Bihar",
      story: "Priya was born into a world where the value of a girl's education was often overlooked. Her family struggled to make ends meet, and as the eldest daughter, Priya was expected to help with household chores and care for her younger siblings. When Bring Smile Foundation learned about Priya's situation, everything changed. Through the Child Sponsorship Program, Priya was enrolled at Bloomfield International School. Today, Priya is an ambitious student with big dreams. She aspires to become an IAS officer, using her education to fight for justice and equality in her community.",
      callToAction: "With your support, you can help more girls like Priya rewrite their stories and create a future full of possibilities.",
    },
    {
      name: "Anshika",
      location: "Bhojpur, Bihar",
      story: "Anshika's childhood was one of silent longing. Born into a family where education for girls was seen as unnecessary, she spent her days helping her mother with household chores. But Anshika's heart never stopped dreaming. When Bring Smile Foundation discovered Anshika, her life began to change. Through the Child Sponsorship Program, she was enrolled in Bloomfield International School. Today, Anshika is thriving academically, with dreams that stretch far beyond her village. She dreams of becoming a doctor to inspire other girls in her community.",
      callToAction: "Your support can give girls like Anshika the chance they deserve. Sponsor a child today and help transform a life.",
    },
    {
      name: "Ayesha",
      location: "Ara, Bihar",
      story: "Ayesha's life was shaped by the daily struggles of her family. Her father worked as a daily wage laborer, and education was a luxury they could not afford. Despite the limitations imposed on her, Ayesha always dreamed of something more. When Bring Smile Foundation learned about Ayesha, everything changed. Through the Child Sponsorship Program, Ayesha was given the opportunity to attend Bloomfield International School and discovered a love for learning that she had never known was possible.",
      callToAction: "Your sponsorship can change a life like Ayesha's. Give the gift of education today and make a lasting impact.",
    },
    {
      name: "Sana",
      location: "Bhojpur, Bihar",
      story: "Sana's days were filled with endless chores, cooking, cleaning, and taking care of her younger siblings. In her community, girls were expected to stay at home and contribute to the household, while boys went to school to build their futures. But Sana's heart held a quiet hope—she dreamed of becoming a doctor, to heal the sick and help the poor. When Bring Smile Foundation heard about Sana, everything changed. Through our Child Sponsorship Program, Sana was enrolled in Bloomfield International School. Sana flourished in her studies and became a source of inspiration to her family and friends.",
      callToAction: "With your support, girls like Sana can change their futures. Sponsor a child today and be the reason a dream comes true.",
    },
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
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Hero Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Stories of
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Transformation
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Every child has a story. These are the stories of dreams realized, barriers broken, and futures transformed through the power of education.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </header>

      {/* Stories Section */}
      <section className="py-16 px-6 -mt-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:gap-12">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden slide-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
                    {/* Story Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-full">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            {story.name}
                          </h2>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-lg">{story.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="prose prose-lg max-w-none mb-8">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {story.story}
                        </p>
                      </div>

                      {/* Call to Action */}
                      <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-100 p-2 rounded-full flex-shrink-0">
                            <Heart className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium text-lg leading-relaxed">
                              {story.callToAction}
                            </p>
                            <button className="mt-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 flex items-center gap-2 hover-scale">
                              Sponsor a Child
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Story Icon/Visual */}
                    <div className="lg:w-48 flex-shrink-0">
                      <div className="bg-gradient-to-br from-emerald-100 via-green-100 to-teal-100 rounded-2xl p-8 text-center">
                        <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-lg">
                          <BookOpen className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          Education
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Transforming Lives
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <Sparkles className="w-10 h-10 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Your Impact Creates Stories
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              These stories represent just a few of the thousands of lives transformed through education. Every donation, every sponsorship, every act of support creates a new chapter in a child&apos;s life story.
            </p>
            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Be Part of the Next Story
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Join us in writing more stories of hope, dreams, and transformation. Together, we can ensure every child has the chance to create their own success story.
              </p>
              <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 flex items-center gap-3 mx-auto hover-scale">
                <Heart className="w-5 h-5" />
                Start Your Impact Today
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactStories;