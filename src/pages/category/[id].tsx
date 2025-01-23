"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { products, type ProductCategory, type ProductItem } from "@/components/data/product"
import ProductCard from "@/components/product/ProductCard"

export default function CategoryProductPage() {
  const params = useParams()
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [industries, setIndustries] = useState<string[]>([])

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

  if (!category) {
    return <div className="container mx-auto px-4 py-8">Category not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">{category.name}</h1>
        <div className="mb-8">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Category Description</h2>
          <p className="text-gray-700">{category.description}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Industry Applications</h2>
          <ul className="list-disc list-inside text-gray-700">
            {industries.map((industry, index) => (
              <li key={index}>{industry}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Products in this Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((product: ProductItem) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Link href="/products" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to All Products
          </Link>
        </div>
      </div>
    </div>
  )
}

