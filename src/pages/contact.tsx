"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  })

  const mapRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(mapRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(infoRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      gsap.from(formRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      const formElements = formRef.current?.querySelectorAll("input, textarea, button")
      if (formElements) {
        gsap.from(formElements, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={mapRef} className="w-full h-[60vh] bg-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.0072974893565!2d81.63415617487107!3d21.310727980410082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28e70334ff8821%3A0x21f27a37b122042a!2sNew%20DM%20Tower&#39;s!5e0!3m2!1sen!2sin!4v1737619808718!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products? We're here to help. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={infoRef} className="bg-black text-white rounded-3xl p-8 lg:p-12 shadow-lg">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-gray-300">
                    C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, CHHOTA BANGARDA, Indore - 452005, Madhya
                    Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-gray-300">+91 7313748861</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Contact Person</h3>
                  <p className="text-gray-300">Mr. Devendra Nagwan (Partner)</p>
                </div>
              </div>
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg space-y-6"
          >
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border-2 border-gray-400 text-gray-900 bg-gray-100 focus:ring-2 focus:ring-black focus:border-black transition-all placeholder-gray-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 text-gray-900 bg-gray-100 focus:ring-2 focus:ring-black focus:border-black transition-all placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 text-gray-900 bg-gray-100 focus:ring-2 focus:ring-black focus:border-black transition-all placeholder-gray-500"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-400 text-gray-900 bg-gray-100 focus:ring-2 focus:ring-black focus:border-black transition-all resize-none placeholder-gray-500"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

