import type React from "react"
import Image from "next/image"
import Link from "next/link"
import type { ProductItem } from "@/components/data/product"

interface ProductCardProps {
  product: ProductItem
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:-translate-y-1">
        <div className="relative flex flex-col items-center justify-center border-b border-[#d4d4d5] w-full h-[350px]">
          <Image
            src={
              product.image ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20150842-XS0RmRGTMGfPldqh6bkSHqHNNgMspn.png" ||
              "/placeholder.svg"
            }
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="flex flex-col flex-1 px-5 py-1 text-[rgba(0,0,0,0.68)] text-xs leading-[1.6] items-center">
          <h3 className="pt-[10px] pb-[0.2em] mb-[10px] text-[17px] font-bold uppercase leading-[22.1px] border-t border-[rgba(34,36,38,0.1)] hyphens-auto break-words min-h-[80px] w-full text-center">
            {product.name}
          </h3>
          <div className="flex-1 py-[4px] px-[20px] flex flex-col items-center text-[15px] leading-[1.625] font-[__gothamss_21a51a,__gothamss_Fallback_21a51a] mb-4">
            <p className="text-[#33475b]">{product.description}</p>
          </div>
          <span className="text-[17px] text-[#1169af] leading-[27.625px] text-center py-[13px] pb-[25px]">
            Learn More
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

