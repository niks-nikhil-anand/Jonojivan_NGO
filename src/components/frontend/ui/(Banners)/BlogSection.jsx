"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BlogSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/admin/dashboard/blog`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className="px-6 py-8">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Make a Difference with Your Donation</h1>
        <h2 className="text-xl mb-4">
          Explore the latest stories, campaigns, and causes that need your support
        </h2>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.slice(0, 4).map((article) => (
          <div
            key={article._id}
            className="flex flex-col md:flex-row bg-gray-100 p-4 shadow-md hover:shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(article._id)}
          >
            {/* Image Section */}
            <div className="relative w-full md:w-1/3">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#EF4339] text-white px-3 py-1 text-sm font-bold rounded-md">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between w-full">
              <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
              <p className="text-gray-600 mt-2">
                {article.subtitle.split(" ").slice(0, 20).join(" ")}
                {article.subtitle.split(" ").length > 20 ? "..." : ""}
              </p>
              <a
                href={`/blog/${article._id}`}
                className="text-red-500 hover:underline text-sm font-bold mt-3"
                onClick={() => handleCardClick(article._id)}
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center md:mt-16 md:order-3">
        <Link
          href={"/blog"}
          title=""
          className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
        >
          Read all Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogSection;
