"use client"

import { useState, useRef } from "react"
import { MapPin, Phone, Mail, Send, ArrowDown, Clock, Globe } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const mapSectionRef = useRef<HTMLDivElement>(null)

  const isHeaderInView = useInView(headerRef, { once: true })
  const isInfoInView = useInView(infoRef, { once: true })
  const isFormInView = useInView(formRef, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(formData)
    setIsSubmitting(false)
    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    })
  }

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="relative bg-[#171935] text-white py-20"
      >
        <div className="absolute inset-0 bg-[#152C47] " />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Have questions about our products? We're here to help you find the perfect solution for your needs.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <button
              onClick={scrollToMap}
              className="inline-flex items-center gap-2 text-lg font-medium hover:text-blue-400 transition-colors"
            >
              Give us a Visit
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            initial="hidden"
            animate={isInfoInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, CHHOTA BANGARDA, Indore - 452005, Madhya
                      Pradesh, India
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone Number</h3>
                    <p className="text-gray-600">+91 7313748861</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Contact Person</h3>
                    <p className="text-gray-600">Mr. Devendra Nagwan (Partner)</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Business Hours</h2>
              <div className="space-y-6">
                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Service Area</h3>
                    <p className="text-gray-600">Available across India</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 shadow-lg space-y-6 h-fit"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 mb-8">
              Send us a Message
            </motion.h2>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="+91 98765 43210"
                required
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="What is this regarding?"
                required
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                placeholder="Tell us about your requirements..."
                required
              ></textarea>
            </motion.div>

            <motion.button
              variants={fadeInUp}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Map Section */}
      <div ref={mapSectionRef} className="bg-white  py-10">
        <div className="max-w-7xl mx-auto px-4 h-[70vh] sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
          <div className="aspect-w-16 h-[90%] aspect-h-9 rounded-3xl overflow-hidden shadow-lg">
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
        </div>
      </div>
    </div>
  )
}

