"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products } from "@/components/data/product"

gsap.registerPlugin(ScrollTrigger)

const companyFacts = [
  { label: "Nature of Business", value: "Distributor and Supplier" },
  { label: "Location", value: "Indore, Madhya Pradesh, India" },
  { label: "Year of Establishment", value: "2007" },
  { label: "No. of Employees", value: "06" },
  { label: "GST No.", value: "23AAGFD3172Q1Z7" },
  { label: "Brand Name", value: "Milton Roy" },
  { label: "Banker", value: "HDFC Bank" },
  { label: "Annual Turnover", value: "INR 3 Crore" },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bannerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      })

      const tableRows = tableRef.current?.querySelectorAll("tr")
      if (tableRows) {
        gsap.from(tableRows, {
          opacity: 0,
          x: -30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
          },
        })
      }

      if (productsRef.current?.children) {
        gsap.from(productsRef.current.children, {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      <div ref={bannerRef} className="relative h-[50vh] bg-gradient-to-r from-[#171935] to-[#171935]">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">DP Enterprises</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Leading supplier of Milton Roy Pumps and Dosing Solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div ref={contentRef} className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              DP Enterprises, established in 2007, is a reputed supplier of Milton Roy pumps, including Electro
              Magnetically Actuated Diaphragm Dosing Pumps and Mechanically Actuated Diaphragm Type Dosing Pumps. Our
              head office in Indore, Madhya Pradesh, serves as the hub for our operations across India.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With over a decade of experience, we have consistently delivered value to our customers while adhering to
              industry norms. Our commitment to customer satisfaction drives us to continually improve and offer the
              best possible solutions in fluid handling and dosing technologies.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Key Facts</h2>
          <div ref={tableRef} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {companyFacts.map((fact, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">
                      {fact.label}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{fact.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h2>
          <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(products).map(([category, product]) => (
              <Link key={category} href={`/products/${category}`} className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <span className="text-blue-600 group-hover:text-blue-800 transition-colors">Learn more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#171935] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-300 mb-8">
            Ready to elevate your fluid handling solutions? Get in touch with us today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Contact Now
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block px-8 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-lg font-semibold"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

