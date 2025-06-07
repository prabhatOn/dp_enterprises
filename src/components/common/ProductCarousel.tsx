"use client"

import { useEffect, useState } from "react"
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
    <div className="bg-neutral-50 py-16">
      <FeaturedProductsBanner />
      <BentoGrid />
      <HotDealsCarousel />
    </div>
  )
}

