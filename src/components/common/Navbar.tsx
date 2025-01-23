"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight, Search } from 'lucide-react'
import { products, type ProductCategories, ProductCategory, type ProductItem } from "@/components/data/product"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showProductMenu, setShowProductMenu] = useState(false)
  const [activeCategory, setActiveCategory] = useState<ProductCategories | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white shadow-lg" : "bg-white/80 backdrop-blur-md"
        }`}
    >
      <div className="h-10 w-full bg-gray-900 flex items-center justify-between px-[300px]">
        <span className="text-white">Authorised Channel Partner of Milton Roy</span>
        <span className="text-white">
          <span className="text-white">GST No : </span>23AAGFD3172Q1Z7
        </span>
        <span className="text-white">
          <span>Phone No :</span>7313748861
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-2xl tracking-tight hover:text-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            LOGO
          </Link>

          <div className="hidden md:flex items-center justify-center space-x-6">
            <Link href="/" className="relative group py-2">
              <span className="text-black hover:text-gray-600 transition-colors">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            <div
              className="relative group py-2"
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => {
                setShowProductMenu(false)
                setActiveCategory(null)
                setSelectedProduct(null)
              }}
            >
              <Link href="/product" className="relative group py-2">
                <span className="text-black hover:text-gray-600 transition-colors">Product</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>

              {showProductMenu && (
                <div className="absolute left-0 mt-2 bg-white shadow-xl rounded-lg border border-gray-200 transition-all duration-300 flex">
                  {/* Main Categories */}
                  <div className="w-64 py-4 border-r border-gray-200">
                    {Object.entries(products).map(([key, category]) => (
                      <div
                        key={key}
                        className="relative"
                        onMouseEnter={() => setActiveCategory(key as ProductCategories)}
                      >
                        <div
                          className={`px-6 py-3 hover:bg-gray-100 cursor-pointer transition-all duration-300 ${activeCategory === key ? "bg-gray-100" : ""
                            }`}
                        >
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sub Categories */}
                  {activeCategory && (
                    <div className="w-64 py-4 bg-gray-50">
                      {products[activeCategory].items.map((item) => (
                        <div key={item.name} className="relative" onMouseEnter={() => setSelectedProduct(item)}>
                          <Link
                            href={`/category/${activeCategory}`}
                            className={`px-6 py-3 hover:bg-gray-100 flex items-center justify-between transition-all duration-300 ${
                              selectedProduct === item ? "bg-gray-100" : ""
                            }`}
                          >
                            <span className="text-sm">{item.name}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}


                  {/* Preview Section */}
                  {selectedProduct && (
                    <div className="w-80 p-6 bg-white flex items-center justify-center">
                      <div className="text-center">
                        <img
                          src={selectedProduct.image || "/placeholder.svg"}
                          alt={selectedProduct.name}
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

            <Link href="/about" className="relative group py-2">
              <span className="text-black hover:text-gray-600 transition-colors">Company Profile</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            <Link href="/contact" className="relative group py-2">
              <span className="text-black hover:text-gray-600 transition-colors">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>

          <div className="relative hidden md:block w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}