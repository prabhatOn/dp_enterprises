"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import ProductCard from "@/components/product/ProductCard"
import { products, type ProductItem, type ProductCategory } from "@/components/data/product"

let ScrollTrigger: any
if (typeof window !== "undefined") {
  ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
}

export default function MainProduct() {
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([])
  const [allProducts, setAllProducts] = useState<ProductItem[]>([])
  const [pumpType, setPumpType] = useState<string>("All")
  const [industryCategory, setIndustryCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const productGridRef = useRef<HTMLDivElement>(null)
  const searchingMessageRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const allProductItems = Object.values(products).flatMap((category: ProductCategory) => category.items)
    setAllProducts(allProductItems)
    setFilteredProducts(allProductItems)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(bannerRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        ".filter-controls",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(
        productGridRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 },
      )

      if (searchButtonRef.current) {
        searchButtonRef.current.addEventListener("mouseenter", () => {
          gsap.to(searchButtonRef.current, { scale: 1.1, duration: 0.3 })
        })
        searchButtonRef.current.addEventListener("mouseleave", () => {
          gsap.to(searchButtonRef.current, { scale: 1, duration: 0.3 })
        })
      }
    }
  }, [])

  useEffect(() => {
    setFilteredProducts(
      allProducts.filter(
        (product) =>
          (pumpType === "All" ||
            product.specifications.find((spec) => spec.name === "Product Type")?.value === pumpType) &&
          (industryCategory === "All" || product.applications.includes(industryCategory)) &&
          (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    )
  }, [pumpType, industryCategory, searchTerm, allProducts])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    gsap.to(searchButtonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    })

    if (searchingMessageRef.current) {
      gsap.fromTo(
        searchingMessageRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      )
    }

    setTimeout(() => {
      setIsSearching(false)
      if (searchingMessageRef.current) {
        gsap.to(searchingMessageRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white ">
      <div ref={bannerRef} className="bg-[#152C47] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Industrial Pumps Catalog</h1>
          <p className="text-xl">Explore our range of high-quality pumps designed for various industries.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="filter-controls bg-white p-6 rounded-lg shadow-md mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <div className="w-full md:w-1/3 relative">
              <input
                type="text"
                placeholder="Search pumps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                ref={searchButtonRef}
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex space-x-4">
              <select
                value={pumpType}
                onChange={(e) => setPumpType(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="All">All Pump Types</option>
                <option value="Electro Magnetically Actuated Diaphragm Dosing Pump">
                  Electro Magnetically Actuated
                </option>
                <option value="Electronic Dosing Pump">Electronic Dosing</option>
                <option value="Mechanically Actuated Diaphragm Type Dosing Pump">Mechanically Actuated</option>
                <option value="Hydraulically Actuated Diaphragm Type Dosing Pump">Hydraulically Actuated</option>
                <option value="Packed Plunger Dosing Pump">Packed Plunger</option>
                <option value="Custom">Custom (Specify in search)</option>
              </select>
              <select
                value={industryCategory}
                onChange={(e) => setIndustryCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="All">All Industries</option>
                <option value="Water treatment">Water Treatment</option>
                <option value="Chemical processing">Chemical Processing</option>
                <option value="Food and beverage industry">Food & Beverage</option>
                <option value="Pharmaceutical manufacturing">Pharmaceutical</option>
                <option value="Oil and gas industry">Oil & Gas</option>
                <option value="Mining operations">Mining</option>
                <option value="Power generation plants">Power Generation</option>
              </select>
            </div>
          </form>
        </div>

        {isSearching && (
          <div ref={searchingMessageRef} className="text-center text-xl font-semibold mb-4">
            Searching...
          </div>
        )}

        <div
          ref={productGridRef}
          className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No products found. Please try a different search or filter.
          </div>
        )}
      </main>
    </div>
  )
}

