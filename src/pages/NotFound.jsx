import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-9xl font-bold text-pink-500 yuji-font">404</h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off into the Ethiopian highlands.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            <FaHome />
            Return Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="block mx-auto text-gray-600 hover:text-pink-500 transition-colors mt-4"
          >
            <span className="inline-flex items-center gap-2">
              <FaArrowLeft size={12} />
              Go Back
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound