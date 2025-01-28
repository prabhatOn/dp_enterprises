"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, ArrowUpRight, Send, MessageSquare } from "lucide-react"
import { products } from "@/components/data/product"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#152C47] to-[#031224] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-gray-400">Authorised Channel Partner of Milton Roy</p>
            <button className="bg-white text-black px-4 sm:px-6 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm">
              Send Inquiry <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home Page", href: "/" },
                { name: "Company Profile", href: "/about" },
                { name: "Our Products", href: "/product" },
                { name: "Contact Us", href: "/contact" },
                { name: "Sitemap", href: "/sitemap" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Our Products</h3>
            <ul className="space-y-2">
              {Object.entries(products).map(([key, category]) => (
                <li key={key}>
                  <Link
                    href={`/product/${key}`}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-white rounded-full transition-colors"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base">
                  C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, CHHOTA BANGARDA, Indore - 452005, Madhya
                  Pradesh, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <p>+91 7313748861</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <p>Mr. Devendra Nagwan (Partner)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap justify-center gap-4">
          <button className="bg-gray-800 text-white px-4 sm:px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
            <Send className="w-4 h-4" /> Send Inquiry
          </button>
          <button className="border border-white px-4 sm:px-6 py-2 rounded-full hover:bg-black text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
            <MessageSquare className="w-4 h-4" /> Send SMS
          </button>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DP Enterprises All Rights Reserved.</p>
          <p>Developed and Managed by Infocom Network Private Limited.</p>
        </div>
      </div>
    </footer>
  )
}

