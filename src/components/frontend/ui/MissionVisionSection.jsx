"use client"
import { Shield, Eye, Scale, FileCheck, Sparkles, Target, Users, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import CallToAction from "./CallToAction";

// Updated Component - Human Rights & Anti-Corruption Section
const MissionVisionSection = () => {
  const [activeTab, setActiveTab] = useState('human-rights');

  const initiatives = [
    {
      id: 'human-rights',
      title: 'Human Rights Advocacy',
      icon: <Scale className="w-6 h-6" />,
      content: 'We work to incorporate and protect human rights as outlined in the Human Rights Act 1998, ensuring equal rights and dignity for all individuals in our communities.',
      highlights: [
        'Equal Rights Protection',
        'Dignity for All',
        'Community Empowerment',
        'Legal Advocacy'
      ]
    },
    {
      id: 'anti-corruption',
      title: 'Anti-Corruption Initiatives',
      icon: <Shield className="w-6 h-6" />,
      content: 'We expose corruption in tender processes and public procurement, implementing both preventive and reactive measures to ensure transparency and accountability.',
      highlights: [
        'Tender Process Monitoring',
        'Public Procurement Oversight',
        'Transparency Measures',
        'Accountability Systems'
      ]
    }
  ];

  const programs = [
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Human Rights Protection',
      description: 'Advocating for equal rights and dignity, ensuring compliance with Human Rights Act 1998 principles.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Corruption Monitoring',
      description: 'Exposing and preventing corruption in public processes through vigilant oversight and reporting.',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Transparency Advocacy',
      description: 'Implementing accountability measures and promoting transparent governance practices.',
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
              Our Core Work
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-4">
            Human Rights & Anti-Corruption
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Protecting fundamental rights and promoting transparency through dedicated advocacy and oversight initiatives.
          </p>
        </motion.div>

        {/* Human Rights/Anti-Corruption Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {initiatives.map((item) => (
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
            {initiatives.map((item) => (
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
            Our Key Initiatives
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
        
        <div className="my-10">
          <CallToAction/>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionSection
