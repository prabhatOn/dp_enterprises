import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import productsData from "@/components/data/products-complete.json"

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

const BentoGrid: React.FC = () => {
  const products = productsData.categories as Record<string, ProductCategory>
  
  // Get the main 4 pump categories in order
  const categoryOrder = [
    'electro-actuated-pumps',
    'mechanical-actuated-pumps', 
    'hydraulic-actuated-pumps',
    'plunger-pumps'
  ]
  
  const featuredProducts = categoryOrder.map(categoryKey => products[categoryKey]).filter(Boolean)

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
            Our Product <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Discover our comprehensive range of industrial pumping solutions designed for precision, reliability, and performance across various applications.
          </p>
        </div>        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((category, index) => (
            <Link 
              key={category.id} 
              href={`/category/${category.slug}`} 
              className="group"
            >
              <div className="card-elevated h-full transition-all duration-300 hover:scale-105 hover:shadow-large">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-white">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-primary-600">
                      {category.items.length} Products
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-heading font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name.replace("Milton Roy ", "")}
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center text-primary-600 group-hover:text-primary-700 font-medium text-sm pt-2">
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link href="/product" className="btn-primary text-lg px-8 py-4 inline-flex items-center group">
            View All Products
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BentoGrid

