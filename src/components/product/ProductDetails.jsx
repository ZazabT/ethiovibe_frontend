import React, { useState } from 'react'
import { FaStar, FaShoppingCart, FaTruck } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const selectedProduct = {
    _id: "p001",
    name: "Traditional Habesha Kemis",
    price: 299.99,
    description: "Elegant hand-embroidered traditional Ethiopian dress with modern touches. Features intricate telfi designs and premium cotton fabric.",
    images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
        "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95",
        "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Ivory", "Gold"],
    category: "Women",
    inStock: true,
    features: [
        "Hand-embroidered details",
        "100% Premium Cotton",
        "Traditional Telfi design",
        "Modern fit adjustments",
        "Breathable fabric"
    ],
    rating: 4.8,
    reviews: 124,
    shipping: {
        time: "3-5 business days",
        free: true
    },
    discount: {
        percentage: 15,
        validUntil: "2024-03-01"
    }
}

  return (
    <div className='py-16'>
      <div className='max-w-6xl mx-auto px-4'>
          <div className='flex flex-col md:flex-row gap-8'>
            {/* Left images */}
            <div className='flex-1 min-h-[700px]'>
              <div className='flex gap-4'>
                <div className='hidden md:flex flex-col gap-4'>
                  {selectedProduct.images.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${selectedImage === index ? 'ring-2 ring-pink-500' : ''}`}
                    >
                      <img src={img} alt="" className='w-full h-full object-cover' />
                    </div>
                  ))}
                </div>
                <div className='flex-1 aspect-square rounded-xl overflow-hidden'>
                  <img 
                    src={selectedProduct.images[selectedImage]} 
                    alt={selectedProduct.name}
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className='flex-1 space-y-6'>
              <div>
                <h1 className='text-3xl yuji-font mb-2'>{selectedProduct.name}</h1>
                <div className='flex items-center gap-2'>
                  <div className='flex text-yellow-400'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className='text-gray-600'>({selectedProduct.reviews} reviews)</span>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <p className='text-3xl font-semibold'>${selectedProduct.price}</p>
                  {selectedProduct.discount && (
                    <span className='bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm'>
                      {selectedProduct.discount.percentage}% OFF
                    </span>
                  )}
                </div>
                <p className='text-gray-600'>{selectedProduct.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className='font-medium mb-3'>Select Size</h3>
                <div className='flex gap-3'>
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-full border ${
                        selectedSize === size 
                          ? 'border-pink-500 text-pink-500' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className='font-medium mb-3'>Select Color</h3>
                <div className='flex gap-3'>
                  {selectedProduct.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{backgroundColor:color.toLocaleLowerCase(), 
                      }}
                      className={`px-4 py-4 rounded-full border ${
                        selectedColor === color 
                          ? 'border-pink-500 text-pink-500' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              {/* <div>
                <h3 className='font-medium mb-3'>Features</h3>
                <ul className='space-y-2'>
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-500 rounded-full'></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Shipping Info */}
              {/* <div className='flex items-center gap-3 text-gray-600'>
                <FaTruck />
                <p>{selectedProduct.shipping.free ? 'Free shipping' : 'Standard shipping'} • {selectedProduct.shipping.time}</p>
              </div> */}

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800'
              >
                <FaShoppingCart />
                Add to Cart
              </motion.button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProductDetails