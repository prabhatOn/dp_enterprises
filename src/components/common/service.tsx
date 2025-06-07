"use client"

import Link from "next/link"
import { 
  ArrowRight, 
  Settings, 
  Shield, 
  Zap, 
  Wrench,
  Clock,
  Award,
  CheckCircle,
  type LucideIcon 
} from "lucide-react"
import { motion } from "framer-motion"
import type { FC } from "react"

interface ServiceItem {
  id: number
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

interface WhyChooseItem {
  icon: LucideIcon
  title: string
  description: string
}

const services: ServiceItem[] = [
  {
    id: 1,
    icon: Wrench,
    title: "Installation & Commissioning",
    description: "Professional installation and commissioning services for all pump systems with comprehensive testing and validation.",
    features: ["System Integration", "Performance Testing", "Training & Documentation", "Warranty Support"]
  },
  {
    id: 2,
    icon: Settings,
    title: "Maintenance & Repair",
    description: "Preventive maintenance programs and emergency repair services to ensure optimal performance and minimal downtime.",
    features: ["Preventive Maintenance", "Emergency Repairs", "Spare Parts Supply", "24/7 Support"]
  },
  {
    id: 3,
    icon: Zap,
    title: "Technical Consultation",
    description: "Expert technical consultation for pump selection, system design, and process optimization to meet your specific requirements.",
    features: ["Pump Selection", "System Design", "Process Optimization", "Energy Efficiency"]
  }
]

const whyChooseUs: WhyChooseItem[] = [
  {
    icon: Award,
    title: "17+ Years Experience",
    description: "Extensive experience in industrial pumping solutions across various industries."
  },
  {
    icon: Shield,
    title: "Authorized Partner",
    description: "Official Milton Roy distributor with certified technicians and genuine parts."
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Fast response times for emergency repairs and technical support nationwide."
  }
]

const ServiceSection: FC = () => {
  return (
    <section className="bg-neutral-50 section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary-900 mb-6">
            Comprehensive <span className="text-gradient">Service Solutions</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            From installation to maintenance, we provide end-to-end services to ensure your pumping systems 
            operate at peak performance throughout their lifecycle.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-elevated h-full group hover:scale-105"
            >
              {/* Service Icon */}
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                <h3 className="text-xl font-heading font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-secondary-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-secondary-700">
                      <CheckCircle className="w-4 h-4 text-success-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact" 
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-medium border border-neutral-100 p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mb-4">
              Why Choose <span className="text-gradient">DP Enterprises?</span>
            </h3>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We combine technical expertise with industry experience to deliver reliable, 
              efficient solutions for your industrial pumping needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="text-lg font-heading font-bold text-secondary-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-secondary-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h4 className="text-2xl font-heading font-bold text-secondary-900 mb-4">
              Ready to Get Started?
            </h4>
            <p className="text-secondary-600 mb-6 max-w-md mx-auto">
              Contact our experts today for a consultation and discover how we can optimize your industrial processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary group">
                Get Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/product" className="btn-secondary">
                View Our Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceSection

