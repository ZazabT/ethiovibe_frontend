import React from 'react'
import { FaTruck, FaLock, FaUndo, FaHeadset } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Feature = () => {
  const features = [
    {
      icon: <FaTruck size={24} />,
      title: "Free Shipping",
      description: "Free shipping on all orders over $200"
    },
    {
      icon: <FaLock size={24} />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <FaUndo size={24} />,
      title: "Easy Returns",
      description: "30-day return policy for your peace of mind"
    },
    {
      icon: <FaHeadset size={24} />,
      title: "24/7 Support",
      description: "Dedicated support team ready to help"
    }
  ]

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
         {/* Header */}
         <div className="text-center mb-12">
        <h2 className="md:text-4xl text-xl yuji-font font-semibold mb-4">Why Choose Us</h2>
        <div className="flex items-center justify-center gap-4">
          <span className="w-10 h-[2px] bg-pink-500" />
          <p className="md:text-xl text-sm text-gray-600">Our Outstanding Features</p>
          <span className="w-10 h-[2px] bg-pink-500" />
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feature