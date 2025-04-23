import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaTiktok, FaPhoneAlt, FaBars } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const sloganVariants = {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgb(236, 72, 153)",
      letterSpacing: "2px",
      transition: {
        duration: 0.8,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black px-4 md:px-10 text-white py-3"
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-pink-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars className="text-xl" />
          </motion.button>

          {/* Desktop Social Media Icons */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex space-x-6"
          >
            {[FaFacebookF, FaInstagram, FaTiktok].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                variants={itemVariants}
                className="hover:text-pink-400 transition-colors"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="text-lg" />
              </motion.a>
            ))}
          </motion.div>

          {/* Slogan */}
          <motion.div 
            className="yuji-font text-pink-400 text-sm md:text-lg cursor-pointer text-center mx-2"
            variants={sloganVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            "Embrace Your Unique Style, Express Your Soul"
          </motion.div>

          {/* Phone Number */}
          <motion.div 
            className="hidden md:flex items-center space-x-2"
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.3 }
            }}
          >
            <FaPhoneAlt className="text-pink-400" />
            <span className="text-sm md:text-base">+251 913 173 163</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black md:hidden"
          >
            <div className="container mx-auto py-4 px-4 space-y-4">
              <div className="flex justify-center space-x-6">
                {[FaFacebookF, FaInstagram, FaTiktok].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-white hover:text-pink-400"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
              <div className="flex justify-center items-center space-x-2 text-white">
                <FaPhoneAlt className="text-pink-400" />
                <span>+251 912 345 678</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TopBar