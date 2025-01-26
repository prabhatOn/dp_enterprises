"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Settings, PenToolIcon as Tool, Zap, type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import type { FC, ReactNode } from "react"

// Type definitions
interface HeroContent {
  imageLeft: {
    src: string
    alt: string
    width: number
    height: number
  }
  imageRight: {
    src: string
    alt: string
    width: number
    height: number
  }
  icon: LucideIcon
  title: ReactNode
  subtitle: string
  link: {
    href: string
    text: string
  }
}

interface ServiceItem {
  id: number
  icon: LucideIcon
  title: ReactNode
  description: string
  link: {
    href: string
    text: string
  }
}

// Data for Section
const heroContent: HeroContent = {
  imageLeft: {
    src: "/assets/service-left.jpg",
    alt: "Industrial equipment",
    width: 300,
    height: 300,
  },
  imageRight: {
    src: "/assets/service-right.jpg",
    alt: "Technician working",
    width: 300,
    height: 300,
  },
  icon: Zap,
  title: (
    <>
      Expert Industrial Services
      <br />
      for <span className="underline decoration-[#3b82f6]">Peak Performance</span>
    </>
  ),
  subtitle: "Elevate your operations with our comprehensive solutions.",
  link: {
    href: "#",
    text: "Explore Our Services",
  },
}

// Data for the Services Grid
const services: ServiceItem[] = [
  {
    id: 1,
    icon: Tool,
    title: "Equipment Maintenance",
    description: "Regular maintenance to ensure your machinery operates at peak efficiency.",
    link: {
      href: "#",
      text: "Learn about our maintenance plans",
    },
  },
  {
    id: 2,
    icon: Zap,
    title: "Emergency Repairs",
    description: "24/7 emergency repair services to minimize downtime and keep your operations running.",
    link: {
      href: "#",
      text: "See our response times",
    },
  },
  {
    id: 3,
    icon: Settings,
    title: "Process Optimization",
    description: "Analyze and optimize your industrial processes for maximum productivity.",
    link: {
      href: "#",
      text: "Discover optimization services",
    },
  },
]

const ServiceSection: FC = () => {
  return (
    <div className="w-full bg-transparent text-white py-16">
      <div className="max-w-7xl mx-auto p-4 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/10 backdrop-blur-sm rounded-3xl py-12 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center md:justify-end"
            >
              <Image
                src={heroContent.imageLeft.src || "/placeholder.svg"}
                alt={heroContent.imageLeft.alt}
                width={heroContent.imageLeft.width}
                height={heroContent.imageLeft.height}
                className="object-cover rounded-lg"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center"
              >
                <heroContent.icon className="w-8 h-8 text-blue-300" />
              </motion.div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold">{heroContent.title}</h1>
                <p className="text-blue-100">{heroContent.subtitle}</p>
              </div>
              <Link
                href={heroContent.link.href}
                className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors"
              >
                {heroContent.link.text}
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center md:justify-start"
            >
              <Image
                src={heroContent.imageRight.src || "/placeholder.svg"}
                alt={heroContent.imageRight.alt}
                width={heroContent.imageRight.width}
                height={heroContent.imageRight.height}
                className="object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + 0.2 * index }}
                  className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center"
                >
                  <service.icon className="w-6 h-6 text-blue-300" />
                </motion.div>
                <h2 className="text-2xl font-semibold">{service.title}</h2>
                <p className="text-blue-100">{service.description}</p>
              </div>
              <Link
                href={service.link.href}
                className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors mt-4"
              >
                {service.link.text}
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceSection

