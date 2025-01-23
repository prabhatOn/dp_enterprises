"use client"
import Image from "next/image"
import Link from "next/link"
import type { ProductItem } from "@/components/data/product"

interface ProductCardProps {
  product: ProductItem
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative aspect-square">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Flow Rate: {product.specifications.find((spec) => spec.name === "Flow Rate")?.value}</p>
            <p>Pressure: {product.specifications.find((spec) => spec.name === "Pressure")?.value}</p>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600">
              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
                product.price.min,
              )}
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

