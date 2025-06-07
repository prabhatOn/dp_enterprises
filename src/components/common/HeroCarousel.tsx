"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, 
  Shield, 
  Award, 
  Zap, 
  Settings, 
  TrendingUp,
  Phone,
  Star,
  Gauge,
  Package,
  Wrench
} from "lucide-react"
import productsData from "@/components/data/products-complete.json"

// Type definitions for the complete product data
type ProductItem = {
  id: string
  name: string
  slug: string
  image: string
  description?: string
  price?: {
    min: number
    max: number
    currency: string
    unit: string
  }
  specifications?: Record<string, any>
  features?: string[]
  applications?: string[]
  tradeInfo?: Record<string, any>
}

type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  overview?: string
  advantages?: string[]
  applications?: string[]
  items: ProductItem[]
}

interface ProductPreview {
  id: string
  name: string
  image: string
  price: {
    min: number
    max: number
    currency: string
  }
  specs: string[]
}

interface CategorySlide {
  id: number
  category: string
  title: string
  subtitle: string
  description: string
  products: ProductPreview[]
  stats: Array<{
    icon: React.ElementType
    value: string
    label: string
  }>
  theme: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
  cta: {
    primary: { text: string; href: string }
    secondary: { text: string; href: string }
  }
}

const products = productsData.categories as Record<string, ProductCategory>

