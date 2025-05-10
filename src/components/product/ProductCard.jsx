import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className=" bg- overflow-hidden  transition-all duration-300"
    >
      <Link to={`/product/${product._id}`}>
        <div className="">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-4">
              <img 
                src={product.images[0].url} 
                alt={product.name}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.discountPercentage && (
              <div className="absolute top-4 left-0 bg-pink-400 text-white px-4 py-1 text-sm font-medium">
                {product.discountPercentage}% OFF
              </div>
            )}
            </div>
            <div className="space-y-2 pb-4">
              <h3 className="text-lg font-medium exo-font truncate">{product.name}</h3>
              <p className="text-pink-500 yuji-font">br{product.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard