"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { products } from "../data/product"
import FeaturedProductsBanner from "../product/FeaturedProductsBanner"
import BentoGrid from "./bentoGrid"
import HotDealsCarousel from "../product/HotDealsCarousel"

export default function ProductSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#152C47] to-[#031224]">
      <FeaturedProductsBanner />
      <BentoGrid />
      <HotDealsCarousel />
    </div>
  )
}

