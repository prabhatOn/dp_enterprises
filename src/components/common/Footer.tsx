"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, ArrowUpRight, Send, MessageSquare } from "lucide-react"
import { products } from "@/components/data/product"

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DP</span>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold">DP Enterprises</h3>
                  <p className="text-secondary-400 text-sm">Industrial Solutions</p>
                </div>
              </div>
              <p className="text-secondary-300 text-sm leading-relaxed">
                Authorized Channel Partner of Milton Roy, delivering precision industrial pumping solutions since 2007.
              </p>
            </div>
            <Link 
              href="/contact" 
              className="inline-flex items-center btn-primary group"
            >
              Send Inquiry 
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-heading font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Products", href: "/product" },
                { name: "Contact Us", href: "/contact" },
                { name: "Sitemap", href: "/sitemap" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-300 hover:text-white transition-colors flex items-center gap-3 group text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full transition-all duration-200 group-hover:bg-white group-hover:scale-125"></div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-heading font-bold">Our Products</h3>
            <ul className="space-y-3">
              {Object.entries(products).slice(0, 5).map(([key, category]) => (
                <li key={key}>
                  <Link
                    href={`/product/${key}`}
                    className="text-secondary-300 hover:text-white transition-colors flex items-center gap-3 group text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full transition-all duration-200 group-hover:bg-white group-hover:scale-125"></div>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-heading font-bold">Contact Information</h3>
            <div className="space-y-4 text-secondary-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary-400" />
                <div className="text-sm leading-relaxed">
                  <p className="font-medium text-white mb-1">Head Office</p>
                  <p className="text-white">C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, CHHOTA BANGARDA, Indore - 452005, Madhya Pradesh, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <div className="text-sm">
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-white">+91 7313748861</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <div className="text-sm">
                  <p className="font-medium text-white">Contact Person</p>
                  <p className="text-white">Mr. Devendra Nagwan (Partner)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-secondary-800">
        <div className="container-custom py-8">
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link 
              href="/contact" 
              className="btn-primary flex items-center gap-2 group"
            >
              <Send className="w-4 h-4" /> 
              Send Inquiry
            </Link>
            <Link 
              href="/contact" 
              className="btn-secondary flex items-center gap-2 group"
            >
              <MessageSquare className="w-4 h-4" /> 
              Send SMS
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-400 pt-8 border-t border-secondary-800">
            <p className="text-white">© {new Date().getFullYear()} DP Enterprises. All Rights Reserved.</p>
            <p className="text-white">Developed and Managed by ❤️ Infusion Tech</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

