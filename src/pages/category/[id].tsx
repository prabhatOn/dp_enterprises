"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ChevronRight,
  ArrowLeft,
  Share2,
  Shield,
  Award,
  TrendingUp,
  Star,
  Package,
  CheckCircle
} from "lucide-react"
import productsData from "@/components/data/products-complete.json"
import ProductCard from "@/components/product/ProductCard"

// Type definitions for the complete product data
type ProductItem = {
  id: string
  name: string
  slug: string
  image: string
  description: string // Make required to match ProductCard interface
  price?: {
    min: number
    max: number
    currency: string
    unit: string
  }
  specifications?: Record<string, any>
  features?: string[]
  applications?: string[]
  items?: any[]
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

export default function CategoryProductPage() {
  const params = useParams()
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    if (params?.id) {
      setIsLoading(true)
      // Simulate network delay for better UX
      const timer = setTimeout(() => {
        const categoryId = params.id as string
        const foundCategory = products[categoryId]
        if (foundCategory) {
          setCategory(foundCategory)
        }
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [params?.id])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: category?.name,
        text: category?.description,
        url: window.location.href,
      })
    }
  }

  if (isLoading || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading category...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">      {/* Modern Hero Section */}
      <motion.div 
        className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >        {/* Category Image Background */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/90 via-secondary-800/90 to-primary-900/90" />
        </div>
        
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
            <span className="text-white font-medium">{category.name}</span>
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
              {category.name}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl"
              variants={itemVariants}
            >
              {category.description}
            </motion.p>
            
            {/* Key Stats */}
            <motion.div 
              className="flex flex-wrap gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                <Package className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white font-medium">{category.items.length} Products</span>
              </div>
              
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white font-medium">Premium Quality</span>
              </div>
              
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
                <Shield className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-white font-medium">Certified Products</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="container-custom py-16">
        {/* Category Overview */}
        <motion.section 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            variants={itemVariants}
          >
            {/* Category Info */}
            <div>
              <motion.h2 
                className="font-heading text-3xl lg:text-4xl font-bold text-secondary-900 mb-6"
                variants={itemVariants}
              >
                About {category.name}
              </motion.h2>
                <motion.p 
                className="text-lg text-secondary-700 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                {category.overview || category.description}
              </motion.p>
                {/* Features */}
              <motion.div 
                className="space-y-4"
                variants={itemVariants}
              >
                {category.advantages ? (
                  category.advantages.slice(0, 3).map((advantage, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-secondary-600">{advantage}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-1">High Performance</h4>
                        <p className="text-secondary-600">Industry-leading efficiency and reliability</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-1">Quality Assurance</h4>
                        <p className="text-secondary-600">Rigorous testing and quality control</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-secondary-900 mb-1">Expert Support</h4>
                        <p className="text-secondary-600">Professional installation and maintenance</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>              {/* Category Visual */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              {/* Category Image */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                <div className="relative h-64 bg-white rounded-xl flex items-center justify-center">
                  <div className="relative w-full h-full max-w-xs">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 240px, 300px"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-accent-400 to-primary-500 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Products Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Our Products
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explore our comprehensive range of high-quality {category.name.toLowerCase()}
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
          >            {category.items.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard 
                  product={{
                    id: product.id,
                    name: product.name,
                    description: product.description || `High-quality ${product.name.toLowerCase()} for industrial applications`,
                    image: product.image,
                    price: product.price ? {
                      min: product.price.min,
                      max: product.price.max,
                      currency: product.price.currency
                    } : {
                      min: 25000,
                      max: 75000,
                      currency: "INR"
                    },
                    specifications: product.specifications ? Object.entries(product.specifications).map(([name, value]) => ({
                      name,
                      value: value as string | number
                    })) : [],
                    features: product.features || [],
                    applications: product.applications || []
                  }} 
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}
