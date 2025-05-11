import React from 'react'
import { motion } from 'framer-motion'
import HeroImg from '../../assets/hero4.png'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="container my-10 mx-auto px-4 py-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute -top-20 -left-20 w-84 h-64 bg-pink-400 rounded-full blur-3xl"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500 rounded-full blur-3xl"
      />

      {/* Header Text */}
      <div className="text-center mb-8 relative">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-pink-500 exo-font mb-2 tracking-wider"
        >
          EXPERIENCE THE ESSENCE OF
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl yuji-font font-bold mb-4"
        >
          Modern Ethiopian Style
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/collections/all')}
            className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2 hover:gap-4 transition-all group"
          >
            Shop Now 
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <FaArrowRight className="group-hover:text-pink-500 transition-colors" />
            </motion.div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Hero Image Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }} 
        className="relative overflow-hidden"
      >
        <img 
          src={HeroImg}
          alt="Ethiopian Fashion"
          className="w-full h-[100vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
          {/* Bottom Left - Main Collection */}
          <div className="absolute bottom-10 left-10 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="w-10 h-[2px] bg-white"/>
              <p className="dancing-font text-xl">New Arrival</p>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="text-3xl mt-2 exo-font font-light"
            >
              Summer Collection
            </motion.h3>
          </div>

          {/* Top Right - Discount */}
          <div className="absolute top-10 right-10 text-white text-right">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-black/30 p-4 rounded-lg backdrop-blur-sm"
            >
              <p className="yuji-font text-4xl mb-1">30% OFF</p>
              <p className="exo-font text-sm">On First Purchase</p>
            </motion.div>
          </div>

          {/* Center Right - Featured */}
          <div className="absolute top-1/2 -translate-y-1/2 right-10 text-white text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4 flex-row-reverse"
            >
              <span className="w-10 h-[2px] bg-white"/>
              <p className="dancing-font text-2xl">Featured</p>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="text-xl mt-2 exo-font font-light"
            >
              Traditional Meets Modern
            </motion.h3>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero