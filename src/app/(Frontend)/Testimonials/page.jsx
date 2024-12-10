"use client"
import React, { useState } from 'react';
import logo from "../../../../public/logo/Smile.png";
import Image from 'next/image';

const testimonialsData = [
    {
        name: "Priya Sharma",
        job: "Supporter",
        quote: "I’ve always believed that education is the key to change. Supporting Bring Smile allows me to contribute towards educating girls who need it most. I’m so proud to see how they’re helping young girls fulfill their dreams."
    },
    {
        name: "Ankit Kapoor",
        job: "Supporter",
        quote: "Donating to Bring Smile was an easy choice for me. I’ve seen how education transforms lives, and I’m happy to be part of this cause. It’s inspiring to see girls who would otherwise be left behind, getting the chance to learn."
    },
    {
        name: "Seema Khan",
        job: "Mother and Supporter",
        quote: "As a mother, it’s close to my heart to see girls getting an education. When I heard about Bring Smile, I knew I wanted to help. Every girl deserves to feel empowered and have access to education."
    },
    {
        name: "Rajesh Kumar",
        job: "Supporter",
        quote: "Supporting Bring Smile has been one of the most fulfilling things I’ve done. It’s incredible to see how even a small donation can go such a long way in changing a child’s life. I’m so happy to be part of this initiative."
    },
    {
        name: "Anjali Reddy",
        job: "Supporter",
        quote: "I never had the chance to study in a school, so I understand the value of education. When I found Bring Smile, I knew I had to help provide that opportunity to others. It’s such a joy to see girls go to school and chase their dreams."
    },
    {
        name: "Vineet Joshi",
        job: "Supporter",
        quote: "I donate to Bring Smile because I believe every woman deserves an opportunity. Seeing how they empower women through skills training and education is something I’m proud to support."
    },
    {
        name: "Radhika Iyer",
        job: "Supporter",
        quote: "The work Bring Smile is doing is truly inspiring. I’m proud to support an organization that gives girls the opportunity to change their futures. Education is the greatest gift, and it’s heartwarming to know my donation is making a difference."
    },
    {
        name: "Sanjay Yadav",
        job: "Supporter",
        quote: "Sponsoring a child through Bring Smile was one of the best decisions I’ve made. I’ve seen firsthand how education changes lives, and knowing that I am part of this transformation is something I will always cherish."
    },
    {
        name: "Meera Singh",
        job: "Supporter",
        quote: "I support Bring Smile because they do more than just educate—they empower. I am inspired by the women who are breaking barriers through education and skills training. This is what real change looks like."
    },
    {
        name: "Rohit Patel",
        job: "Supporter",
        quote: "When I found Bring Smile, I knew this was the right place to donate. The way they combine education with empowerment is so impactful. I’m proud to be part of something that’s truly changing lives."
    },
    {
        name: "Neha Jain",
        job: "Supporter",
        quote: "I feel honored to support Bring Smile. Their transparency and commitment to helping girls go to school make me confident that my donation is making a real impact."
    },
    {
        name: "Arvind Ali",
        job: "Supporter",
        quote: "I’m so glad to be part of an organization that is not only educating children but also giving them the skills to succeed. The work they do is truly changing lives, and I’m proud to be a donor."
    },
    {
        name: "Priya Tiwari",
        job: "Supporter",
        quote: "It’s amazing to see how Bring Smile is transforming the lives of girls. The donation I’ve made is helping these girls fulfill their potential, and that’s why I continue to support them year after year."
    },
    {
        name: "Harish Deshmukh",
        job: "Supporter",
        quote: "Donating to Bring Smile is more than just giving money—it’s about giving hope. I can see how my donation is directly helping children go to school and change their futures. It’s truly fulfilling."
    },
    {
        name: "Sakshi Gupta",
        job: "Supporter",
        quote: "I am grateful to be part of Bring Smile. Their work to educate girls and provide vocational training to women resonates deeply with me. I am proud to contribute to their mission."
    },
    {
        name: "Arvind Verma",
        job: "Supporter",
        quote: "The impact of Bring Smile is clear from the success stories of the women and girls they support. I am honored to support their work and excited to see the positive change it brings."
    },
    {
        name: "Sumitra Kumari",
        job: "Supporter",
        quote: "When I heard about the work Bring Smile is doing for girls in underserved communities, I knew I had to donate. It’s truly inspiring to see how education can uplift entire communities."
    },
    {
        name: "Aman Reddy",
        job: "Supporter",
        quote: "I’ve seen firsthand the difference education can make in the lives of children. Supporting Bring Smile has allowed me to be a part of this transformation. I’m excited to see how these girls thrive in the future."
    },
    {
        name: "Anita Bedi",
        job: "Supporter",
        quote: "I strongly believe in equal opportunities for all, and Bring Smile makes this possible. Supporting their work gives me a sense of purpose. I’m proud to be a donor."
    },
    {
        name: "Suresh Rao",
        job: "Supporter",
        quote: "What I love most about Bring Smile is their focus on empowering girls to become leaders of tomorrow. Education is the most powerful tool for change, and I’m proud to support this mission."
    },
    {
        name: "Rajani Patel",
        job: "Supporter",
        quote: "Donating to Bring Smile feels like I’m making a direct impact. Knowing my contribution is helping someone learn and build a better future is a beautiful feeling."
    },
    {
        name: "Devika Soni",
        job: "Supporter",
        quote: "I found out about Bring Smile through a friend, and I’m so glad I decided to get involved. Seeing how they’re helping girls and women rise through education is incredibly motivating."
    },
    {
        name: "Kiran Yadav",
        job: "Supporter",
        quote: "I’ve been supporting Bring Smile for a few years now, and I’ve seen the change they’re making. I’m proud to be a small part of such a powerful mission to uplift and educate girls."
    },
    {
        name: "Vikas Malhotra",
        job: "Supporter",
        quote: "It’s incredible to see the difference Bring Smile makes with its programs. Every time I receive an update, I’m more impressed by the positive impact they’re creating. I’m glad to support them."
    },
    {
        name: "Nandini Sharma",
        job: "Supporter",
        quote: "I was looking for a way to contribute to education, and Bring Smile caught my attention because of their focus on both education and empowerment. I’m happy to support them."
    },
    {
        name: "Manish Kumar",
        job: "Supporter",
        quote: "When I saw the impact that Bring Smile was having, I didn’t hesitate to donate. Their work to empower young girls and women is inspiring, and I feel privileged to support it."
    },
    {
        name: "Sneha Khan",
        job: "Supporter",
        quote: "Supporting Bring Smile feels like I’m helping to create real change. Education is so important, and I’m proud to be a part of an organization that’s making a difference in so many lives."
    },
    {
        name: "Ravi Singh",
        job: "Supporter",
        quote: "Education is the best gift, and Bring Smile is making that gift available to girls who need it the most. I’m grateful to be a part of this incredible journey."
    },
    {
        name: "Vijay Patel",
        job: "Supporter",
        quote: "I’m proud to donate to an organization that is doing such meaningful work. Bring Smile is not just about providing education—it’s about giving opportunities, hope, and a brighter future to girls and women."
    },
    {
        name: "Deepak Mehta",
        job: "Supporter",
        quote: "I’m so glad I found Bring Smile. They are doing such incredible work, and I’m proud to be able to contribute to the education and empowerment of girls and women. It’s an investment in the future, and I’m excited to see what’s next."
    }
    
];

const TestimonialCard = ({ avatar, name, job, quote }) => {
  return (
    <div className="flex flex-col overflow-hidden shadow-xl">
      <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
        <div className="flex-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-[#FDB241]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            ))}
          </div>

          <blockquote className="flex-1 mt-8">
            <p className="text-lg leading-relaxed text-gray-900 font-pj">{quote}</p>
          </blockquote>
        </div>
        <div className="flex items-center mt-8">
          <div className="flex-shrink-0 relative w-11 h-11">
            <Image
              className="rounded-full object-cover"
              src={logo}
              alt={name}
              layout="fill"
            />
          </div>
          <div className="ml-4">
            <p className="text-base font-bold text-gray-900 font-pj">{name}</p>
            <p className="mt-0.5 text-sm font-pj text-gray-600">{job}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const itemsPerPage = 3;  // Number of testimonials per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the starting and ending index based on the current page
  const indexOfLastTestimonial = currentPage * itemsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - itemsPerPage;
  const currentTestimonials = testimonialsData.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

  // Function to handle the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(testimonialsData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="flex flex-col items-center">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-600 font-pj">
          2,157 people have said how good BringSmile Foundation
        </p>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
          Our happy clients say about us
        </h2>
      </div>

      <div className="relative mt-10 md:mt-24 md:order-2">
        <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
          <div
            className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
            style={{
              background:
                'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
            }}
          ></div>
        </div>

        <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
          {currentTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              job={testimonial.job}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>     
    </div>
  </div>
  <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={prevPage}
          className="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-700"
        >
          Next
        </button>
      </div>
</section>


  );
};

export default Testimonials;
