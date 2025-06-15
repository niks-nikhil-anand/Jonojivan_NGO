"use client"
import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle, Users, Target, Heart } from 'lucide-react';

const ProgramPage = () => {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const urlPath = window.location.pathname;
        const id = urlPath.split('/')[2];
        
        if (!id) {
          throw new Error('Program ID not found in URL');
        }

        const response = await fetch(`/api/admin/dashboard/program/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch program data');
        }
        
        const data = await response.json();
        console.log(data.data)
        setProgram(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading program details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Program</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

 

  return (
   
 <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {program.title}
              </h1>
              <p className="text-gray-600 mt-1 capitalize">{program.slug}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image Section */}
          {program.image && (
            <div className="w-full h-96 overflow-hidden">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 inline-block mb-6">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
              {program.description && (
                <p className="text-xl text-blue-100 leading-relaxed">
                  {program.description}
                </p>
              )}
            </div>
          </div>

          {/* What We Do Content */}
          {program.whatWeDo && (
            <div className="px-8 py-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">What We Do</h3>
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: program.whatWeDo }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 px-8 pb-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <h4 className="text-xl font-semibold text-blue-900">Community Impact</h4>
              </div>
              <p className="text-blue-800">
                Our programs are designed to create lasting positive change in the communities we serve,
                focusing on sustainable development and empowerment.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <h4 className="text-xl font-semibold text-green-900">Strategic Approach</h4>
              </div>
              <p className="text-green-800">
                We employ evidence-based strategies and collaborate with local stakeholders to ensure
                our initiatives are effective and culturally appropriate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2024 Program Dashboard. Making a difference, one initiative at a time.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProgramPage;