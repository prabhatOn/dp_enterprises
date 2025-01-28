"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { products } from "../data/product"

const HotDealsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const hotDeals = Object.values(products).flatMap((category) => category.items)
  const totalSlides = hotDeals.length
  const [slidesToShow, setSlidesToShow] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % (totalSlides - slidesToShow + 1))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, totalSlides, slidesToShow])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - slidesToShow : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= totalSlides - slidesToShow ? 0 : prev + 1))
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">Hot Deals</h2>
        </div>
        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 z-10 bg-white/90 rounded-full p-2 sm:p-3 hover:bg-white transition-colors shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-blue-900" />
          </button>

          <div className="overflow-hidden mx-auto">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6 justify-center sm:justify-start"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            >
              {hotDeals.map((product) => (
                <div key={product.id} className={`flex-shrink-0 w-[85vw] sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto sm:mx-0`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full">
                    <div className="p-4">
                      <div className="relative aspect-square mb-4">
                        <Image
                          src={
                            product.image ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20150842-XS0RmRGTMGfPldqh6bkSHqHNNgMspn.png" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 uppercase mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      <Link
                        href={`/product/${product.id}`}
                        className="inline-block text-blue-600 font-semibold hover:text-blue-700 text-sm sm:text-base"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 z-10 bg-white/90 rounded-full p-2 sm:p-3 hover:bg-white transition-colors shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-blue-900" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotDealsCarousel

