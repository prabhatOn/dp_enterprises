"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Menu, X, ChevronDown, Phone, Mail, Package } from "lucide-react"
import productsData from "@/components/data/products-complete.json"

// Type definitions for the complete product data
type ProductCategories = keyof typeof productsData.categories
type ProductItem = {
  id: string
  name: string
  slug: string
  image: string
  description: string
  items?: any[]
}
type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  items: ProductItem[]
}

const products = productsData.categories

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showProductMenu, setShowProductMenu] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ProductCategories | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowProductMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary-800 text-white py-2 px-4 text-sm hidden lg:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>+91 731 2345678</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>info@dpenterprises.com</span>
            </div>
            <div className="text-xs text-secondary-300">
              GST: 23AABFD8781J1ZC | Partner: Mr. Devendra Nagwan
            </div>
          </div>
          <div className="text-xs text-secondary-300">
            Trusted Industrial Solutions Since 2007
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        ref={navRef}
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-medium border-b border-neutral-200" 
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">DP</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-bold text-secondary-900">DP Enterprises</h1>
                <p className="text-xs text-secondary-600">Industrial Solutions</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="nav-link text-secondary-700 hover:text-primary-600 font-medium">
                Home
              </Link>
              
              {/* Products Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowProductMenu(true)}
                onMouseLeave={() => setShowProductMenu(false)}
              >
                <Link href="/product" ><button className="nav-link flex items-center text-secondary-700 hover:text-primary-600 font-medium transition-colors">
                  Products
                  <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${showProductMenu ? 'rotate-180' : ''}`} />
                </button>
                </Link>
                {/* Invisible bridge to prevent dropdown from disappearing */}
                <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                
                {showProductMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white shadow-large rounded-2xl border border-neutral-200 mt-0 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="flex gap-6">
                      {/* Categories List - Left Side */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Product Categories</h3>
                        <div className="space-y-2">
                          {Object.entries(products).map(([key, category]) => (
                            <div
                              key={key}
                              className="group/item"
                              onMouseEnter={() => setActiveCategory(key as ProductCategories)}
                            >
                              <Link
                                href={`/category/${key}`}
                                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-200 border border-transparent hover:border-primary-100"
                              >
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg flex items-center justify-center group-hover/item:from-primary-100 group-hover/item:to-accent-100 transition-colors">
                                <Image
                                  src={category.image}
                                  alt={category.name}
                                  width={32}
                                  height={32}
                                  className="object-contain"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-secondary-900 group-hover/item:text-primary-600 transition-colors text-sm">
                                  {category.name}
                                </h4>
                                <p className="text-xs text-secondary-500">{category.items?.length || 0} products</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-secondary-400 group-hover/item:text-primary-600 transition-colors" />
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Category Details - Right Side */}
                      <div className="w-80 border-l border-neutral-200 pl-6">
                        {activeCategory ? (
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="w-40 h-40 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Image
                                  src={products[activeCategory].image}
                                  alt={products[activeCategory].name}
                                  width={120}
                                  height={120}
                                  className="object-contain"
                                />
                              </div>
                              <h4 className="font-semibold text-secondary-900 text-base mb-2">
                                {products[activeCategory].name}
                              </h4>
                              <p className="text-sm text-secondary-600 mb-4 line-clamp-3">
                                {products[activeCategory].description}
                              </p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-secondary-600">Total Products:</span>
                                <span className="font-medium text-primary-600">{products[activeCategory].items?.length || 0}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-secondary-600">Applications:</span>
                                <span className="font-medium text-secondary-900">{products[activeCategory].applications?.length || 0}+</span>
                              </div>
                            </div>

                            <Link
                              href={`/category/${activeCategory}`}
                              className="block w-full text-center bg-gradient-to-r from-primary-600 to-accent-600 text-white py-2 px-4 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 text-sm font-medium"
                            >
                              View All Products
                            </Link>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                              <Package className="w-8 h-8 text-neutral-400" />
                            </div>
                            <h4 className="font-medium text-secondary-900 mb-2">Select a Category</h4>
                            <p className="text-sm text-secondary-600">Hover over a category to see details</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-neutral-200 mt-4 pt-4 flex items-center justify-between">
                      <div className="text-sm text-secondary-600">
                        <span className="font-medium">{Object.values(products).reduce((total, category) => total + (category.items?.length || 0), 0)}</span> total products across <span className="font-medium">{Object.keys(products).length}</span> categories
                      </div>
                      <Link
                        href="/product"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        View All Products
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about" className="nav-link text-secondary-700 hover:text-primary-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="nav-link text-secondary-700 hover:text-primary-600 font-medium">
                Contact
              </Link>
            </div>

            {/* CTA and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="hidden lg:block btn-primary">
                Get Quote
              </Link>
              
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200 shadow-large">
            <div className="container-custom py-6 space-y-4">
              <Link 
                href="/" 
                className="block py-3 text-secondary-700 hover:text-primary-600 font-medium border-b border-neutral-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                href="/product" 
                className="block py-3 text-secondary-700 hover:text-primary-600 font-medium border-b border-neutral-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              
              <Link 
                href="/about" 
                className="block py-3 text-secondary-700 hover:text-primary-600 font-medium border-b border-neutral-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block py-3 text-secondary-700 hover:text-primary-600 font-medium border-b border-neutral-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link 
                  href="/contact" 
                  className="btn-primary w-full text-center inline-block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

