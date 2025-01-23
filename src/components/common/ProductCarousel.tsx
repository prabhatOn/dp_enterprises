"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products } from "../data/product";

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    let scrollPos = 0;

    const scroll = () => {
      if (!scrollContainer || isPaused) return;

      scrollPos += 1;
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0;
      }

      scrollContainer.scrollLeft = scrollPos;
    };

    const interval = setInterval(scroll, 30);

    return () => clearInterval(interval);
  }, [isPaused]);

  const allProducts = [
    ...Object.entries(products),
    ...Object.entries(products),
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)} // Pause on hover
          onMouseLeave={() => setIsPaused(false)} // Resume on leave
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden whitespace-nowrap py-8"
            style={{ scrollBehavior: "smooth" }}
          >
            {allProducts.map(([key, product], index) => (
              <Link
                key={index}
                href={`/product/${product.items[0].id}`}
                className="group flex-none"
              >
                <div className="w-72 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-gray-100 relative">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 whitespace-normal line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {product.items.length} variants
                      </span>
                      <span className="text-sm font-medium text-black group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link
          href="/product"
          className="inline-block px-8 py-3 text-lg font-medium text-black border-2 border-black rounded-full hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
