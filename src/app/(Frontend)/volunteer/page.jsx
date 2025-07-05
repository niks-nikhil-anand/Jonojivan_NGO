"use client"
import React, { useState } from 'react';
import { Heart, Users, MapPin, BookOpen, Sparkles, ArrowRight, Star, Award, Calendar, Clock, Mail, Phone, CheckCircle, Lightbulb, Target, Globe, HandHeart, GraduationCap, Stethoscope, Camera, Briefcase, Code, Palette } from 'lucide-react';

const stories = [
  {
    name: "Ruksana Begum",
    location: "Dibrugarh, Assam",
    story:
      "Ruksana's parents worked in tea gardens and couldn't afford school. Our program enrolled her in evening classes and science workshops. Now 22, she's pursuing a degree in Environmental Science and leads a local climate awareness group.",
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
      "Latifa fetched water instead of going to school. Our after-school initiative nurtured her math skills. Today, at 22, she's studying civil engineering and helps install clean water systems in nearby villages.",
    callToAction:
      "Support girls like Latifa in building a better world with their knowledge.",
    icon: Users,
  },
  {
    name: "Nazeera Rahman",
    location: "Nagaon, Assam",
    story:
      "Nazeera worked on her parents' farm and missed school. Our health and education outreach reconnected her with learning. Now 21, she's training as a nurse and volunteers at rural health camps.",
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

const volunteerOpportunities = [
  {
    title: "Education Mentor",
    description: "Support children with homework, reading, and life skills development",
    commitment: "4 hours/week",
    location: "Remote & On-site",
    skills: ["Teaching", "Patience", "Communication"],
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Healthcare Support",
    description: "Assist in health camps and awareness programs in rural areas",
    commitment: "8 hours/month",
    location: "Assam Villages",
    skills: ["Basic Health Knowledge", "Empathy", "Local Language"],
    icon: Stethoscope,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Digital Marketing",
    description: "Help spread awareness about our programs through social media",
    commitment: "5 hours/week",
    location: "Remote",
    skills: ["Social Media", "Content Creation", "Design"],
    icon: Camera,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Program Coordinator",
    description: "Organize events, coordinate with local teams, and manage logistics",
    commitment: "10 hours/week",
    location: "Assam",
    skills: ["Organization", "Leadership", "Planning"],
    icon: Briefcase,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Tech Support",
    description: "Develop and maintain our digital platforms and learning apps",
    commitment: "6 hours/week",
    location: "Remote",
    skills: ["Programming", "Web Development", "Problem Solving"],
    icon: Code,
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Creative Arts",
    description: "Conduct art therapy sessions and creative workshops for children",
    commitment: "3 hours/week",
    location: "Learning Centers",
    skills: ["Art", "Creativity", "Child Psychology"],
    icon: Palette,
    color: "from-pink-500 to-rose-500"
  }
];

export default function JonojivanVolunteerPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    availability: '',
    experience: '',
    motivation: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      availability: '',
      experience: '',
      motivation: ''
    });
  };

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
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
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
              Transform lives through education and empowerment. Volunteer with us to create lasting change 
              in the lives of children and women across Assam.
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

      {/* Foundation Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl shadow-2xl p-8 lg:p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                About Jonojivan Foundation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Empowering lives through education, healthcare, and community development across Assam
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-600">Breaking barriers to education and creating opportunities for underprivileged children</p>
              </div>
              
              <div className="text-center">
                <div className="bg-indigo-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Globe className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Reach</h3>
                <p className="text-gray-600">Serving communities across Assam with focus on rural and marginalized areas</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Impact</h3>
                <p className="text-gray-600">Over 1,000 children supported through education and skill development programs</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
                <p className="text-gray-600">Compassion, integrity, and commitment to sustainable community development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Volunteer Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from various roles that match your skills and passion for making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerOpportunities.map((opportunity, index) => {
              const IconComponent = opportunity.icon;
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl shadow-xl overflow-hidden slide-up hover-lift cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedRole(opportunity.title)}
                >
                  <div className="p-8">
                    <div className={`bg-gradient-to-r ${opportunity.color} p-4 rounded-full w-fit mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {opportunity.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {opportunity.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{opportunity.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{opportunity.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
              Lives We've Transformed
            </h2>
            <p className="text-xl text-gray-600">
              See the impact of our volunteers through these inspiring stories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.slice(0, 3).map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-500 p-3 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                    <p className="text-blue-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {story.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {story.story.substring(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Join Our Volunteer Team
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below to start your journey with Jonojivan Foundation
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a role</option>
                    {volunteerOpportunities.map((opportunity, index) => (
                      <option key={index} value={opportunity.title}>
                        {opportunity.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability *
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your relevant experience or skills"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to volunteer with us? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your motivation for volunteering"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover-scale"
                >
                  <Heart className="w-5 h-5" />
                  Submit Application
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Have questions about volunteering? We'd love to hear from you!
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
                Send us your questions or schedule a call to learn more about our programs
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                  <p className="text-green-600">+91 98765 43210</p>
                </div>
              </div>
              <p className="text-gray-700">
                Speak directly with our volunteer coordinator for immediate assistance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}