"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Grid, List, X, Star, ArrowUpDown } from "lucide-react"
import ProductCard from "@/components/product/ProductCard"
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

export default function MainProduct() {  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([])
  const [allProducts, setAllProducts] = useState<ProductItem[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const allProductItems = Object.values(products).flatMap((category: ProductCategory) => category.items)
    setAllProducts(allProductItems)
    setFilteredProducts(allProductItems)
  }, [])
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      let filtered = allProducts.filter(product => {
        const matchesSearch = searchTerm === "" || 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
        
        return matchesSearch
      })

      // Apply sorting
      filtered.sort((a, b) => {
        let aValue = a[sortBy as keyof ProductItem] || ""
        let bValue = b[sortBy as keyof ProductItem] || ""
        
        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue)
          return sortOrder === "asc" ? comparison : -comparison
        }
        
        return 0
      })

      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, sortBy, sortOrder, allProducts])
  const clearAllFilters = () => {
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Modern Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-white border-b border-neutral-200"
      >
        <div className="container-custom py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 mr-2" />
              Premium Industrial Solutions
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-heading font-bold text-secondary-900 mb-6"
            >
              Product <span className="text-gradient">Catalog</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-secondary-600 leading-relaxed"
            >
              Discover our comprehensive range of precision-engineered pumps and dosing solutions
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Search and Filter Bar */}
      <motion.section 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200"
      >
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>            {/* Filter and View Controls */}
            <div className="flex items-center gap-3">
              {/* Results Count */}
              <span className="text-sm text-neutral-600 whitespace-nowrap">
                {filteredProducts.length} products
              </span>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-')
                    setSortBy(field)
                    setSortOrder(order as "asc" | "desc")
                  }}
                  className="appearance-none bg-white border border-neutral-200 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="id-asc">Newest First</option>
                  <option value="id-desc">Oldest First</option>
                </select>
                <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid" 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list" 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>      </motion.section>

      {/* Main Content */}
      <main className="container-custom py-8">        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center gap-3 text-primary-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              <span className="font-medium">Loading products...</span>
            </div>
          </motion.div>
        )}

        {/* Products Grid/List */}
        {!isLoading && (
          <motion.div
            key={`${viewMode}-${filteredProducts.length}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
        )}

        {/* No Results */}
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-heading font-bold text-secondary-900 mb-3">
                No products found
              </h3>              <p className="text-secondary-600 mb-6">
                Try adjusting your search terms to find what you're looking for.
              </p>
              <button
                onClick={clearAllFilters}
                className="btn-primary"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

