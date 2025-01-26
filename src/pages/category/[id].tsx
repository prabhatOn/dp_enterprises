"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products, type ProductCategory, type ProductItem } from "@/components/data/product"
import ProductCard from "@/components/product/ProductCard"

gsap.registerPlugin(ScrollTrigger)

export default function CategoryProductPage() {
  const params = useParams()
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [industries, setIndustries] = useState<string[]>([])

  const bannerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const categoryId = params.id as string
    const foundCategory = products[categoryId]
    if (foundCategory) {
      setCategory(foundCategory)
      const allIndustries = foundCategory.items.flatMap((item) => item.applications)
      const uniqueIndustries = Array.from(new Set(allIndustries))
      setIndustries(uniqueIndustries)
    }
  }, [params.id])

  useEffect(() => {
    if (category) {
      gsap.from(bannerRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      gsap.from(productsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top bottom-=100",
        },
      })
    }
  }, [category])

  if (!category) {
    return <div className="container mx-auto px-4 py-8">Category not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={bannerRef} className="bg-[url('/assets/product-banner.webp')] bg-cover bg-center bg-no-repeat text-white py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl mb-6 max-w-2xl">{category.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
            <button className="bg-white text-blue-600 hover:bg-blue-50 py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300">
              Contact Us
            </button>
            <button className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-lg text-lg font-semibold transition-colors duration-300">
              Request a Quote
            </button>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={600}
              height={400}
              className="rounded-lg shadow-md object-cover w-full h-[400px]"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Category Overview</h2>
            <p className="text-gray-700 mb-6">{category.description}</p>
            <div>
              <h3 className="text-xl font-semibold mb-2">Industry Applications</h3>
              <ul className="list-disc list-inside text-gray-700 columns-2">
                {industries.map((industry, index) => (
                  <li key={index}>{industry}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Products in this Category</h2>
          <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.items.map((product: ProductItem) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/product"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            ← Back to All Products
          </Link>
        </div>
      </div>
    </div>
  )
}

