import type React from "react"

const FeaturedProductsBanner: React.FC = () => {
  return (
    <div className="w-[90%] rounded-3xl bg-white/10 backdrop-blur-sm text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl flex items-center justify-center mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Featured Products</h2>
      </div>
      <div className="flex items-center justify-center">
      <p className="mt-6 max-w-4xl text-xl">
          Discover our top-of-the-line pumps and dosing solutions, engineered for precision and reliability.
        </p>
      </div>
    </div>
  )
}

export default FeaturedProductsBanner

