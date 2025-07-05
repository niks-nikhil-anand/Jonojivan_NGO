"use client"
import { Award, BookOpen, Globe, Lightbulb, Sparkles, Target, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";



// Additional Component - Mission & Vision Section
const MissionVisionSection = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const missions = [
    {
      id: 'mission',
      title: 'Our Mission',
      icon: <Target className="w-6 h-6" />,
      content: 'To provide quality education and holistic development opportunities to underprivileged children, empowering them to break the cycle of poverty and build a brighter future.',
      highlights: [
        'Quality Education for All',
        'Breaking Poverty Cycles',
        'Community Empowerment',
        'Sustainable Development'
      ]
    },
    {
      id: 'vision',
      title: 'Our Vision',
      icon: <Lightbulb className="w-6 h-6" />,
      content: 'A world where every child has access to quality education and the opportunity to reach their full potential, regardless of their socioeconomic background.',
      highlights: [
        'Equal Educational Opportunities',
        'Global Impact',
        'Future Leadership',
        'Inclusive Society'
      ]
    },
    {
      id: 'values',
      title: 'Our Values',
      icon: <Award className="w-6 h-6" />,
      content: 'Integrity, compassion, excellence, and innovation guide everything we do. We believe in transparency, accountability, and the power of community-driven change.',
      highlights: [
        'Integrity & Transparency',
        'Compassion & Care',
        'Excellence in Service',
        'Innovation & Adaptation'
      ]
    }
  ];

  const programs = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Education Programs',
      description: 'Comprehensive educational support including literacy, numeracy, and life skills development.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Outreach',
      description: 'Engaging with local communities to create sustainable change through grassroots initiatives.',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Digital Inclusion',
      description: 'Bridging the digital divide by providing technology access and digital literacy training.',
      color: 'from-blue-700 to-blue-800'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide">
              Our Foundation
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-4">
            Mission, Vision & Values
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover what drives us forward and the principles that guide our work in transforming lives through education.
          </p>
        </motion.div>

        {/* Mission/Vision/Values Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {missions.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            {missions.map((item) => (
              activeTab === item.id && (
                <div key={item.id} className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {item.content}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {item.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </motion.div>
        </div>

        {/* Programs Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-center bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-12">
            Our Key Programs
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {program.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h4>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MissionVisionSection