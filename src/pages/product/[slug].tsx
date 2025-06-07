"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronRight, 
  Share2, 
  Heart, 
  Phone, 
  Mail, 
  CheckCircle, 
  Star,
  ArrowLeft,
  Download,
  MessageSquare,
  Truck,
  Shield,
  Award,
  Calendar
} from "lucide-react"
import productsData from "@/components/data/products-complete.json"
import ProductCard from "@/components/product/ProductCard"

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

const products = productsData.categories as Record<string, ProductCategory>

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query

  const [productData, setProductData] = useState<ProductItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications'>('specs')
  
  const [formData, setFormData] = useState({
    requirements: "",
    email: "",
    mobile: "",
    company: "",
    quantity: ""
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  useEffect(() => {
    if (slug) {
      setIsLoading(true)
      // Simulate network delay for better UX
      const timer = setTimeout(() => {
        const foundProduct = Object.values(products)
          .flatMap((category: ProductCategory) => category.items)
          .find((item: ProductItem) => item.id === slug)

        if (foundProduct) {
          setProductData(foundProduct)
        } else {
          router.push("/404")
        }
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [slug, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add success feedback here
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productData?.name,
        text: productData?.description,
        url: window.location.href,
      })    }
  }
  
  const getSimilarProducts = () => {
    return Object.values(products)
      .flatMap((category: ProductCategory) => category.items)
      .filter((item: ProductItem) => item.id !== productData?.id)
      .slice(0, 4)
  }

  const getCurrentCategory = () => {
    return Object.values(products).find((category: ProductCategory) => 
      category.items.some(item => item.id === productData?.id)
    )
  }

  const handleCallNow = () => {
    window.open('tel:+919876543210', '_self')
  }

  const handleSendInquiry = () => {
    // Scroll to the inquiry form
    const inquiryForm = document.getElementById('inquiry-form')
    if (inquiryForm) {
      inquiryForm.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isLoading || !productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading product details...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Modern Hero Section */}
      <motion.div 
        className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:50px_50px]"></div>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-primary-400/20 to-accent-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative container-custom py-8">
          {/* Navigation Bar */}
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Back Button */}
            <Link 
              href="/product"
              className="flex items-center text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Products</span>
            </Link>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleShare}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 backdrop-blur-sm rounded-lg transition-colors ${
                  isWishlisted 
                    ? 'bg-red-500/20 text-red-300' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center text-sm text-white/70 mb-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/product" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white font-medium">{productData.name}</span>
          </motion.nav>
          
          {/* Hero Content */}
          <motion.div 
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="font-heading text-4xl lg:text-6xl font-bold mb-6 text-gradient"
              variants={itemVariants}
            >
              {productData.name}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl"
              variants={itemVariants}
            >
              {productData.description}
            </motion.p>
            
            {/* Key Stats */}
            <motion.div 
              className="flex flex-wrap gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white font-medium">Premium Quality</span>
              </div>
              
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                <Shield className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white font-medium">2 Year Warranty</span>
              </div>
              
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                <Truck className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-medium">Free Shipping</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>      <main className="container-custom py-16">
        {/* Product Gallery and Details Grid */}
        <motion.div 
          className="grid lg:grid-cols-5 gap-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {/* Product Image Gallery */}
          <motion.div 
            className="lg:col-span-3"
            variants={imageVariants}
          >            <div className="sticky top-8">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group mb-6">
                {/* Image Container with controlled dimensions */}
                <div className="relative h-80 sm:h-96 lg:h-[400px] bg-white m-4 sm:m-6 rounded-xl flex items-center justify-center p-4">
                  <div className="relative w-full h-full max-w-sm max-h-72 sm:max-w-md sm:max-h-80">
                    <Image
                      src={productData.image || "/placeholder.svg"}
                      alt={productData.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 400px"
                      quality={95}
                    />
                  </div>
                </div>
                
                {/* Premium Badge */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-accent-500 to-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <Award className="w-4 h-4 inline mr-1" />
                  Premium
                </div>
                
                {/* Zoom Indicator */}
                <div className="absolute bottom-6 right-6 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to zoom
                </div>
              </div>
              
              {/* Thumbnail Gallery - if multiple images available */}
              {/* <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((_, index) => (
                  <button
                    key={index}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={productData.image || "/placeholder.svg"}
                      alt={`${productData.name} view ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div> */}
            </div>
          </motion.div>          {/* Product Information */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={itemVariants}
          >            {/* Product Details Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="font-heading text-xl font-semibold text-secondary-900 mb-6">Product Details</h3>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {productData.specifications ? (
                  Object.entries(productData.specifications).slice(0, 6).map(([key, value], index) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-secondary-600 font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </span>
                      <span className="text-secondary-900 font-semibold">{value}</span>
                    </div>
                  ))
                ) : (
                  // Fallback product details when specifications are not available
                  [
                    { label: 'Color', value: 'Yellow' },
                    { label: 'Size', value: 'Different Available' },
                    { label: 'Product Type', value: 'Metal Automatic Pinch Valve' },
                    { label: 'Usage', value: 'Industrial' },
                    { label: 'Pressure', value: 'High Pressure' },
                    { label: 'Application', value: 'Industrial' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-secondary-600 font-medium">{item.label}:</span>
                      <span className="text-secondary-900 font-semibold">{item.value}</span>
                    </div>
                  ))
                )}
              </div>
                {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={handleCallNow}
                  className="btn-primary flex items-center justify-center space-x-2 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </motion.button>
                
                <motion.button
                  onClick={handleSendInquiry}
                  className="btn-secondary flex items-center justify-center space-x-2 py-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </motion.button>              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Key Features and Trust Indicators Below Image and Price */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Key Features Highlight */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="font-heading text-xl font-semibold text-secondary-900 mb-6">Key Highlights</h3>
            <div className="space-y-4">
              {productData.features?.slice(0, 4).map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-600 leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="font-heading text-xl font-semibold text-secondary-900 mb-6">Why Choose Us</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-secondary-900">2 Year Warranty</p>
                <p className="text-xs text-secondary-600">Comprehensive coverage</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-secondary-900">Free Shipping</p>
                <p className="text-xs text-secondary-600">Pan India delivery</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-secondary-900">Certified Quality</p>
                <p className="text-xs text-secondary-600">ISO compliant</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-secondary-900">24/7 Support</p>
                <p className="text-xs text-secondary-600">Expert assistance</p>
              </div>
            </div>
          </div>
        </motion.div>{/* Tabbed Product Information */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-100">
              <nav className="flex">
                {[
                  { id: 'specs', label: 'Specifications', icon: '📋' },
                  { id: 'features', label: 'Features', icon: '⭐' },
                  { id: 'applications', label: 'Applications', icon: '🏭' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 relative ${
                      activeTab === tab.id
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-secondary-600 hover:text-secondary-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'specs' && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}                  >
                    <h3 className="font-heading text-2xl font-semibold text-secondary-900 mb-6">Technical Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {productData.specifications && Object.entries(productData.specifications).map(([key, value], index) => (
                        <motion.div 
                          key={key}
                          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <dt className="font-semibold text-secondary-900 text-lg mb-2 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </dt>
                          <dd className="text-secondary-600 text-lg">{value}</dd>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-heading text-2xl font-semibold text-secondary-900 mb-6">Key Features & Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {productData.features?.map((feature, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-secondary-600 leading-relaxed text-lg">{feature}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'applications' && (
                  <motion.div
                    key="applications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}                  >
                    <h3 className="font-heading text-2xl font-semibold text-secondary-900 mb-6">Industrial Applications</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {(productData.applications || getCurrentCategory()?.applications || []).map((application, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-sm font-bold">•</span>
                          </div>
                          <p className="text-secondary-600 leading-relaxed text-lg">{application}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Modern Inquiry Form */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white p-8">
              <h2 className="font-heading text-3xl font-bold mb-2">Get Detailed Quote</h2>
              <p className="text-primary-100">Share your requirements and get personalized pricing</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-secondary-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@company.com"
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="block text-sm font-semibold text-secondary-900 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-secondary-900 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Your Company Ltd."
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-secondary-900 mb-2">
                    Quantity Required
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                    placeholder="e.g., 10 units"
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="requirements" className="block text-sm font-semibold text-secondary-900 mb-2">
                  Detailed Requirements *
                </label>
                <textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Please describe your specific requirements, technical specifications, delivery timeline, and any other details..."
                  className="input-field min-h-[120px] resize-y"
                  rows={5}
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Inquiry
                  </span>
                </motion.button>
                
                <motion.button
                  type="button"
                  className="flex-1 btn-secondary py-4 px-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download Brochure
                  </span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Similar Products */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-secondary-900 mb-4">You May Also Like</h2>
            <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
              Explore our other premium products that complement your industrial needs
            </p>
          </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {getSimilarProducts().map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ProductCard 
                  product={{
                    id: item.id,
                    name: item.name,
                    description: item.description || `High-quality ${item.name.toLowerCase()} for industrial applications`,
                    image: item.image,
                    price: item.price ? {
                      min: item.price.min,
                      max: item.price.max,
                      currency: item.price.currency
                    } : {
                      min: 25000,
                      max: 75000,
                      currency: "INR"
                    },
                    specifications: item.specifications ? Object.entries(item.specifications).map(([name, value]) => ({
                      name,
                      value: value as string | number
                    })) : [],
                    features: item.features || [],
                    applications: item.applications || []
                  }} 
                  index={index} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

