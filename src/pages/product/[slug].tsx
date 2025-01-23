"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import type { ProductItem, ProductCategory } from "@/components/data/product"
import { products } from "@/components/data/product"

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query

  const [productData, setProductData] = useState<ProductItem | null>(null)

  const [formData, setFormData] = useState({
    requirements: "",
    email: "",
    mobile: "",
  })

  const headerRef = useRef(null)
  const detailsRef = useRef(null)
  const imageRef = useRef(null)
  const specsRef = useRef(null)
  const featuresRef = useRef(null)
  const applicationsRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      const loadScrollTrigger = async () => {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        // Fetch the product data
        const foundProduct = Object.values(products)
          .flatMap((category: ProductCategory) => category.items)
          .find((item: ProductItem) => item.id === slug)

        if (foundProduct) {
          setProductData(foundProduct)
        } else {
          router.push("/404")
        }
      }

      loadScrollTrigger()
    }
  }, [slug, router])

  useEffect(() => {
    const setupAnimations = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      })

      gsap.from(detailsRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      })

      const animateOnScroll = (ref: React.RefObject<HTMLElement>) => {
        gsap.from(ref.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom-=100",
          },
        })
      }
      ;[specsRef, featuresRef, applicationsRef, formRef].forEach(animateOnScroll)
    }

    setupAnimations()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (!productData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen mt-10 bg-gray-50">
      {/* Breadcrumb */}
      <div ref={headerRef} className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{productData.name}</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div ref={imageRef} className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative aspect-square">
              <Image
                src={productData.image || "/placeholder.svg"}
                alt={productData.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div ref={detailsRef} className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
              <p className="text-gray-600 mb-6">{productData.description}</p>
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-semibold text-blue-600">
                  {formatPrice(productData.price.min)} - {formatPrice(productData.price.max)}
                  <span className="text-sm text-gray-600 ml-2">/Unit</span>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get a Quote
                </button>
              </div>
            </div>

            <div ref={specsRef} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {productData.specifications.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-medium text-gray-700">{spec.name}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={featuresRef} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div ref={applicationsRef} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Applications</h2>
              <ul className="list-disc list-inside space-y-2">
                {productData.applications.map((application, index) => (
                  <li key={index} className="text-gray-600">
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">{productData.description}</p>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.values(products)
              .flatMap((category: ProductCategory) => category.items)
              .filter((item: ProductItem) => item.id !== productData.id)
              .slice(0, 4)
              .map((item: ProductItem) => (
                <Link key={item.id} href={`/product/${item.id}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                    <div className="relative aspect-square">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>
      {/* Inquiry Form */}
      <div ref={formRef} className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Send Inquiry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={formData.requirements}
            onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
            placeholder="Enter your product requirements here..."
            className="w-full min-h-[100px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))}
              placeholder="Mobile Number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Inquiry
            </button>
            <button
              type="button"
              className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Request Callback
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

