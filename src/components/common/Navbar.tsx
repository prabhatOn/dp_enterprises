"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, Menu, X } from "lucide-react"
import { products, type ProductCategories, ProductCategory, type ProductItem } from "@/components/data/product"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showProductMenu, setShowProductMenu] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ProductCategories | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
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
    if (isMobileProductMenuOpen) setIsMobileProductMenuOpen(false)
  }

  const toggleMobileProductMenu = () => {
    setIsMobileProductMenuOpen(!isMobileProductMenuOpen)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#152C47] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="h-10 w-full bg-gray-900 flex items-center justify-between px-4 lg:px-[300px]">
        <span className="text-white text-xs sm:text-sm">Authorised Channel Partner of Milton Roy</span>
        <span className="text-white text-xs sm:text-sm hidden sm:inline">
          <span className="text-white">GST No : </span>23AAGFD3172Q1Z7
        </span>
        <span className="text-white text-xs sm:text-sm">
          <span>Phone No : </span>7313748861
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl sm:text-2xl text-white tracking-tight hover:text-gray-300 transition-all duration-300 transform hover:scale-105"
          >
            LOGO
          </Link>

          <div className="hidden md:flex items-center justify-center space-x-6">
            <NavLink href="/" label="Home" />
            <div
              className="relative group py-2"
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => {
                setShowProductMenu(false)
                setActiveCategory(null)
                setSelectedProduct(null)
              }}
            >
              <button className="text-white hover:text-gray-300 transition-colors">Product</button>
              {showProductMenu && (
                <div className="absolute left-0 mt-2 bg-white shadow-xl rounded-lg border border-gray-200 transition-all duration-300 flex">
                  {/* Main Categories */}
                  <div className="w-64 py-4 border-r border-gray-200">
                    {Object.entries(products).map(([key, category]) => (
                      <Link
                        key={key}
                        href={`/category/${key}`}
                        className={`block px-6 py-3 hover:bg-gray-100 cursor-pointer transition-all duration-300 ${
                          activeCategory === key ? "bg-gray-100" : ""
                        }`}
                        onMouseEnter={() => setActiveCategory(key as ProductCategories)}
                      >
                        <span className="text-sm font-medium text-gray-800">{category.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Sub Categories */}
                  {activeCategory && (
                    <div className="w-64 py-4 bg-gray-50">
                      {products[activeCategory].items.map((item) => (
                        <Link
                          key={item.id}
                          href={`/product/${item.id}`}
                          className={`block px-6 py-3 hover:bg-gray-100 transition-all duration-300 ${
                            selectedProduct === item ? "bg-gray-100" : ""
                          }`}
                          onMouseEnter={() => setSelectedProduct(item)}
                        >
                          <span className="text-sm text-gray-700">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Preview Section */}
                  {selectedProduct && (
                    <div className="w-80 p-6 bg-white flex items-center justify-center">
                      <div className="text-center">
                        <Image
                          src={selectedProduct.image || "/placeholder.svg"}
                          alt={selectedProduct.name}
                          width={192}
                          height={192}
                          className="w-48 h-48 object-contain mx-auto mb-4"
                        />
                        <h3 className="text-lg font-medium text-gray-900">{selectedProduct.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">{selectedProduct.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <NavLink href="/about" label="Company Profile" />
            <NavLink href="/contact" label="Contact Us" />
          </div>

          <div className="hidden md:block relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 bg-transparent text-white placeholder-gray-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-white hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#152C47] shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/" label="Home" />
            <div>
              <button
                onClick={toggleMobileProductMenu}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Products
              </button>
              {isMobileProductMenuOpen && (
                <div className="pl-4">
                  {Object.entries(products).map(([key, category]) => (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <MobileNavLink href="/about" label="Company Profile" />
            <MobileNavLink href="/contact" label="Contact Us" />
          </div>
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 border border-gray-600 rounded-full focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 bg-gray-700 text-white placeholder-gray-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative group py-2">
      <span className="text-white hover:text-gray-300 transition-colors">{label}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  )
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition-colors"
    >
      {label}
    </Link>
  )
}

