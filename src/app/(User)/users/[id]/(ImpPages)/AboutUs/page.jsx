'use client'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'




export default function AboutPageOne() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div>
      <div className="flex flex-col gap-10 ">
        {/* Hero Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center pb-10 pt-12 gap-5 md:pt-24 w-full bg-blue-500 h-[60vh] items-center"
        >
          <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-xs font-semibold leading-normal md:text-sm">About the company</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
            Made with love, right here in India
          </p>
          <p className="w-[75%] text-base text-gray-600 md:text-xl">
          Unlock optimal wellness at CleanVeda.com with our premium natural health supplements, herbal personal care products, and rejuvenating skin and hair care solutions. Discover effective, plant-based formulations crafted for holistic health, vitality, and beauty. Shop our organic, cruelty-free products today and elevate your health and beauty regimen with the power of nature!
          </p>
        </motion.div>
        <div className='flex flex-col justify-around px-[10rem]'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex items-center px-4"
        >
          <div className="flex justify-between">
           <div>
           <p className="text-3xl font-bold text-[#D07021] md:text-4xl">The best of nature meets the latest science.</p>
            <p className="max-w-4xl text-base text-[#612BE2xBF] md:text-xl">
            Unlock your potential for optimal wellness at CleanVeda.com. We offer a diverse range of premium natural health supplements, rejuvenating skin and hair care solutions, and herbal personal care products, all designed to nourish your body from the inside out. Our commitment to quality ensures that you receive effective, organic, and cruelty-free products that align with your values and enhance your vitality.
            </p>

            <p className="text-3xl font-bold text-[#D07021] md:text-4xl">Transform Your Health Routine</p>
            <p className="max-w-4xl text-base text-gray-700 md:text-xl">
            At CleanVeda, we believe that true wellness begins with nature. Our premium natural health supplements and herbal personal care products are meticulously crafted to support your journey toward holistic health. Whether you’re looking to boost your vitality or enhance your beauty regimen, our plant-based formulations are designed with your well-being in mind. Experience the transformative power of nature and elevate your health and beauty routine today.
            </p>
           </div>
           <div className="w-full">
                <img
                src="https://plus.unsplash.com/premium_photo-1683121855240-5d3f67a5fdec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGlyaW5nfGVufDB8fDB8fHww"
                className="max-w-full rounded-lg object-cover"
                alt="Hiring Banner"
                />
            </div>
          </div>

          
        </motion.div>
        <hr className="mt-20" />

                    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row"
            >
            <div className="space-y-6">
                <p className="text-sm font-semibold md:text-base text-blue-600">Embrace Wellness with CleanVeda &rarr;</p>
                <p className="text-3xl font-bold md:text-4xl text-green-600">We&apos;re just getting started</p>
                <p className="text-base text-gray-600 md:text-lg">
                Our philosophy is simple — hire a team of diverse, passionate people and foster a
                culture that empowers you to do your best work.
                </p>
                <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white md:px-6 md:py-3"
                >
                Power of Nature
                </button>
            </div>
            <div className="w-full">
                <img
                src="https://plus.unsplash.com/premium_photo-1683121855240-5d3f67a5fdec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGlyaW5nfGVufDB8fDB8fHww"
                className="max-w-full rounded-lg object-cover"
                alt="Hiring Banner"
                />
            </div>
            </motion.div>
        </div>
        

      </div>
    </div>
  )
}
