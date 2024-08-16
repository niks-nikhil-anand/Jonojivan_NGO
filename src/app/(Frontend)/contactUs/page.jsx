'use client'
import React from 'react'
import { motion } from 'framer-motion'
import contactUsImage from '../../../../public/frontend/contactUsImage.jpg'

export default function Contact() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <motion.div
            className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              We'd love to hear your thoughts
            </p>
          </motion.div>
          <motion.p
            className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            We Value Your Feedback
          </motion.p>
          <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
            Your opinions and experiences matter to us. Please feel free to share your thoughts, and let's make things better together.
          </p>
        </div>
        <div className="mx-auto max-w-7xl py-12 md:py-24">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
                <p className="mt-4 text-lg text-gray-600">
                  Our friendly team is here to assist you.
                </p>
                <form className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                      <input
                        className="flex h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        type="text"
                        id="first_name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700"
                        htmlFor="last_name"
                      >
                        Last Name
                      </label>
                      <input
                        className="flex h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        type="text"
                        id="last_name"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700"
                      htmlFor="phone_number"
                    >
                      Phone Number
                    </label>
                    <input
                      className="flex h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      type="tel"
                      id="phone_number"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="flex h-24 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      id="message"
                      placeholder="Leave us a message"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
            <motion.img
              alt="Contact us"
              className="hidden max-h-full w-full rounded-lg object-cover lg:block"
              src={contactUsImage.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
      <hr className="mt-6" />
    </div>
  )
}
