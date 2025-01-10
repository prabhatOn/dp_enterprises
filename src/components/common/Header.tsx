'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { products } from '@/components/data/product';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className='h-10 w-full bg-gray-900 flex items-center justify-between px-[300px]'>
        <span className=' text-white'>Authorised Channel Partner of Milton Roy</span>
        <span className='text-white'><span className='text-white'>GST No : </span>23AAGFD3172Q1Z7</span>
        <span className='text-white'><span>Phone No :</span>7313748861</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl tracking-tight hover:text-gray-700 transition-all duration-300 transform hover:scale-105">
            LOGO
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-6">
            <Link href="/" className="relative group py-2">
              <span className="text-black hover:text-gray-600 transition-colors">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            <div 
              className="relative group py-2"
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => {
                setShowProductMenu(false);
                setActiveCategory(null);
              }}
            >
              <span className="text-black hover:text-gray-600 transition-colors cursor-pointer">Products</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              
              {/* Main Product Dropdown */}
              {showProductMenu && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-xl rounded-lg py-2 min-w-[300px] border border-gray-100">
                  {Object.values(products).map((category) => (
                    <div
                      key={category.name}
                      className="relative group/item"
                      onMouseEnter={() => setActiveCategory(category.name)}
                    >
                      <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-all duration-300">
                        <span className="text-sm font-medium group-hover/item:text-black transition-colors">
                          {category.name}
                        </span>
                      </div>
                      
                      {/* Sub Categories */}
                      {activeCategory === category.name && (
                        <div className="absolute left-full top-0 ml-0.5 bg-white shadow-xl rounded-lg py-2 min-w-[280px] border border-gray-100">
                          {category.items.map((item) => (
                            <div key={item} className="relative group/sub">
                              <Link
                                href={`/product/${category.name.toLowerCase()}/${item.toLowerCase()}`}
                                className="block px-4 py-2 text-sm hover:bg-gray-50 transition-all duration-300"
                              >
                                <span className="relative group-hover/sub:pl-2 transition-all duration-300 inline-block">
                                  {item}
                                </span>
                              </Link>
                              
                              {/* Nested Items */}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/company" className="relative group py-2">
              <span className="text-black hover:text-gray-600 transition-colors">Company Profile</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            <Link href="/contact" className="relative group py-2">
              <span className="text-black hover:text-gray-600 transition-colors">Contact Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:block w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}