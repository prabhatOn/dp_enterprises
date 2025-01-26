import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { products } from "../data/product"

const BentoGrid: React.FC = () => {
  const featuredProducts = Object.values(products).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((category, index) => (
          <Link key={category.id} href={`/category/${category.id}`} className="group">
            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 h-full">
              <div className="relative aspect-square">
                <Image
                  src={
                    category.image ||
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20150842-XS0RmRGTMGfPldqh6bkSHqHNNgMspn.png"
                  }
                  alt={category.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase">{category.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                <span className="text-blue-600 font-semibold hover:text-blue-700">Learn More</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BentoGrid

