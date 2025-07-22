"use client"
import Image from "next/image";
import { Soup, Users, CalendarCheck } from "lucide-react";
import img from '../../../../public/admin/bhandara.jpg'

const FoodBhandara = () => {
  return (
    <section
      aria-labelledby="food-bhandara-title"
      className="bbg-gray-50  py-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left: Image */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 lg:w-1/2 lg:h-[400px] shadow-2xl rounded-3xl overflow-hidden order-last lg:order-first">
          <Image
            src={img}
            alt="Volunteers serving free food at Jonojivan Garib Kalyan Bhandara"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
            priority
          />
        </div>

        {/* Right: Info Card */}
        <div className="flex-1 max-w-xl bg-white bg-opacity-95 backdrop-blur-lg border-2 border-orange-300 rounded-3xl shadow-lg px-8 py-10 sm:px-12 sm:py-14">
          {/* Title and Subheader */}
          <h1
            id="food-bhandara-title"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
              Jonojivan Garib Kalyan
            </span>
            Food
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600">
              Bhandara Seva
            </span>
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl mb-6">
            No one should sleep hungry! Join our mission to provide nutritious, hygienic free meals to underprivileged individuals and families through regular Bhandara events across the city.
          </p>
          {/* Highlights List */}
          <ul className="space-y-3 text-gray-900 text-base sm:text-lg mb-8">
            <li className="flex items-center gap-3">
              <Users className="h-5 w-5 text-orange-500 flex-shrink-0" aria-hidden="true" />
              <span>Daily meals for <strong>everyone in need</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <CalendarCheck className="h-5 w-5 text-orange-500 flex-shrink-0" aria-hidden="true" />
              <span>Regular & special festival Bhandaras</span>
            </li>
            <li className="flex items-center gap-3">
              <Soup className="h-5 w-5 text-orange-500 flex-shrink-0" aria-hidden="true" />
              <span>Hygienic, freshly cooked <strong>vegetarian food</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-pink-400 flex-shrink-0 mt-1"></span>
              <span>No cost, <strong>no discrimination</strong></span>
            </li>
          </ul>
          <a
            href="/#contact"
            className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition transform hover:scale-105 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Request Free Food Help
          </a>
        </div>
      </div>
    </section>
  );
};

export default FoodBhandara;
