import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <Link to='/'><motion.h3 whileHover={{ y: -3, color: "#EC4899" }} className="yuji-font text-2xl mb-6 hover:cursor-pointer">Ethio vibe</motion.h3></Link>
            <p className="text-gray-400 mb-4">
              Your premier destination for authentic Ethiopian fashion and modern style fusion.
            </p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ y: -3, color: "#EC4899" }} href="#" className="hover:text-pink-500 transition-colors">
                <FaFacebookF />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: "#EC4899" }} href="#" className="hover:text-pink-500 transition-colors">
                <FaTwitter />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: "#EC4899" }} href="#" className="hover:text-pink-500 transition-colors">
                <FaInstagram />
              </motion.a>
              <motion.a whileHover={{ y: -3, color: "#EC4899" }} href="#" className="hover:text-pink-500 transition-colors">
                <FaTiktok />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="exo-font text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-pink-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-pink-500 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-pink-500 transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-pink-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="exo-font text-xl mb-6">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/men" className="text-gray-400 hover:text-pink-500 transition-colors">Men's Fashion</Link></li>
              <li><Link to="/women" className="text-gray-400 hover:text-pink-500 transition-colors">Women's Fashion</Link></li>
              <li><Link to="/children" className="text-gray-400 hover:text-pink-500 transition-colors">Children's Wear</Link></li>
              <li><Link to="/footwear" className="text-gray-400 hover:text-pink-500 transition-colors">Footwear</Link></li>
              <li><Link to="/accessories" className="text-gray-400 hover:text-pink-500 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="exo-font text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-pink-500" />
                <span className="text-gray-400">+251 912 345 678</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-pink-500" />
                <span className="text-gray-400">info@ethiovibe.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-pink-500" />
                <span className="text-gray-400">Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-gray-800 pt-8 pb-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="exo-font text-xl mb-4">Subscribe to Our Newsletter</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-full bg-gray-800 border-2 border-gray-700 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-pink-500 text-white rounded-r-full hover:bg-pink-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ethio vibe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer