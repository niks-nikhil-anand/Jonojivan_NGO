"use client"
import React, { useState, useEffect } from 'react';
import { Star, Heart, Users, Quote, ArrowRight, MessageCircle, Sparkles, TrendingUp, Award, CheckCircle, Eye, ChevronLeft, ChevronRight, Filter, Search, Calendar, MapPin } from 'lucide-react';

const TestimonialCard = ({ avatar, name, job, quote, index, isActive, onClick, date, location }) => {
  const gradients = [
    "from-blue-500 via-blue-600 to-blue-700",
    "from-blue-600 via-blue-700 to-blue-800",
    "from-blue-400 via-blue-500 to-blue-600",
    "from-blue-700 via-blue-800 to-blue-900",
    "from-blue-500 via-blue-600 to-blue-700"
  ];
  
  const bgColors = [
    "bg-gradient-to-br from-blue-50 to-blue-100",
    "bg-gradient-to-br from-blue-50 to-blue-200", 
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-blue-50 to-blue-150",
    "bg-gradient-to-br from-blue-100 to-blue-200"
  ];
  
  const borderColors = [
    "border-blue-200",
    "border-blue-300",
    "border-blue-200",
    "border-blue-300",
    "border-blue-200"
  ];

  const currentGradient = gradients[index % gradients.length];
  const currentBg = bgColors[index % bgColors.length];
  const currentBorder = borderColors[index % borderColors.length];

  return (
    <div 
      className={`${currentBg} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${currentBorder} border group relative overflow-hidden cursor-pointer transform hover:scale-105`}
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Quote Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${currentGradient} rounded-xl mb-4 text-white shadow-lg relative transform group-hover:scale-110 transition-transform duration-300`}>
        <Quote className="w-6 h-6" />
      </div>

      <div className="relative z-10">
        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, starIndex) => (
            <div key={starIndex} className="animate-pulse" style={{ animationDelay: `${starIndex * 0.1}s` }}>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
        </div>

        {/* Quote */}
        <blockquote className="mb-6">
          <p className="text-gray-600 leading-relaxed relative z-10">
            {quote}
          </p>
        </blockquote>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-4"></div>

        {/* User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 relative w-12 h-12">
              <div className="w-full h-full bg-white rounded-full p-1 shadow-sm">
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="ml-3">
              <p className="font-bold text-gray-900 flex items-center text-sm">
                {name}
                <CheckCircle className="w-3 h-3 text-blue-500 ml-1" />
              </p>
              <p className="text-xs text-gray-600">{job}</p>
            </div>
          </div>
          
          {/* Date and Location */}
          <div className="text-right">
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <Calendar className="w-3 h-3 mr-1" />
              {date}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </div>
          </div>
        </div>
      </div>

      {/* Heart Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`w-8 h-8 bg-gradient-to-r ${currentGradient} rounded-full flex items-center justify-center text-white shadow-lg`}>
          <Heart className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

const TestimonialsPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [visibleStats, setVisibleStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const itemsPerPage = 9;

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const testimonialsData = [
    {
      name: "Priya Sharma",
      job: "Supporter",
      quote: "I've always believed that education is the key to change. Supporting Bring Smile allows me to contribute towards educating girls who need it most. I'm so proud to see how they're helping young girls fulfill their dreams.",
      date: "Dec 2024",
      location: "Delhi"
    },
    {
      name: "Ankit Kapoor",
      job: "Supporter",
      quote: "Donating to Bring Smile was an easy choice for me. I've seen how education transforms lives, and I'm happy to be part of this cause. It's inspiring to see girls who would otherwise be left behind, getting the chance to learn.",
      date: "Nov 2024",
      location: "Mumbai"
    },
    {
      name: "Seema Khan",
      job: "Mother and Supporter",
      quote: "As a mother, it's close to my heart to see girls getting an education. When I heard about Bring Smile, I knew I wanted to help. Every girl deserves to feel empowered and have access to education.",
      date: "Oct 2024",
      location: "Kolkata"
    },
    {
      name: "Rajesh Kumar",
      job: "Supporter",
      quote: "Supporting Bring Smile has been one of the most fulfilling things I've done. It's incredible to see how even a small donation can go such a long way in changing a child's life. I'm so happy to be part of this initiative.",
      date: "Sep 2024",
      location: "Chennai"
    },
    {
      name: "Anjali Reddy",
      job: "Supporter",
      quote: "I never had the chance to study in a school, so I understand the value of education. When I found Bring Smile, I knew I had to help provide that opportunity to others. It's such a joy to see girls go to school and chase their dreams.",
      date: "Aug 2024",
      location: "Hyderabad"
    },
    {
      name: "Vineet Joshi",
      job: "Supporter",
      quote: "I donate to Bring Smile because I believe every woman deserves an opportunity. Seeing how they empower women through skills training and education is something I'm proud to support.",
      date: "Jul 2024",
      location: "Pune"
    },
    {
      name: "Radhika Iyer",
      job: "Supporter",
      quote: "The work Bring Smile is doing is truly inspiring. I'm proud to support an organization that gives girls the opportunity to change their futures. Education is the greatest gift, and it's heartwarming to know my donation is making a difference.",
      date: "Jun 2024",
      location: "Bangalore"
    },
    {
      name: "Sanjay Yadav",
      job: "Supporter",
      quote: "Sponsoring a child through Bring Smile was one of the best decisions I've made. I've seen firsthand how education changes lives, and knowing that I am part of this transformation is something I will always cherish.",
      date: "May 2024",
      location: "Jaipur"
    },
    {
      name: "Meera Singh",
      job: "Supporter",
      quote: "I support Bring Smile because they do more than just educate—they empower. I am inspired by the women who are breaking barriers through education and skills training. This is what real change looks like.",
      date: "Apr 2024",
      location: "Lucknow"
    },
    {
      name: "Rohit Patel",
      job: "Supporter",
      quote: "When I found Bring Smile, I knew this was the right place to donate. The way they combine education with empowerment is so impactful. I'm proud to be part of something that's truly changing lives.",
      date: "Mar 2024",
      location: "Ahmedabad"
    },
    {
      name: "Neha Jain",
      job: "Supporter",
      quote: "I feel honored to support Bring Smile. Their transparency and commitment to helping girls go to school make me confident that my donation is making a real impact.",
      date: "Feb 2024",
      location: "Indore"
    },
    {
      name: "Arvind Ali",
      job: "Supporter",
      quote: "I'm so glad to be part of an organization that is not only educating children but also giving them the skills to succeed. The work they do is truly changing lives, and I'm proud to be a donor.",
      date: "Jan 2024",
      location: "Bhopal"
    },
    {
      name: "Priya Tiwari",
      job: "Supporter",
      quote: "It's amazing to see how Bring Smile is transforming the lives of girls. The donation I've made is helping these girls fulfill their potential, and that's why I continue to support them year after year.",
      date: "Dec 2023",
      location: "Kanpur"
    },
    {
      name: "Harish Deshmukh",
      job: "Supporter",
      quote: "Donating to Bring Smile is more than just giving money—it's about giving hope. I can see how my donation is directly helping children go to school and change their futures. It's truly fulfilling.",
      date: "Nov 2023",
      location: "Nagpur"
    },
    {
      name: "Sakshi Gupta",
      job: "Supporter",
      quote: "I am grateful to be part of Bring Smile. Their work to educate girls and provide vocational training to women resonates deeply with me. I am proud to contribute to their mission.",
      date: "Oct 2023",
      location: "Surat"
    },
    {
      name: "Arvind Verma",
      job: "Supporter",
      quote: "The impact of Bring Smile is clear from the success stories of the women and girls they support. I am honored to support their work and excited to see the positive change it brings.",
      date: "Sep 2023",
      location: "Vadodara"
    },
    {
      name: "Sumitra Kumari",
      job: "Supporter",
      quote: "When I heard about the work Bring Smile is doing for girls in underserved communities, I knew I had to donate. It's truly inspiring to see how education can uplift entire communities.",
      date: "Aug 2023",
      location: "Patna"
    },
    {
      name: "Aman Reddy",
      job: "Supporter",
      quote: "I've seen firsthand the difference education can make in the lives of children. Supporting Bring Smile has allowed me to be a part of this transformation. I'm excited to see how these girls thrive in the future.",
      date: "Jul 2023",
      location: "Visakhapatnam"
    },
    {
      name: "Anita Bedi",
      job: "Supporter",
      quote: "I strongly believe in equal opportunities for all, and Bring Smile makes this possible. Supporting their work gives me a sense of purpose. I'm proud to be a donor.",
      date: "Jun 2023",
      location: "Chandigarh"
    },
    {
      name: "Suresh Rao",
      job: "Supporter",
      quote: "What I love most about Bring Smile is their focus on empowering girls to become leaders of tomorrow. Education is the most powerful tool for change, and I'm proud to support this mission.",
      date: "May 2023",
      location: "Mysore"
    }
  ];

  const stats = [
    { icon: Star, value: "4.9/5", label: "Average Rating", color: "from-blue-500 to-blue-600" },
    { icon: Users, value: "2,157+", label: "Happy Supporters", color: "from-blue-600 to-blue-700" },
    { icon: Heart, value: "98%", label: "Would Recommend", color: "from-blue-700 to-blue-800" },
    { icon: Award, value: "500+", label: "Lives Transformed", color: "from-blue-800 to-blue-900" }
  ];

  // Filter testimonials based on search and filter
  const filteredTestimonials = testimonialsData.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'recent' && testimonial.date.includes('2024')) ||
                         (filterType === 'mothers' && testimonial.job.includes('Mother'));
    
    return matchesSearch && matchesFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Stories of Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how our community of supporters is creating real change through education, empowerment, and hope. Every story represents a life transformed.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search testimonials..."
                className="pl-10 pr-4 py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-6 py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Stories</option>
              <option value="recent">Recent 2024</option>
              <option value="mothers">Mothers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md border border-blue-200 group hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                index={index}
                name={testimonial.name}
                job={testimonial.job}
                quote={testimonial.quote}
                date={testimonial.date}
                location={testimonial.location}
                isActive={activeTestimonial === index}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mb-16">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Results Info */}
          <div className="text-center text-gray-600 mb-8">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredTestimonials.length)} of {filteredTestimonials.length} testimonials
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our community of supporters and help transform lives through education and empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Start Supporting
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;