"use client";
import React, { useState } from "react";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Grid,
} from "lucide-react";

const images = [
  {
    src: "/mediaGallery/img1.jpeg",
    alt: "Gallery Image 1",
    title: "Moments of Learning",
    description: "Children discovering the joy of education",
  },
  {
    src: "/mediaGallery/img2.jpeg",
    alt: "Gallery Image 2",
    title: "Community Impact",
    description: "Building stronger communities together",
  },
  {
    src: "/mediaGallery/img3.jpeg",
    alt: "Gallery Image 3",
    title: "Success Stories",
    description: "Celebrating achievements and milestones",
  },
  {
    src: "/mediaGallery/img4.jpeg",
    alt: "Gallery Image 4",
    title: "Educational Programs",
    description: "Innovative learning approaches",
  },
  {
    src: "/mediaGallery/img5.jpeg",
    alt: "Gallery Image 5",
    title: "Volunteer Activities",
    description: "Hearts and hands working together",
  },
  {
    src: "/mediaGallery/img6.jpeg",
    alt: "Gallery Image 6",
    title: "Creative Workshops",
    description: "Nurturing creativity and expression",
  },
  {
    src: "/mediaGallery/img7.jpeg",
    alt: "Gallery Image 7",
    title: "Technology Learning",
    description: "Digital literacy for the future",
  },
  {
    src: "/mediaGallery/img8.jpeg",
    alt: "Gallery Image 8",
    title: "Cultural Programs",
    description: "Celebrating diversity and tradition",
  },
  {
    src: "/mediaGallery/img9.jpeg",
    alt: "Gallery Image 9",
    title: "Sports & Recreation",
    description: "Building character through play",
  },
  {
    src: "/mediaGallery/img10.jpeg",
    alt: "Gallery Image 10",
    title: "Future Leaders",
    description: "Empowering tomorrow's changemakers",
  },
  {
    src: "/mediaGallery/img11.jpeg",
    alt: "Gallery Image 10",
    title: "Jonojivan",
    description: "Empowering tomorrow's changemakers",
  },
  {
    src: "/mediaGallery/img12.jpeg",
    alt: "Gallery Image 10",
    title: "Jonojivan",
    description: "Empowering tomorrow's changemakers",
  },
];

export default function MediaGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          transition: all 0.4s ease;
        }
        .hover-scale:hover {
          transform: scale(1.02);
          transition: all 0.3s ease;
        }
        .glass-card {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
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

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .shape {
          position: absolute;
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 51, 234, 0.1)
          );
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .shape:nth-child(1) {
          width: 60px;
          height: 60px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape:nth-child(2) {
          width: 80px;
          height: 80px;
          top: 60%;
          right: 15%;
          animation-delay: -8s;
        }

        .shape:nth-child(3) {
          width: 40px;
          height: 40px;
          bottom: 30%;
          left: 30%;
          animation-delay: -15s;
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
          100% {
            transform: translateY(0px) rotate(360deg);
          }
        }
      `}</style>

      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                <Camera className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Media
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Capturing moments that matter. Explore our collection of impactful
              stories through powerful imagery.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-blue-200">
              <Grid className="w-5 h-5" />
              <span className="text-lg">{images.length} Images</span>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="group glass-card rounded-2xl overflow-hidden shadow-xl hover-lift cursor-pointer slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex flex-col items-center justify-center">
              <div className="relative flex-1 w-full flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mt-4 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-200 text-sm mb-3">
                  {selectedImage.description}
                </p>
                <div className="text-gray-300 text-sm">
                  Image {currentIndex + 1} of {images.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="fade-in">
              <div className="text-3xl sm:text-4xl font-bold mb-2">
                {images.length}
              </div>
              <div className="text-blue-200">Images in Gallery</div>
            </div>
            <div className="fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl sm:text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-200">Stories Captured</div>
            </div>
            <div className="fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-3xl sm:text-4xl font-bold mb-2">∞</div>
              <div className="text-blue-200">Moments of Impact</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}