// Generate slides dynamically from JSON data
const generateCategorySlides = (): CategorySlide[] => {
  const categoryOrder = [
    'electro-actuated-pumps',
    'mechanical-actuated-pumps', 
    'hydraulic-actuated-pumps',
    'plunger-pumps'
  ]

  const statsMapping = {
    'electro-actuated-pumps': [
      { icon: Zap, value: "±1%", label: "Dosing Accuracy" },
      { icon: Shield, value: "500+", label: "Installations" },
      { icon: Award, value: "17+", label: "Years Experience" },
      { icon: TrendingUp, value: "99.9%", label: "Uptime" }
    ],
    'mechanical-actuated-pumps': [
      { icon: Settings, value: "24/7", label: "Continuous Operation" },
      { icon: Shield, value: "300+", label: "Industrial Sites" },
      { icon: Wrench, value: "Low", label: "Maintenance" },
      { icon: TrendingUp, value: "Heavy", label: "Duty Rating" }
    ],
    'hydraulic-actuated-pumps': [
      { icon: Gauge, value: "40+", label: "Bar Pressure" },
      { icon: Shield, value: "200+", label: "Process Plants" },
      { icon: Award, value: "Premium", label: "Performance" },
      { icon: TrendingUp, value: "High", label: "Efficiency" }
    ],
    'plunger-pumps': [
      { icon: Gauge, value: "60+", label: "Bar Pressure" },
      { icon: Package, value: "150+", label: "Heavy Industry" },
      { icon: Shield, value: "Extreme", label: "Durability" },
      { icon: TrendingUp, value: "Max", label: "Performance" }
    ]
  }

  const ctaMapping = {
    'electro-actuated-pumps': {
      primary: { text: "Explore Electro Pumps", href: "/category/electro-actuated-pumps" },
      secondary: { text: "Get Quote", href: "/contact" }
    },
    'mechanical-actuated-pumps': {
      primary: { text: "View Mechanical Range", href: "/category/mechanical-actuated-pumps" },
      secondary: { text: "Technical Support", href: "/contact" }
    },
    'hydraulic-actuated-pumps': {
      primary: { text: "Discover Hydraulic Series", href: "/category/hydraulic-actuated-pumps" },
      secondary: { text: "Pressure Solutions", href: "/contact" }
    },
    'plunger-pumps': {
      primary: { text: "Explore Plunger Range", href: "/category/plunger-pumps" },
      secondary: { text: "Pressure Specs", href: "/contact" }
    }
  }

  return categoryOrder.map((categoryKey, index) => {
    const category = products[categoryKey]
    if (!category) return null    // Convert category products to ProductPreview format
    const productPreviews: ProductPreview[] = category.items.slice(0, 2).map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: {
        min: item.price?.min || 0,
        max: item.price?.max || 0,
        currency: item.price?.currency || "INR"
      },
      specs: [
        item.specifications?.flowRate || item.specifications?.pressure || "High Performance",
        item.specifications?.pressure || item.specifications?.material || "Industrial Grade",
        item.specifications?.material || item.specifications?.usage || "Premium Quality"
      ].filter(Boolean)
    }))

    return {
      id: index + 1,
      category: categoryKey,
      title: category.name.replace("Milton Roy ", ""),
      subtitle: "Milton Roy Premium Solutions",
      description: category.description,
      products: productPreviews,
      stats: statsMapping[categoryKey as keyof typeof statsMapping] || [],
      theme: {
        primary: "from-blue-600 to-blue-800",
        secondary: "bg-blue-100",
        accent: "text-blue-600",
        bg: "bg-white"
      },
      cta: ctaMapping[categoryKey as keyof typeof ctaMapping] || {
        primary: { text: "View Products", href: `/category/${categoryKey}` },
        secondary: { text: "Contact Us", href: "/contact" }
      }
    }
  }).filter(Boolean) as CategorySlide[]
}

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const memoizedSlides = useMemo(() => generateCategorySlides(), [])
  
  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isTransitioning && isLoaded) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % memoizedSlides.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isTransitioning, memoizedSlides.length, isLoaded])

  // Re-enable autoplay after user interaction
  useEffect(() => {
    if (!isAutoplay) {
      const timeout = setTimeout(() => {
        setIsAutoplay(true)
      }, 15000) // Resume autoplay after 15 seconds of no interaction
      return () => clearTimeout(timeout)
    }
  }, [isAutoplay])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return
    setCurrentSlide(index)
    setIsAutoplay(false)
  }, [isTransitioning, currentSlide])
  const currentSlideData = memoizedSlides[currentSlide]

  const ProductCard = ({ product, index }: { product: ProductPreview; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
        className="relative bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 group hover:scale-105 border border-gray-200 overflow-hidden w-64 h-64"
      >        {/* Premium badge - much larger */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm px-3 py-1.5 rounded-full font-medium shadow-sm">
          Pro
        </div>
          <div className="relative h-full flex flex-col">          {/* Extra large image container */}
          <div className="relative h-52 mb-3 overflow-hidden rounded-md bg-gradient-to-br from-gray-50 to-blue-50/30 group-hover:from-blue-50/50 transition-all duration-300">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
            />
          </div>{/* Much larger title */}
          <h4 className="font-semibold text-base text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight flex-1 mb-3">
            {product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}
          </h4>
          
          {/* Much larger key feature */}
          <div>
            <span className="text-sm px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium">
              {product.specs[0]?.substring(0, 20) || 'Premium Quality'}
            </span>
          </div>
        </div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          onAnimationStart={() => setIsTransitioning(true)}
          onAnimationComplete={() => setIsTransitioning(false)}
        >
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="absolute inset-0 bg-white/80"></div>
          </div>

          <div className="relative h-full min-h-screen flex items-center py-12">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8"
                >
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`inline-flex items-center px-4 py-2 ${currentSlideData.theme.secondary} backdrop-blur-sm rounded-full text-sm font-bold ${currentSlideData.theme.accent} border border-current/20`}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    {currentSlideData.subtitle}
                  </motion.div>                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r ${currentSlideData.theme.primary} bg-clip-text text-transparent`}
                  >
                    {currentSlideData.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-base md:text-lg leading-relaxed text-gray-700 max-w-2xl"
                  >
                    {currentSlideData.description}
                  </motion.p>

                  {/* Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  >
                    {currentSlideData.stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200">
                        <div className={`flex items-center justify-center mb-2 w-10 h-10 mx-auto rounded-full ${currentSlideData.theme.secondary}`}>
                          <stat.icon className={`w-5 h-5 ${currentSlideData.theme.accent}`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <Link
                      href={currentSlideData.cta.primary.href}
                      className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${currentSlideData.theme.primary} text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                    >
                      {currentSlideData.cta.primary.text}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <Link
                      href={currentSlideData.cta.secondary.href}
                      className={`inline-flex items-center px-8 py-4 border-2 border-current ${currentSlideData.theme.accent} bg-white hover:bg-gray-50 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105`}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {currentSlideData.cta.secondary.text}
                    </Link>
                  </motion.div>
                </motion.div>                {/* Compact Product Showcase */}
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  {/* Compact Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-6 text-center"
                  >
                    <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full mb-3">
                      <Package className="w-3 h-3 mr-2 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">Featured Products</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Premium {currentSlideData.title}</h3>
                    <p className="text-sm text-gray-600 max-w-xs mx-auto">Discover our industry-leading collection</p>
                  </motion.div>

                  {/* Horizontal Product Grid - Small Square Boxes */}
                  <div className="flex gap-4 justify-center mb-6">
                    {currentSlideData.products.slice(0, 2).map((product, index) => (
                      <Link key={product.id} href={`/product/${product.id}`} className="block">
                        <ProductCard product={product} index={index} />
                      </Link>
                    ))}
                  </div>

                  {/* Compact View All Products Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="text-center"
                  >
                    <Link
                      href={`/category/${currentSlideData.category}`}
                      className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:bg-white hover:shadow-lg transition-all duration-300 group"
                    >
                      View All {currentSlideData.title}
                      <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>

                  {/* Compact Milton Roy Partnership Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-50 to-orange-50 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md border border-yellow-200/50"
                  >
                    <div className="flex items-center space-x-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800">Milton Roy</span>
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5">Authorized Partner</div>
                  </motion.div>

                  {/* Subtle decorative elements */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`absolute -top-6 -left-6 w-24 h-24 ${currentSlideData.theme.secondary} rounded-full blur-2xl`}
                  ></motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    className={`absolute -bottom-8 -right-8 w-32 h-32 ${currentSlideData.theme.secondary} rounded-full blur-3xl`}
                  ></motion.div>
                  
                  {/* Floating elements - smaller */}
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 3, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/4 -left-3 w-4 h-4 bg-blue-200/50 rounded-lg blur-sm"
                  ></motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, 12, 0],
                      rotate: [0, -3, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-1/4 -right-2 w-3 h-3 bg-blue-300/40 rounded-full blur-sm"
                  ></motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>      {/* Navigation - Only Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {memoizedSlides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
          className={`h-full bg-gradient-to-r ${currentSlideData.theme.primary}`}
        />      </div>
    </section>
  )
}

export default HeroCarousel
