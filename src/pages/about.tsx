"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { products, ProductCategory } from "@/components/data/product"
import {
  IconBriefcase,
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconReceipt,
  IconBuildingBank,
  IconCoin,
} from "@tabler/icons-react"

const companyFacts = [
  { label: "Nature of Business", value: "Distributor and Supplier", icon: IconBriefcase },
  { label: "Location", value: "Indore, Madhya Pradesh, India", icon: IconMapPin },
  { label: "Year of Establishment", value: "2007", icon: IconCalendar },
  { label: "No. of Employees", value: "06", icon: IconUsers },
  { label: "GST No.", value: "23AAGFD3172Q1Z7", icon: IconReceipt },
  { label: "Brand Name", value: "Milton Roy", icon: IconBriefcase },
  { label: "Banker", value: "HDFC Bank", icon: IconBuildingBank },
  { label: "Annual Turnover", value: "INR 3 Crore", icon: IconCoin },
]

export default function About() {
  const bannerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const factsRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  const isBannerInView = useInView(bannerRef, { once: true })
  const isContentInView = useInView(contentRef, { once: true })
  const isFactsInView = useInView(factsRef, { once: true })
  const isCategoriesInView = useInView(categoriesRef, { once: true })

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[__gothamss_21a51a,__gothamss_Fallback_21a51a]">
      <motion.div
        ref={bannerRef}
        initial="hidden"
        animate={isBannerInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="relative h-[60vh] bg-gradient-to-r from-[#171935] to-[#171935]"
      >
        <Image src="/about-banner.jpg" alt="DP Enterprises Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              DP Enterprises
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-white/90 max-w-3xl mx-auto">
              Leading supplier of Milton Roy Pumps and Dosing Solutions
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={isContentInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
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
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Key Facts</h2>
          <motion.div
            ref={factsRef}
            initial="hidden"
            animate={isFactsInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {companyFacts.map((fact, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl flex items-start"
              >
                <fact.icon className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{fact.label}</h3>
                  <p className="text-gray-600">{fact.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Product Categories</h2>
          <motion.div
            ref={categoriesRef}
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {Object.entries(products).map(([categoryId, category]) => (
              <motion.div key={categoryId} variants={fadeInUp}>
                <Link href={`/products/${categoryId}`} className="group">
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:-translate-y-1">
                    <div className="relative flex flex-col items-center justify-center border-b border-[#d4d4d5] w-full h-[350px]">
                      <Image
                        src={
                          category.image ||
                          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20150842-XS0RmRGTMGfPldqh6bkSHqHNNgMspn.png" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={category.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="flex flex-col flex-1 px-5 py-1 text-[rgba(0,0,0,0.68)] text-xs leading-[1.6] items-center">
                      <h3 className="pt-[10px] pb-[0.2em] mb-[10px] text-[17px] font-bold uppercase leading-[22.1px] border-t border-[rgba(34,36,38,0.1)] hyphens-auto break-words min-h-[80px] w-full text-center">
                        {category.name}
                      </h3>
                      <div className="flex-1 py-[4px] px-[20px] flex flex-col items-center text-[15px] leading-[1.625] font-[__gothamss_21a51a,__gothamss_Fallback_21a51a] mb-4">
                        <p className="text-[#33475b]">{category.description}</p>
                      </div>
                      <span className="text-[17px] text-[#1169af] leading-[27.625px] text-center py-[13px] pb-[25px]">
                        Learn More
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div
        className="relative h-[400px] bg-fixed bg-center bg-no-repeat bg-cover overflow-hidden"
        style={{ backgroundImage: 'url("/assets/bg.jpg")' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(179.99deg, rgba(22, 49, 77, 0.26), rgb(22, 49, 77))" }}
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
                className="inline-block px-8 py-3 bg-white text-[#171935] rounded-md hover:bg-gray-100 transition-colors text-lg font-semibold"
              >
                Back to Top
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

