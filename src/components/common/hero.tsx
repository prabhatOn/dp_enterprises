"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const carouselData = [
  {
    image: "/assets/products/two.jpg",
    title: "Innovative Pumping Solutions",
    description: "Discover our range of high-performance pumps for various industries.",
    ctaLink: "/contact",
    moreLink: "/products",
  },
  {
    image: "/assets/products/two.jpg",
    title: "Precision in Every Drop",
    description: "Our dosing pumps ensure accurate and reliable fluid handling.",
    ctaLink: "/contact",
    moreLink: "/products/dosing-pumps",
  },
  {
    image: "/assets/products/one.jpg",
    title: "Industrial Strength Pumps",
    description: "Built to withstand the toughest conditions in industrial applications.",
    ctaLink: "/contact",
    moreLink: "/products/industrial-pumps",
  },
  {
    image: "/assets/products/two.jpg",
    title: "Smart Pumping Technology",
    description: "Experience the future of pumping with our smart, connected solutions.",
    ctaLink: "/contact",
    moreLink: "/products/smart-pumps",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  return (
    <div className="relative w-full overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {carouselData.map((item, index) => (
          <div key={index} className="relative h-[calc(100vh-4rem)]">
            <div className="absolute inset-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title || "Carousel image"}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                {/* <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1> */}
                {/* <p className="text-xl md:text-2xl mb-8">{item.description}</p> */}
                <div className="flex justify-center space-x-4">
                  <Link
                    href={item.ctaLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transform hover:scale-105 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href={item.moreLink}
                    className="bg-transparent hover:bg-white hover:text-black text-white font-bold py-2 px-6 rounded-full border-2 border-white transform hover:scale-105 transition-all duration-300"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
            onClick={() => sliderRef.current?.slickGoTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

