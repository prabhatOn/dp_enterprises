"use client"

import { useState, useRef } from "react"
import { MapPin, Phone, Mail, Send, ArrowDown, Clock, Globe, User, MessageSquare, Building2, Shield } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        ref={headerRef}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/40" />
        <Image 
          src="/assets/contact.webp" 
          alt="DP Enterprises Contact - Get In Touch" 
          fill 
          className="object-cover mix-blend-overlay" 
        />
        
        {/* Background Elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 backdrop-blur-sm border border-primary-300/30 rounded-full text-primary-100 text-sm font-medium">
                <MessageSquare className="w-4 h-4 mr-2" />
                Get Expert Consultation
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight">
                Contact
                <span className="block text-gradient-dark">Our Team</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Ready to discuss your industrial pumping needs? Our experts are here to provide 
                tailored solutions for your specific requirements.
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button
                  onClick={scrollToMap}
                  className="inline-flex items-center gap-2 text-lg font-medium text-white/90 hover:text-white transition-colors group"
                >
                  Visit Our Office
                  <ArrowDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              ref={infoRef}
              initial="hidden"
              animate={isInfoInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900">
                  Let's <span className="text-gradient">Connect</span>
                </h2>
                <p className="text-xl text-secondary-600 leading-relaxed">
                  Reach out to us for expert guidance on industrial pumping solutions.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="card-elevated bg-white p-8 hover:shadow-large transition-all duration-300">
                <h3 className="text-2xl font-heading font-bold mb-6 text-secondary-900">Contact Information</h3>
                <div className="space-y-6">
                  <motion.div variants={fadeInUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Our Location</h4>
                      <p className="text-secondary-600 leading-relaxed">
                        C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, 
                        CHHOTA BANGARDA, Indore - 452005, Madhya Pradesh, India
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Phone Number</h4>
                      <p className="text-secondary-600">+91 7313748861</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Contact Person</h4>
                      <p className="text-secondary-600">Mr. Devendra Nagwan (Partner)</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="card-elevated bg-white p-8 hover:shadow-large transition-all duration-300">
                <h3 className="text-2xl font-heading font-bold mb-6 text-secondary-900">Business Information</h3>
                <div className="space-y-6">
                  <motion.div variants={fadeInUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Working Hours</h4>
                      <p className="text-secondary-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-secondary-600">Sunday: Closed</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Service Area</h4>
                      <p className="text-secondary-600">Available across India</p>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">Established</h4>
                      <p className="text-secondary-600">Since 2007 - 17+ Years of Excellence</p>
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
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              onSubmit={handleSubmit}
              className="card-elevated bg-white p-8 space-y-6 h-fit hover:shadow-large transition-all duration-300"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <h2 className="text-3xl font-heading font-bold text-secondary-900">
                  Send us a <span className="text-gradient">Message</span>
                </h2>
                <p className="text-secondary-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-secondary-900">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-neutral-50 focus:bg-white"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-secondary-900">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-neutral-50 focus:bg-white"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <label htmlFor="mobile" className="block text-sm font-semibold text-secondary-900">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-neutral-50 focus:bg-white"
                  placeholder="+91 98765 43210"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-secondary-900">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-neutral-50 focus:bg-white"
                  placeholder="What is this regarding?"
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-2">
                <label htmlFor="message" className="block text-sm font-semibold text-secondary-900">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 resize-none bg-neutral-50 focus:bg-white"
                  placeholder="Tell us about your requirements..."
                  required
                ></textarea>
              </motion.div>

              <motion.button
                variants={fadeInUp}
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </motion.button>

              <motion.div variants={fadeInUp} className="flex items-center justify-center pt-4">
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <Shield className="w-4 h-4 text-primary-600" />
                  Your information is secure and confidential
                </div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapSectionRef} className="section-padding bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-4">
              Visit Our <span className="text-gradient">Office</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Find us easily with our convenient location in Indore, Madhya Pradesh
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-elevated bg-white p-4 overflow-hidden">
              <div className="aspect-w-16 h-[500px] w-full rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.0072974893565!2d81.63415617487107!3d21.310727980410082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28e70334ff8821%3A0x21f27a37b122042a!2sNew%20DM%20Tower&#39;s!5e0!3m2!1sen!2sin!4v1737619808718!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter brightness-95 contrast-105"
                ></iframe>
              </div>
            </div>
            
            {/* Location Details Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute top-8 left-8 card-elevated bg-white p-6 max-w-sm shadow-large"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-secondary-900 mb-1">DP Enterprises</h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    C-43/1, VIDYA PALACE, BEHIND AIRPORT ROAD POLICE STATION, 
                    CHHOTA BANGARDA, Indore - 452005
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-primary-600 font-semibold">
                <Phone className="w-4 h-4" />
                +91 7313748861
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

