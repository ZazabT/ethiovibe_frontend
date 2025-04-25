import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="rounded-2xl overflow-hidden  transition-all duration-300"
    >
      <Link to={`/product/${product._id}`}>
        <div className="px-3">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.discount && (
                <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {product.discount.percentage}% OFF
                </span>
              )}
            </div>
            <div className="space-y-2 pb-4">
              <h3 className="text-lg font-medium exo-font truncate">{product.name}</h3>
              <p className="text-pink-500 yuji-font">${product.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard