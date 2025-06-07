import type React from "react"
import { motion } from "framer-motion"
import { Star, Award, TrendingUp } from "lucide-react"

const FeaturedProductsBanner: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-primary-100 border border-primary-200 rounded-full text-primary-700 text-sm font-medium"
          >
            <Star className="w-4 h-4 mr-2 fill-current" />
            Premium Collection
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-secondary-900 leading-tight">
              Featured
              <span className="text-gradient block">Products</span>
            </h2>
            <p className="text-xl text-secondary-600 leading-relaxed max-w-3xl mx-auto">
              Discover our top-of-the-line pumps and dosing solutions, engineered for precision, 
              reliability, and exceptional performance across critical industrial applications.
            </p>
          </div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8"
          >
            <div className="flex items-center space-x-2 text-secondary-700">
              <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-success-600" />
              </div>
              <span className="font-medium">Industry Leading</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-700">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-primary-600 fill-current" />
              </div>
              <span className="font-medium">Proven Quality</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-700">
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent-600" />
              </div>
              <span className="font-medium">Advanced Technology</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProductsBanner

