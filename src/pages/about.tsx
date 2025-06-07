"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import productsData from "@/components/data/products-complete.json"
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  FileText,
  Award,
  Landmark,
  TrendingUp,
  Shield,
  CheckCircle,
  Target,
  ArrowRight
} from "lucide-react"

// Type definitions for the complete product data
type ProductCategory = {
  id: string
  name: string
  slug: string
  description: string
  image: string
  overview?: string
  advantages?: string[]
  applications?: string[]
  items: any[]
}

const products = productsData.categories as Record<string, ProductCategory>

const companyFacts = [
  { label: "Nature of Business", value: "Distributor and Supplier", icon: Building2 },
  { label: "Location", value: "Indore, Madhya Pradesh, India", icon: MapPin },
  { label: "Year of Establishment", value: "2007", icon: Calendar },
  { label: "No. of Employees", value: "06", icon: Users },
  { label: "GST No.", value: "23AAGFD3172Q1Z7", icon: FileText },
  { label: "Brand Name", value: "Milton Roy", icon: Award },
  { label: "Banker", value: "HDFC Bank", icon: Landmark },
  { label: "Annual Turnover", value: "INR 3 Crore", icon: TrendingUp },
]

const achievements = [
  {
    icon: Shield,
    title: "17+ Years Experience",
    description: "Proven track record in industrial pumping solutions"
  },
  {
    icon: CheckCircle,
    title: "500+ Satisfied Clients",
    description: "Trusted by leading companies across industries"
  },
  {
    icon: Award,
    title: "Milton Roy Authorized",
    description: "Official distributor of premium pumping equipment"
  },
  {
    icon: Target,
    title: "Quality Assurance",
    description: "ISO certified products and services"
  }
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <motion.section
        ref={bannerRef}
        initial={{ opacity: 0 }}
        animate={isBannerInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-black/40" />
        <Image 
          src="/assets/about.webp" 
          alt="DP Enterprises - Industrial Pumping Solutions" 
          fill 
          className="object-cover mix-blend-overlay" 
        />
        
        {/* Background Elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isBannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 backdrop-blur-sm border border-primary-300/30 rounded-full text-primary-100 text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Trusted Since 2007
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight">
                About
                <span className="block text-gradient-dark">DP Enterprises</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Leading supplier of Milton Roy Pumps and precision dosing solutions, 
                serving industries with excellence for over 17 years.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900">
                  Our <span className="text-gradient">Story</span>
                </h2>
                <p className="text-lg text-secondary-600 leading-relaxed">
                  Established in 2007, DP Enterprises has grown to become a trusted name in industrial pumping solutions. 
                  As an authorized distributor of Milton Roy pumps, we specialize in providing high-quality, precision 
                  dosing equipment to diverse industries across India.
                </p>
                <p className="text-lg text-secondary-600 leading-relaxed">
                  Our commitment to excellence and customer satisfaction has enabled us to build lasting relationships 
                  with over 500 satisfied clients. We take pride in our technical expertise and comprehensive service 
                  support that ensures optimal performance of our equipment.
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="text-center p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <achievement.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-secondary-900 text-sm mb-1">{achievement.title}</h4>
                      <p className="text-sm text-secondary-600">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-large p-8 border border-neutral-100">
                  <Image
                    src="/assets/products/Proteus-Series-Metering-Pump.jpg"
                    alt="Milton Roy Precision Pumps"
                    width={500}
                    height={400}
                    className="w-full h-80 object-contain"
                  />
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-100 rounded-full opacity-40"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-6">
              Company <span className="text-gradient">Facts</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Key information about our organization and capabilities
            </p>
          </motion.div>          <motion.div
            ref={factsRef}
            initial={{ opacity: 0 }}
            animate={isFactsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Table Layout */}
            <div className="bg-white rounded-2xl shadow-large border border-neutral-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {/* First Row */}
                    <tr className="border-b border-neutral-100">
                      {companyFacts.slice(0, 4).map((fact, index) => (
                        <motion.td
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isFactsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, delay: 0.1 * index }}
                          className="p-6 text-center border-r border-neutral-100 last:border-r-0 hover:bg-gradient-to-br hover:from-primary-50 hover:to-accent-50 transition-all duration-300"
                        >
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <fact.icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <h3 className="font-heading font-bold text-secondary-900 mb-2 text-sm lg:text-base">
                            {fact.label}
                          </h3>
                          <p className="text-primary-600 font-semibold text-sm lg:text-base">
                            {fact.value}
                          </p>
                        </motion.td>
                      ))}
                    </tr>
                    
                    {/* Second Row */}
                    <tr>
                      {companyFacts.slice(4, 8).map((fact, index) => (
                        <motion.td
                          key={index + 4}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isFactsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, delay: 0.1 * (index + 4) }}
                          className="p-6 text-center border-r border-neutral-100 last:border-r-0 hover:bg-gradient-to-br hover:from-primary-50 hover:to-accent-50 transition-all duration-300"
                        >
                          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <fact.icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <h3 className="font-heading font-bold text-secondary-900 mb-2 text-sm lg:text-base">
                            {fact.label}
                          </h3>
                          <p className="text-primary-600 font-semibold text-sm lg:text-base">
                            {fact.value}
                          </p>
                        </motion.td>
                      ))}                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-4">
              Our Product <span className="text-gradient">Categories</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Comprehensive range of industrial pumping solutions
            </p>
          </motion.div>          <motion.div
            ref={categoriesRef}
            initial={{ opacity: 0 }}
            animate={isCategoriesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          >
            {Object.entries(products).map(([categoryId, category], index) => (
              <motion.div
                key={categoryId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={`/category/${categoryId}`} className="group block h-full">
                  <div className="card-elevated bg-white h-full flex flex-col hover:shadow-large transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="relative h-48 bg-neutral-50 overflow-hidden">
                      <Image
                        src={category.image || "/assets/products/one.jpg"}
                        alt={category.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-heading font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-secondary-600 text-sm flex-1 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100">
                        <span className="text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                          {category.items.length} Products
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary-600 group-hover:text-primary-700 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="container-custom relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white">
                Ready to Get <span className="text-gradient-dark">Started?</span>
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Contact us today for expert consultation on your industrial pumping needs. 
                Our team is ready to provide tailored solutions for your specific requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4 group">
                Contact Us Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/product" className="btn-secondary text-lg px-8 py-4">
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}