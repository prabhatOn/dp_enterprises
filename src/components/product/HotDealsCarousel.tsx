"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import productsData from "@/components/data/products-complete.json"

// Type definitions
type ProductItem = {
  id: string
  name: string
  slug: string
  image: string
  description?: string
  categorySlug?: string
  categoryName?: string
  categoryProductCount?: number
}

type Category = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  items: ProductItem[]
}

const HotDealsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [slidesToShow, setSlidesToShow] = useState(4)

  const categoriesData = Object.values(productsData.categories as Record<string, Category>)

  const allProducts = categoriesData.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      categorySlug: category.slug,
      categoryName: category.name,
      categoryProductCount: category.items.length,
    }))
  )

  const hotDeals = allProducts.slice(0, 12)
  const totalSlides = hotDeals.length

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesToShow(1)
      else if (window.innerWidth < 768) setSlidesToShow(2)
      else if (window.innerWidth < 1024) setSlidesToShow(3)
      else setSlidesToShow(4)
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
    <div className="w-full py-16 pb-24 px-2 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-[1235px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hot <span className="text-blue-600">Deals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our featured industrial equipment with exclusive offers and premium quality solutions.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 z-10 bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg border border-gray-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Track */}
          <div className="overflow-hidden pb-8 px-1">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6 px-2"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {hotDeals.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[92vw] sm:w-[48%] md:w-[32%] lg:w-[25%] xl:w-[23.5%] px-2"
                >
                  <div className="card-elevated h-full bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                    {/* Image */}
                    <div className="relative aspect-square bg-white p-10 sm:p-8 md:p-6 lg:p-5 xl:p-4 2xl:p-3 overflow-hidden">
                      <Image
                        src={product.image || "/assets/products/one.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain scale-[0.82] transition-transform duration-300 group-hover:scale-90"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {product.description ||
                          `Professional ${product.name.toLowerCase()} for industrial applications. High-quality and reliable.`}
                      </p>
                      <div className="pt-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 text-sm group-hover:underline transition-all duration-200"
                        >
                          Explore Products
                          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 z-10 bg-white rounded-full p-3 hover:bg-gray-100 shadow-lg border border-gray-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotDealsCarousel
