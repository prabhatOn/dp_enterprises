import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import type { ProductItem } from "@/components/data/product"

interface ProductCardProps {
  product: ProductItem
  index?: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Link href={`/product/${product.id}`} className="group block h-full">
        <div className="card-elevated bg-white h-full flex flex-col hover:shadow-large transition-all duration-300 group-hover:scale-[1.02]">
          {/* Product Image */}
          <div className="relative h-64 bg-white overflow-hidden">
            <Image
              src={product.image || "/assets/products/one.jpg"}
              alt={product.name}
              fill
              className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            />
            {/* Optional: Quality Badge */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Premium
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className="flex flex-col flex-1 p-6">
            <h3 className="text-lg font-heading font-bold text-secondary-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3.5rem]">
              {product.name}
            </h3>
            
            <p className="text-secondary-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
              {product.description}
            </p>

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                Learn More
              </span>
              <ArrowRight className="w-4 h-4 text-primary-600 group-hover:text-primary-700 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard

