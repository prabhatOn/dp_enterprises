"use client"

import React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import useCarousel from "../hooks/useCarousel"

const carouselItems = [
  {
    image: "/assets/products/PNP-Series-Packed-Plunger-Dosing-Pump.jpg?height=300&width=300",
    title: "Innovation at its finest",
    description: "Discover cutting-edge solutions that transform your business landscape.",
  },
  {
    image: "/assets/products/Proteus-Series-Metering-Pump.jpg?height=300&width=300",
    title: "Empowering growth",
    description: "Unlock your potential with our state-of-the-art technologies and services.",
  },
  {
    image: "/assets/products/Multi-Function-Valve.jpg?height=300&width=300",
    title: "Seamless integration",
    description: "Experience smooth transitions and effortless adoption of our solutions.",
  },
  {
    image: "/assets/products/Continuous-Automatic-Preparation-Machine.jpg?height=300&width=300",
    title: "Future-proof strategies",
    description: "Stay ahead of the curve with our forward-thinking approach and solutions.",
  },
]

const Hero = () => {
  const currentIndex = useCarousel(carouselItems)

  return (
    <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white mt-5 rounded-3xl mb-10 p-6 sm:p-8 md:p-12 lg:p-16 relative min-h-[75vh]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-stretch h-full">
          {/* Left top content */}
          <motion.div
            className="w-full md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              DP Enterprises
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6">
              Transforming Ideas into Reality
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See More
              </motion.button>
              <motion.button
                className="px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>

          {/* Center image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="w-full md:w-1/3 h-64 sm:h-80 md:h-96 mx-auto md:absolute md:top-1/5 md:left-1/3 md:transform md:-translate-x-1/2 md:-translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 0.9 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={carouselItems[currentIndex].image || "/placeholder.svg"}
                alt={carouselItems[currentIndex].title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom right description */}
          <motion.div
            className="w-full md:w-1/3 mt-8 md:mt-10 md:self-end md:ml-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center md:text-right"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                  {carouselItems[currentIndex].title}
                </h2>
                <p className="text-base sm:text-lg text-gray-600">{carouselItems[currentIndex].description}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
